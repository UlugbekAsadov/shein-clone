"use client";

import { useState } from "react";
import { ChevronDown, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

const currencies = ["USD", "UZS", "RUB", "EUR"] as const;

export function CurrencySwitcher() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<(typeof currencies)[number]>("USD");

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-2 py-1 text-sm font-medium hover:opacity-80"
        aria-expanded={open}
      >
        <span className="grid size-5 place-items-center rounded-full bg-foreground text-background">
          <DollarSign className="size-3" />
        </span>
        <span>{selected}</span>
        <ChevronDown className="size-4" />
      </button>
      {open && (
        <div className="absolute right-0 top-full z-30 mt-2 w-32 overflow-hidden rounded-2xl border border-border bg-background shadow-xl">
          {currencies.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => {
                setSelected(c);
                setOpen(false);
              }}
              className={cn(
                "block w-full px-3 py-2.5 text-left text-sm hover:bg-muted",
                c === selected && "bg-muted/60",
              )}
            >
              {c}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
