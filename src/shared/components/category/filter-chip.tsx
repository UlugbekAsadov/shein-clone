"use client";

import { cn } from "@/lib/utils";
import { filterChipTones } from "@/shared/constants/filter-chip-tones.constants";

interface IProps {
  icon: React.ReactNode;
  label: string;
  tone: keyof typeof filterChipTones;
  active?: boolean;
  onClick?: () => void;
}

export function FilterChip({ icon, label, tone, active, onClick }: IProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-[8px] px-3 py-1.5 text-xs font-medium cursor-pointer transition-colors",
        active
          ? "bg-foreground text-background hover:bg-foreground/90"
          : "bg-secondary hover:bg-muted/80",
      )}
    >
      <span
        className={cn(
          "grid size-4.5 place-items-center rounded-full",
          !active && filterChipTones[tone],
        )}
      >
        {icon}
      </span>
      {label}
    </button>
  );
}
