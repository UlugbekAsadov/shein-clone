"use client";

import Image from "next/image";
import type { ISwatch } from "@/lib/interfaces/swatch.interface";
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
      <div className="mb-2 text-sm">
        <span className="font-semibold">Color:</span>{" "}
        <span className="text-muted-foreground">{selected?.name}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {swatches.map((c) => (
          <button
            type="button"
            key={c.id}
            onClick={() => onChange(c.id)}
            aria-label={c.name}
            className={cn(
              "relative size-14 cursor-pointer overflow-hidden rounded-xl ring-2 transition",
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
