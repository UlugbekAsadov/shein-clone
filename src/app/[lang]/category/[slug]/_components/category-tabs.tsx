"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface IProps {
  similarLabel: string;
  dealsLabel: string;
}

export function CategoryTabs({ similarLabel, dealsLabel }: IProps) {
  const [active, setActive] = useState<"similar" | "deals">("similar");

  return (
    <div className="flex items-center gap-6 border-b border-border">
      <button
        type="button"
        onClick={() => setActive("similar")}
        className={cn(
          "relative pb-3 text-sm font-semibold transition-colors",
          active === "similar"
            ? "text-foreground"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        {similarLabel}
        {active === "similar" && (
          <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-foreground" />
        )}
      </button>
      <button
        type="button"
        onClick={() => setActive("deals")}
        className={cn(
          "relative flex items-center gap-1.5 pb-3 text-sm font-semibold transition-colors",
          active === "deals"
            ? "text-foreground"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        {dealsLabel}
        <span className="grid size-4 place-items-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
          %
        </span>
        {active === "deals" && (
          <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-foreground" />
        )}
      </button>
    </div>
  );
}
