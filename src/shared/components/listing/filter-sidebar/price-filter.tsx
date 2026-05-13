"use client";

import { useState } from "react";
import { Slider } from "@/shared/components/ui/slider";
import { Input } from "@/shared/components/ui/input";
import { pricePresets } from "@/shared/mocks";
import {
  defaultPriceRange,
  priceBounds,
} from "@/shared/constants/listing.constants";
import { cn } from "@/lib/utils";

interface IProps {
  toLabel: string;
}

export function PriceFilter({ toLabel }: IProps) {
  const [range, setRange] = useState<[number, number]>(defaultPriceRange);
  const [activePreset, setActivePreset] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-4">
      <Slider
        value={range}
        onValueChange={(v) => {
          setRange([v[0], v[1]] as [number, number]);
          setActivePreset(null);
        }}
        min={priceBounds.min}
        max={priceBounds.max}
        step={5}
      />

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#6F6F75]">
            $
          </span>
          <Input
            value={range[0]}
            onChange={(e) => {
              const n = Number(e.target.value || 0);
              setRange([n, range[1]]);
              setActivePreset(null);
            }}
            className="h-9 pl-7 text-sm rounded-[12px] bg-secondary font-medium"
            inputMode="numeric"
          />
        </div>
        <span className="text-xs text-muted-foreground font-medium">{toLabel}</span>
        <div className="relative flex-1">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#6F6F75]">
            $
          </span>
          <Input
            value={range[1]}
            onChange={(e) => {
              const n = Number(e.target.value || 0);
              setRange([range[0], n]);
              setActivePreset(null);
            }}
            className="h-9 pl-7 text-sm rounded-[12px] bg-secondary font-medium"
            inputMode="numeric"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {pricePresets.map((preset) => {
          const active = activePreset === preset.id;
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => setActivePreset(preset.id)}
              className={cn(
                "rounded-[8px] border px-3 py-1 text-xs font-medium transition-colors cursor-pointer",
                active
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-secondary text-foreground hover:text-foreground",
              )}
            >
              {preset.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
