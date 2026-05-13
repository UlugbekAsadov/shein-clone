"use client";

import type { ISize } from "@/types/size.interface";
import { cn } from "@/lib/utils";
import { VerifiedCheck } from "@solar-icons/react";

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
    <div className="mt-4">
      <div className="mb-2 font-bold">Size:</div>
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
                "relative h-10 min-w-14 cursor-pointer rounded-full border  px-5 text-xs font-semibold transition",
                selected
                  ? "bg-foreground text-background border-transparent"
                  : "border-border bg-background text-foreground hover:bg-muted",
                !s.available &&
                  "cursor-not-allowed overflow-hidden text-muted-foreground  hover:bg-background relative after:content-[''] after:absolute  after:w-full after:h-0.5 after:left-0 after:top-1/2 after:bg-border after:rotate-45",
              )}
            >
              {s.id}
              {isRecommended && (
                <VerifiedCheck className="size-6 text-white fill-emerald-500 absolute -bottom-2 -right-1" />
              )}
            </button>
          );
        })}
      </div>
      <div className="mt-3 flex items-center gap-2 text-sm">
        <VerifiedCheck className="size-6 text-white fill-emerald-500 " />
        <span className="text-muted-foreground">Recommended for you:</span>
        <span className="font-semibold text-emerald-500">{recommended}</span>
      </div>
    </div>
  );
}
