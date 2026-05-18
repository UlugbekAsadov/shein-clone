"use client";

import type { ReactNode } from "react";
import type { ISize } from "@/types/size.interface";
import { cn } from "@/lib/utils";
import { VerifiedCheck } from "@solar-icons/react";

interface IProps {
  sizes: ISize[];
  value: string;
  recommended: string;
  onChange: (id: string) => void;
  headerAction?: ReactNode;
  variant?: "pill" | "card";
  showHeader?: boolean;
  showRecommendation?: boolean;
  className?: string;
}

export function ProductSizeSelector({
  sizes,
  value,
  recommended,
  onChange,
  headerAction,
  variant = "pill",
  showHeader = true,
  showRecommendation = true,
  className,
}: IProps) {
  return (
    <div className={cn("mt-4", className)}>
      {showHeader && (
        <div className="mb-2 flex items-center justify-between font-bold">
          <span>Size:</span>
          {headerAction}
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        {sizes.map((s) => {
          const selected = s.id === value;
          const isRecommended = s.id === recommended;
          if (variant === "card") {
            return (
              <button
                type="button"
                key={s.id}
                disabled={!s.available}
                onClick={() => onChange(s.id)}
                className={cn(
                  "relative flex h-13 min-w-12 flex-col items-center justify-center rounded-[10px] border bg-background px-2 transition cursor-pointer",
                  selected
                    ? "border-foreground"
                    : "border-border hover:border-foreground/40",
                  !s.available &&
                    "cursor-not-allowed text-muted-foreground hover:border-border",
                )}
              >
                <span
                  className={cn(
                    "text-sm font-bold leading-none",
                    !s.available &&
                      "relative text-muted-foreground after:absolute after:-left-1 after:-right-1 after:top-1/2 after:h-px after:bg-border after:rotate-[-20deg]",
                  )}
                >
                  {s.id}
                </span>
                {s.subLabel && (
                  <span className="mt-1 text-[11px] leading-none text-muted-foreground">
                    {s.subLabel}
                  </span>
                )}
                {isRecommended && (
                  <VerifiedCheck className="absolute -top-1.5 -right-1.5 size-5 fill-emerald-500 text-white" />
                )}
              </button>
            );
          }
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
      {showRecommendation && (
        <div className="mt-3 flex items-center gap-2 text-sm">
          <VerifiedCheck className="size-6 text-white fill-emerald-500 " />
          <span className="text-muted-foreground">Recommended for you:</span>
          <span className="font-semibold text-emerald-500">{recommended}</span>
        </div>
      )}
    </div>
  );
}
