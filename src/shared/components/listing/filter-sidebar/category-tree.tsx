"use client";

import { useState } from "react";
import type { ICategoryNode } from "@/types/filter.interface";
import { cn } from "@/lib/utils";
import { AltArrowDown } from "@solar-icons/react";

interface IProps {
  nodes: ICategoryNode[];
  selectedId?: string;
  onSelect?: (id: string | undefined) => void;
}

export function CategoryTree({ nodes, selectedId, onSelect }: IProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    woman: true,
  });

  const toggle = (id: string) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  const handleSelect = (id: string) => {
    onSelect?.(selectedId === id ? undefined : id);
  };

  return (
    <ul className="flex flex-col">
      {nodes.map((node) => {
        const hasChildren = !!node.children?.length;
        const isOpen = expanded[node.id];
        const isSelected = selectedId === node.id;
        return (
          <li key={node.id} className="text-xs">
            <button
              type="button"
              onClick={() => {
                if (hasChildren) toggle(node.id);
                handleSelect(node.id);
              }}
              className={cn(
                "flex w-full items-center gap-1 py-1.5 text-left hover:text-foreground",
                isSelected && "font-semibold text-foreground",
              )}
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
                {node.children!.map((child) => {
                  const isChildSelected = selectedId === child.id;
                  return (
                    <li key={child.id}>
                      <button
                        type="button"
                        onClick={() => handleSelect(child.id)}
                        className={cn(
                          "flex w-full items-center justify-between py-1.5 text-left text-muted-foreground hover:text-foreground",
                          isChildSelected && "font-semibold text-foreground",
                        )}
                      >
                        <span>{child.name}</span>
                        <span className="text-xs">{child.count}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
}
