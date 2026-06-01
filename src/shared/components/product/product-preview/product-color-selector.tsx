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
    <div className="">
      <div className="mb-2">
        <span className="font-bold">Color:</span>{" "}
        <span className="text-muted-foreground text-xs">{selected?.name}</span>
      </div>
      <div className="flex flex-wrap gap-3">
        {swatches.map((c) => (
          <button
            type="button"
            key={c.id}
            onClick={() => onChange(c.id)}
            aria-label={c.name}
            className={cn(
              "relative w-16 aspect-3/4 cursor-pointer overflow-hidden rounded-[9px] ring-2 ring-offset-[1.5px] transition",
              value === c.id ? "ring-foreground" : "ring-gray-100",
            )}
          >
            <Image
              src={c.image}
              alt={c.name}
              fill
              quality={100}
              sizes="56px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
