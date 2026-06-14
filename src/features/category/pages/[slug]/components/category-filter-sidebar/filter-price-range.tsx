"use client";

import { Slider } from "@/shared/components/ui/slider";
import { Input } from "@/shared/components/ui/input";

interface IProps {
  toLabel: string;
  bounds: { min: number; max: number };
  range: [number, number];
  onChange: (range: [number, number]) => void;
}

export function FilterPriceRange({ toLabel, bounds, range, onChange }: IProps) {
  const step = Math.max(1, Math.ceil((bounds.max - bounds.min) / 200));

  return (
    <div className="flex flex-col gap-4 py-4">
      <Slider
        value={range}
        onValueChange={(v) => onChange([v[0], v[1]] as [number, number])}
        min={bounds.min}
        max={bounds.max}
        step={step}
      />
      <div className="flex items-center gap-2">
        <Input
          value={range[0]}
          onChange={(e) =>
            onChange([Number(e.target.value || bounds.min), range[1]])
          }
          className="h-9 text-sm rounded-[12px] bg-secondary font-medium flex-1"
          inputMode="numeric"
        />
        <span className="text-xs text-muted-foreground font-medium shrink-0">
          {toLabel}
        </span>
        <Input
          value={range[1]}
          onChange={(e) =>
            onChange([range[0], Number(e.target.value || bounds.max)])
          }
          className="h-9 text-sm rounded-[12px] bg-secondary font-medium flex-1"
          inputMode="numeric"
        />
      </div>
    </div>
  );
}
