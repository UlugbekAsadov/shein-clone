"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { clothingSizes, shoeSizes } from "@/lib/mock-data";
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
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 rounded-lg bg-muted p-1 text-xs font-medium">
        <button
          type="button"
          onClick={() => setTab("clothing")}
          className={cn(
            "rounded-md py-1.5 transition-colors",
            tab === "clothing"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {clothingLabel}
        </button>
        <button
          type="button"
          onClick={() => setTab("shoes")}
          className={cn(
            "rounded-md py-1.5 transition-colors",
            tab === "shoes"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
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
                "relative grid h-8 min-w-9 place-items-center rounded-md border px-2 text-xs font-semibold transition-colors",
                active
                  ? "border-foreground bg-background text-foreground"
                  : "border-border bg-background text-muted-foreground hover:text-foreground",
              )}
            >
              {size.label}
              {active && (
                <span className="absolute -right-1 -top-1 grid size-3.5 place-items-center rounded-full bg-emerald-500 text-white">
                  <Check className="size-2.5" />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
