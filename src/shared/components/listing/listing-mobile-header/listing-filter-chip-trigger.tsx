"use client";

import { forwardRef } from "react";
import { AltArrowDown } from "@solar-icons/react";
import { cn } from "@/lib/utils";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export const ListingFilterChipTrigger = forwardRef<HTMLButtonElement, IProps>(
  function ListingFilterChipTrigger({ label, className, ...props }, ref) {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "flex shrink-0 items-center gap-1 rounded-full bg-secondary px-3.5 py-2 text-sm font-medium text-foreground",
          className,
        )}
        {...props}
      >
        <span>{label}</span>
        <AltArrowDown className="size-4" />
      </button>
    );
  },
);
