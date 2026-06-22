"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowLeft, AltArrowRight } from "@solar-icons/react";
import type { IApiFilterCategoryNode } from "@/types/filter-options.interface";

interface IProps {
  nodes: IApiFilterCategoryNode[];
  selectedIds: number[];
  onChange: (ids: number[]) => void;
  rootLabel: string;
}

function findAncestorPath(
  nodes: IApiFilterCategoryNode[],
  targetId: number,
): IApiFilterCategoryNode[] | null {
  for (const node of nodes) {
    if (node.id === targetId) return [];
    if (node.children?.length) {
      const sub = findAncestorPath(node.children, targetId);
      if (sub !== null) return [node, ...sub];
    }
  }
  return null;
}

export function FilterCategoryDrill({
  nodes,
  selectedIds,
  onChange,
  rootLabel,
}: IProps) {
  const rootDepth = nodes.length === 1 ? 1 : 0;
  const [path, setPath] = useState<IApiFilterCategoryNode[]>(() => {
    if (selectedIds.length > 0) {
      const ancestors = findAncestorPath(nodes, selectedIds[0]);
      if (ancestors !== null) return ancestors;
    }
    return nodes.length === 1 ? [nodes[0]] : [];
  });

  const currentChildren =
    path.length > 0 ? (path[path.length - 1].children ?? []) : nodes;
  const header = path.length > 0 ? path[path.length - 1] : null;
  const canGoBack = path.length > rootDepth;
  const backLabel = path.length >= 2 ? path[path.length - 2].name : rootLabel;

  const goBack = () => setPath((prev) => prev.slice(0, -1));

  const handleNodeClick = (node: IApiFilterCategoryNode) => {
    if (node.children?.length) {
      setPath((prev) => [...prev, node]);
      return;
    }
    onChange(selectedIds.includes(node.id) ? [] : [node.id]);
  };

  return (
    <div className="flex flex-col">
      {canGoBack && (
        <button
          type="button"
          onClick={goBack}
          className={cn(
            "flex w-full items-center gap-2 rounded-[8px] pb-2 text-left transition-colors cursor-pointer font-medium hover:text-primary text-muted-foreground",
          )}
        >
          <ArrowLeft className="size-5" />
          <span>{backLabel}</span>
        </button>
      )}

      <p className="pb-1.5 text-base font-bold text-foreground">
        {header ? header.name : rootLabel}
      </p>

      <ul className="scrollbar-slim flex max-h-72 flex-col overflow-y-auto pr-1.5">
        {currentChildren.map((node) => {
          const hasChildren = !!node.children?.length;
          const isSelected = selectedIds.includes(node.id);
          return (
            <li key={node.id}>
              <button
                type="button"
                onClick={() => handleNodeClick(node)}
                className={cn(
                  "flex w-full items-center justify-between gap-2 rounded-[8px] py-2 text-left text-sm transition-colors cursor-pointer hover:text-primary",
                  isSelected
                    ? "font-semibold text-primary"
                    : "font-medium text-muted-foreground",
                )}
              >
                <span className="flex-1">{node.name}</span>
                {hasChildren && (
                  <AltArrowRight className="size-4.5 shrink-0 text-muted-foreground" />
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
