"use client";

import { useState } from "react";
import { clothingSizes, shoeSizes } from "@/shared/mocks";
import { cn } from "@/lib/utils";

interface IProps {
  clothingLabel: string;
  shoesLabel: string;
}

export function SizeFilter({ clothingLabel, shoesLabel }: IProps) {
  const [tab, setTab] = useState<"clothing" | "shoes">("clothing");
  const [selected, setSelected] = useState<string>("l");
  const sizes = tab === "clothing" ? clothingSizes : shoeSizes;

  return (
    <div className="flex flex-col gap-3.5">
      <div className="grid grid-cols-2 rounded-[12px] bg-muted p-1 text-xs font-medium">
        <button
          type="button"
          onClick={() => setTab("clothing")}
          className={cn(
            "rounded-[8px] py-1.5 transition-colors cursor-pointer text-xs",
            tab === "clothing"
              ? "bg-background text-foreground shadow-sm"
              : "text-secondary-foreground hover:text-foreground",
          )}
        >
          {clothingLabel}
        </button>
        <button
          type="button"
          onClick={() => setTab("shoes")}
          className={cn(
            "rounded-[8px] py-1.5 transition-colors cursor-pointer text-xs",
            tab === "shoes"
              ? "bg-background text-foreground shadow-sm"
              : "text-secondary-foreground hover:text-foreground",
          )}
        >
          {shoesLabel}
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => {
          const active = selected === size.id;
          return (
            <button
              key={size.id}
              type="button"
              onClick={() => setSelected(size.id)}
              className={cn(
                "relative grid min-w-8 h-8 place-items-center rounded-[12px] border px-2 text-[10px] font-semibold transition-colors cursor-pointer",
                active
                  ? "bg-primary text-primary-foreground"
                  : "border-border bg-background text-foreground hover:text-foreground",
              )}
            >
              {size.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
