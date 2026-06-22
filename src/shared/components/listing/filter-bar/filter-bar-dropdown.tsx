"use client";

import { AltArrowDown } from "@solar-icons/react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/shared/components/ui/hover-card";

interface IProps {
  label: string;
  count?: number;
  children: React.ReactNode;
  contentClassName?: string;
}

export function FilterBarDropdown({
  label,
  count,
  children,
  contentClassName,
}: IProps) {
  const active = !!count && count > 0;

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <button
          type="button"
          className="inline-flex h-9.5 items-center gap-1.5 rounded-[10px] bg-secondary px-3.5 text-sm font-medium text-foreground transition-colors cursor-pointer hover:bg-muted data-[state=open]:bg-muted"
        >
          <span>{label}</span>
          {active && (
            <span className="grid min-w-4.5 place-items-center rounded-full bg-foreground px-1 text-[11px] font-bold text-background">
              {count}
            </span>
          )}
          <AltArrowDown className="size-4.5 text-secondary-foreground" />
        </button>
      </HoverCardTrigger>
      <HoverCardContent className={contentClassName}>
        {children}
      </HoverCardContent>
    </HoverCard>
  );
}
