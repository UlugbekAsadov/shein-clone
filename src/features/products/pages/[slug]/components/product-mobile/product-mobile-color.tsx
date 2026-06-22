"use client";

import Image from "next/image";
import type { ISwatch } from "@/types/swatch.interface";
import { cn } from "@/lib/utils";

interface IProps {
  swatches: ISwatch[];
  value: string;
  error?: boolean;
  onChange: (id: string) => void;
}

export function ProductMobileColor({
  swatches,
  value,
  error,
  onChange,
}: IProps) {
  const selected = swatches.find((s) => s.id === value);

  return (
    <div className={cn("mt-5", error && "animate-[shake_0.4s_ease-in-out]")}>
      <div className="mb-2 flex items-center gap-1.5">
        <span className="text-sm font-bold text-foreground">Color:</span>
        {selected ? (
          <span className="text-xs text-muted-foreground">{selected.name}</span>
        ) : error ? (
          <span className="text-xs font-medium text-destructive">
            Please select a color
          </span>
        ) : null}
      </div>
      <div className="-mx-4 overflow-x-auto px-4 py-1 [&::-webkit-scrollbar]:hidden">
        <div className="flex w-max gap-3">
          {swatches.map((c) => (
            <button
              type="button"
              key={c.id}
              onClick={() => onChange(c.id)}
              aria-label={c.name}
              className={cn(
                "relative aspect-3/4 w-16 shrink-0 cursor-pointer overflow-hidden rounded-[12px] ring-2 ring-offset-[1.5px] transition",
                value === c.id ? "ring-foreground" : "ring-gray-100",
              )}
            >
              <Image
                src={c.image}
                alt={c.name}
                fill
                quality={100}
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
