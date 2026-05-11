"use client";

import { BadgeCheck } from "lucide-react";
import type { ISize } from "@/lib/interfaces/size.interface";
import { cn } from "@/lib/utils";

interface IProps {
  sizes: ISize[];
  value: string;
  recommended: string;
  onChange: (id: string) => void;
}

export function ProductSizeSelector({
  sizes,
  value,
  recommended,
  onChange,
}: IProps) {
  return (
    <div>
      <div className="mb-2 text-sm font-semibold">Size:</div>
      <div className="flex flex-wrap gap-2">
        {sizes.map((s) => {
          const selected = s.id === value;
          const isRecommended = s.id === recommended;
          return (
            <button
              type="button"
              key={s.id}
              disabled={!s.available}
              onClick={() => onChange(s.id)}
              className={cn(
                "relative h-11 min-w-14 cursor-pointer rounded-full px-5 text-sm font-semibold transition",
                selected
                  ? "bg-foreground text-background"
                  : "border border-border bg-background text-foreground hover:bg-muted",
                !s.available &&
                  "cursor-not-allowed text-muted-foreground line-through opacity-50 hover:bg-background",
              )}
            >
              {s.id}
              {selected && isRecommended && (
                <span className="absolute -bottom-1 -right-1 grid size-4 place-items-center rounded-full bg-emerald-500 ring-2 ring-background">
                  <BadgeCheck className="size-3 text-white" />
                </span>
              )}
            </button>
          );
        })}
      </div>
      <div className="mt-3 flex items-center gap-2 text-sm">
        <BadgeCheck className="size-4 fill-emerald-500 text-white" />
        <span className="text-muted-foreground">Recommended for you:</span>
        <span className="font-semibold">{recommended}</span>
      </div>
    </div>
  );
}
