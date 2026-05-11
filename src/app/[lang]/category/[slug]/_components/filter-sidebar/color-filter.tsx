"use client";

import { useState } from "react";
import { colorSwatches } from "../../_lib/category-page.mocks";
import { cn } from "@/lib/utils";

export function ColorFilter() {
  const [selected, setSelected] = useState<string>("red");

  return (
    <div className="grid grid-cols-6 gap-3">
      {colorSwatches.map((color) => {
        const active = selected === color.id;
        return (
          <button
            key={color.id}
            type="button"
            aria-label={color.name}
            onClick={() => setSelected(color.id)}
            className={cn(
              "relative size-6 rounded-full border border-border transition-transform",
              active && "ring-2 ring-foreground ring-offset-2",
            )}
            style={{ backgroundColor: color.hex }}
          />
        );
      })}
    </div>
  );
}
