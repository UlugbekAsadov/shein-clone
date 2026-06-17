"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { AltArrowDown } from "@solar-icons/react";
import type { IApiFilterCategoryNode } from "@/types/filter-options.interface";

interface IProps {
  nodes: IApiFilterCategoryNode[];
  selectedIds: number[];
  onChange: (ids: number[]) => void;
}

export function FilterCategoryTree({ nodes, selectedIds, onChange }: IProps) {
  const [expanded, setExpanded] = useState<Record<number, boolean>>(() => {
    const initial: Record<number, boolean> = {};
    nodes.forEach((node) => {
      if (node.children?.some((child) => selectedIds.includes(child.id))) {
        initial[node.id] = true;
      }
    });
    return initial;
  });

  useEffect(() => {
    setExpanded((prev) => {
      const next = { ...prev };
      nodes.forEach((node) => {
        if (node.children?.some((child) => selectedIds.includes(child.id))) {
          next[node.id] = true;
        }
      });
      return next;
    });
  }, [selectedIds, nodes]);

  const toggleExpand = (id: number) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  const toggleSelection = (id: number) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((i) => i !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };

  return (
    <ul className="flex flex-col">
      {nodes.map((node) => {
        const hasChildren = !!node.children?.length;
        const isOpen = expanded[node.id];
        const isSelected = selectedIds.includes(node.id);
        return (
          <li key={node.id} className="text-xs cursor-pointer">
            <div
              className={cn(
                "flex w-full items-center gap-1 py-1.5 hover:bg-secondary p-1.5 rounded-[8px]",
                isSelected && "bg-secondary"
              )}
            >
              {hasChildren ? (
                <button
                  type="button"
                  onClick={() => toggleExpand(node.id)}
                  className="shrink-0"
                >
                  <AltArrowDown
                    className={cn(
                      "size-5 transition-transform text-secondary-foreground",
                      !isOpen && "-rotate-90",
                    )}
                  />
                </button>
              ) : (
                <span className="w-5 shrink-0" aria-hidden />
              )}
              <button
                type="button"
                onClick={() => toggleSelection(node.id)}
                className={cn(
                  "flex flex-1 items-center justify-between text-left  cursor-pointer",
                  isSelected
                    ? "text-primary font-semibold"
                    : "text-foreground font-medium",
                )}
              >
                <span className="flex-1">{node.name}</span>
                <span className="text-xs text-muted-foreground">
                  {node.products_count}
                </span>
              </button>
            </div>
            {hasChildren && isOpen && (
              <ul className="ml-5 flex flex-col border-l border-border pl-3">
                {node.children.map((child) => {
                  const isChildSelected = selectedIds.includes(child.id);
                  return (
                    <li key={child.id} className="pr-1.5">
                      <button
                        type="button"
                        onClick={() => toggleSelection(child.id)}
                        className={cn(
                          "flex w-full items-center justify-between py-1.5 text-left hover:text-foreground cursor-pointer",
                          isChildSelected
                            ? "text-primary font-semibold"
                            : "text-muted-foreground",
                        )}
                      >
                        <span>{child.name}</span>
                        <span className="text-xs">{child.products_count}</span>
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
