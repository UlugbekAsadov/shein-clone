"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface IProps {
  similarLabel: string;
  dealsLabel: string;
}

export function ListingTabs({ similarLabel, dealsLabel }: IProps) {
  const [active, setActive] = useState<"similar" | "deals">("similar");

  return (
    <div className="flex items-center gap-6 border-b-2 border-border pb-3.5">
      <button
        type="button"
        onClick={() => setActive("similar")}
        className={cn(
          "relative pb-3 font-bold transition-colors cursor-pointer",
          active === "similar"
            ? "text-foreground"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        {similarLabel}
        {active === "similar" && (
          <span className="absolute inset-x-0 bottom-2 h-0.5 rounded-full bg-foreground" />
        )}
      </button>
      <button
        type="button"
        onClick={() => setActive("deals")}
        className={cn(
          "relative flex items-center gap-1.5 pb-3 font-bold transition-colors cursor-pointer",
          active === "deals"
            ? "text-foreground"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        {dealsLabel}
        <span className="grid size-5 place-items-center rounded-full bg-[#E83737] text-xs font-bold text-white">
          %
        </span>
        {active === "deals" && (
          <span className="absolute inset-x-0 bottom-2 h-0.5 rounded-full bg-foreground" />
        )}
      </button>
    </div>
  );
}
