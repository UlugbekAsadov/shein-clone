"use client";

import { cn } from "@/lib/utils";
import type { ICommentsSortControl } from "@/features/products/pages/[slug]/pages/comments/utils/comments-sort.interface";

interface IProps {
  sort: ICommentsSortControl;
}

export function CommentsSortList({ sort }: IProps) {
  return (
    <div className="flex flex-col gap-2.5">
      {sort.options.map((option) => {
        const active = sort.value === option.id;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => sort.onChange(option.id)}
            className="flex cursor-pointer items-center gap-2.5 text-sm"
          >
            <span
              className={cn(
                "grid size-4 place-items-center rounded-full border transition-colors",
                active ? "border-foreground" : "border-input",
              )}
            >
              {active && <span className="size-2 rounded-full bg-foreground" />}
            </span>
            <span className="text-foreground">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
