"use client";

import { Minus, Plus } from "lucide-react";

interface IProps {
  value: number;
  onChange: (value: number) => void;
}

export function ProductQtyStepper({ value, onChange }: IProps) {
  return (
    <div>
      <div className="mb-2 text-sm font-semibold">Qty:</div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onChange(Math.max(1, value - 1))}
          aria-label="Decrease quantity"
          className="grid size-11 cursor-pointer place-items-center rounded-full border border-border bg-background text-foreground transition hover:bg-muted"
        >
          <Minus className="size-4" />
        </button>
        <div className="grid h-11 min-w-14 place-items-center px-3 text-base font-semibold">
          {value}
        </div>
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          aria-label="Increase quantity"
          className="grid size-11 cursor-pointer place-items-center rounded-full border border-border bg-background text-foreground transition hover:bg-muted"
        >
          <Plus className="size-4" />
        </button>
      </div>
    </div>
  );
}
