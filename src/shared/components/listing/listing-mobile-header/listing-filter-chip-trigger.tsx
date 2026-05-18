"use client";

import { forwardRef } from "react";
import { AltArrowDown } from "@solar-icons/react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  applied?: boolean;
  onClear?: () => void;
}

export const ListingFilterChipTrigger = forwardRef<HTMLButtonElement, IProps>(
  function ListingFilterChipTrigger(
    { label, applied, onClear, className, ...props },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "flex shrink-0 items-center gap-1 rounded-full px-3.5 py-2 text-xs font-medium",
          applied
            ? "bg-foreground text-background"
            : "bg-secondary text-foreground",
          className,
        )}
        {...props}
      >
        <span>{label}</span>
        {applied ? (
          <span
            role="button"
            aria-label={`Clear ${label}`}
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              onClear?.();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                e.stopPropagation();
                onClear?.();
              }
            }}
            className="ml-1 grid cursor-pointer place-items-center"
          >
            <X className="size-4" />
          </span>
        ) : (
          <AltArrowDown className="size-5" />
        )}
      </button>
    );
  },
);
