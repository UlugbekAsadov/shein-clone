"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const options = [
  { id: "date", label: "Date" },
  { id: "rating", label: "Rating" },
];

export function CommentsMobileSort() {
  const [selected, setSelected] = useState<string>("rating");

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const active = selected === option.id;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => setSelected(option.id)}
            className={cn(
              "rounded-full border px-5 py-2 text-sm font-semibold transition cursor-pointer",
              active
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-background text-foreground",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
