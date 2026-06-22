"use client";

import { AltArrowDown } from "@solar-icons/react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/shared/components/ui/hover-card";
import { cn } from "@/lib/utils";
import { XIcon } from "../../icons/outline";

interface IProps {
  label: string;
  count?: number;
  children: React.ReactNode;
  contentClassName?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onClear?: () => void;
}

export function FilterBarDropdown({
  label,
  count,
  children,
  contentClassName,
  open,
  onOpenChange,
  onClear,
}: IProps) {
  const active = !!count && count > 0;

  return (
    <HoverCard open={open} onOpenChange={onOpenChange}>
      <HoverCardTrigger asChild>
        <button
          type="button"
          className={cn(
            "inline-flex h-9.5 items-center gap-1.5 rounded-[10px] px-3.5 text-sm font-medium transition-colors cursor-pointer ",
            active
              ? "bg-primary text-white hover:bg-primary-20 data-[state=open]:bg-primary"
              : "bg-secondary text-foreground hover:bg-muted data-[state=open]:bg-muted",
          )}
        >
          <span>{label}</span>
          {active && <span className="grid font-bold">{count}</span>}
          {active ? (
            <span
              role="button"
              tabIndex={0}
              aria-label={`${label} clear`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClear?.();
              }}
              onPointerDown={(e) => e.stopPropagation()}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  e.stopPropagation();
                  onClear?.();
                }
              }}
            >
              <XIcon className={cn("size-4.5 text-white cursor-pointer")} />
            </span>
          ) : (
            <AltArrowDown
              className={cn("size-4.5 text-secondary-foreground")}
            />
          )}
        </button>
      </HoverCardTrigger>
      <HoverCardContent className={contentClassName}>
        {children}
      </HoverCardContent>
    </HoverCard>
  );
}
