"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import type { ICategoryNode } from "@/types/filter.interface";
import { cn } from "@/lib/utils";
import { AltArrowDown } from "@solar-icons/react";

interface IProps {
  nodes: ICategoryNode[];
}

export function CategoryTree({ nodes }: IProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    woman: true,
  });

  const toggle = (id: string) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <ul className="flex flex-col">
      {nodes.map((node) => {
        const hasChildren = !!node.children?.length;
        const isOpen = expanded[node.id];
        return (
          <li key={node.id} className="text-xs">
            <button
              type="button"
              onClick={() => hasChildren && toggle(node.id)}
              className="flex w-full items-center gap-1 py-1.5 text-left hover:text-foreground"
            >
              {hasChildren ? (
                <AltArrowDown
                  className={cn(
                    "transition-transform size-5 text-secondary-foreground",
                    !isOpen && "-rotate-90",
                  )}
                />
              ) : (
                <span className="w-3.5" aria-hidden />
              )}
              <span className={cn("flex-1 font-medium text-foreground")}>
                {node.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {node.count}
              </span>
            </button>
            {hasChildren && isOpen && (
              <ul className="ml-3 flex flex-col border-l border-border pl-3">
                {node.children!.map((child) => (
                  <li key={child.id}>
                    <button
                      type="button"
                      className="flex w-full items-center justify-between py-1.5 text-left text-muted-foreground hover:text-foreground"
                    >
                      <span>{child.name}</span>
                      <span className="text-xs">{child.count}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
}
