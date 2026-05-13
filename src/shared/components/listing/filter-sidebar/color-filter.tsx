"use client";

import { useState } from "react";
import { filterColorSwatches } from "@/shared/mocks";
import { cn } from "@/lib/utils";

export function ColorFilter() {
  const [selected, setSelected] = useState<string>("red");

  return (
    <div className="flex flex-wrap gap-1.5">
      {filterColorSwatches.map((color) => {
        const active = selected === color.id;
        return (
          <button
            key={color.id}
            type="button"
            aria-label={color.name}
            onClick={() => setSelected(color.id)}
            className={cn(
              "relative size-8 rounded-full border border-border transition-transform cursor-pointer",
              active && "ring-2 ring-foreground ring-offset-[0.5px]",
            )}
            style={{ backgroundColor: color.hex }}
          />
        );
      })}
    </div>
  );
}
