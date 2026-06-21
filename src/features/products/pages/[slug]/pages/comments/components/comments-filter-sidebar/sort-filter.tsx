"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const options = [
  { id: "date", label: "Date" },
  { id: "rating", label: "Rating" },
];

export function SortFilter() {
  const [selected, setSelected] = useState<string>("rating");

  return (
    <div className="flex flex-col gap-2.5">
      {options.map((option) => {
        const active = selected === option.id;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => setSelected(option.id)}
            className="flex cursor-pointer items-center gap-2.5 text-sm"
          >
            <span
              className={cn(
                "grid size-4 place-items-center rounded-full border transition-colors",
                active ? "border-foreground" : "border-input",
              )}
            >
              {active && (
                <span className="size-2 rounded-full bg-foreground" />
              )}
            </span>
            <span className="text-foreground">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
