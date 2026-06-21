"use client";

import { useState } from "react";
import { Star } from "@solar-icons/react";
import { ratingFilterOptions } from "@/features/products/pages/[slug]/pages/comments/mocks/comments-filter.mocks";
import { cn } from "@/lib/utils";

interface IProps {
  initialSelected?: string[];
}

export function FilterMobileRating({ initialSelected = ["4"] }: IProps) {
  const [selected, setSelected] = useState<string[]>(initialSelected);

  const toggle = (id: string) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );

  return (
    <div className="flex flex-wrap gap-2">
      {ratingFilterOptions.map((option) => {
        const active = selected.includes(option.id);
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => toggle(option.id)}
            className={cn(
              "flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-semibold transition cursor-pointer",
              active
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-background text-foreground",
            )}
          >
            <Star weight="Bold" className="size-4 text-amber-400" />
            <span>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
