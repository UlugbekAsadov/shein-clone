"use client";

import { useState } from "react";
import { contentTypeFilterOptions } from "@/features/product/pages/[slug]/pages/comments/mocks/comments-filter.mocks";
import { cn } from "@/lib/utils";

interface IProps {
  initialSelected?: string;
}

export function FilterMobileContentType({
  initialSelected = "image",
}: IProps) {
  const [selected, setSelected] = useState<string>(initialSelected);

  return (
    <ul className="flex flex-col">
      {contentTypeFilterOptions.map((option) => {
        const active = selected === option.id;
        return (
          <li key={option.id}>
            <button
              type="button"
              onClick={() => setSelected(option.id)}
              className="flex w-full items-center justify-between py-3 text-left cursor-pointer"
            >
              <span className="text-sm text-foreground">{option.label}</span>
              <span
                className={cn(
                  "grid size-5 place-items-center rounded-full border transition-colors",
                  active ? "border-foreground" : "border-border",
                )}
              >
                {active && (
                  <span className="size-3 rounded-full bg-foreground" />
                )}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
