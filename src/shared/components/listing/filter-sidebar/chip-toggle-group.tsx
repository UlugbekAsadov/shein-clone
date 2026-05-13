"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface IOption {
  id: string;
  label: string;
}

interface IProps {
  options: IOption[];
  initialSelected?: string[];
}

export function ChipToggleGroup({ options, initialSelected = [] }: IProps) {
  const [selected, setSelected] = useState<Record<string, boolean>>(
    Object.fromEntries(initialSelected.map((id) => [id, true])),
  );

  const toggle = (id: string) =>
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const active = !!selected[option.id];
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => toggle(option.id)}
            className={cn(
              "rounded-[8px] border px-3 py-1 text-xs font-medium transition-colors cursor-pointer",
              active
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-secondary text-foreground hover:text-foreground",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
