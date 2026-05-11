"use client";

import Image from "next/image";
import type { ISwatch } from "@/types/swatch.interface";
import { cn } from "@/lib/utils";

interface IProps {
  swatches: ISwatch[];
  value: string;
  onChange: (id: string) => void;
}

export function ProductColorSelector({ swatches, value, onChange }: IProps) {
  const selected = swatches.find((s) => s.id === value);

  return (
    <div>
      <div className="mb-2">
        <span className="font-bold">Color:</span>{" "}
        <span className="text-muted-foreground text-xs">{selected?.name}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {swatches.map((c) => (
          <button
            type="button"
            key={c.id}
            onClick={() => onChange(c.id)}
            aria-label={c.name}
            className={cn(
              "relative w-16 aspect-3/4 cursor-pointer overflow-hidden rounded-sm ring-2 transition",
              value === c.id
                ? "ring-foreground"
                : "ring-transparent hover:ring-muted-foreground/40",
            )}
          >
            <Image
              src={c.image}
              alt={c.name}
              fill
              quality={80}
              sizes="56px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
