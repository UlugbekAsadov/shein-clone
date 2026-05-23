import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface IProps {
  flag: ReactNode;
  label: string;
  selected: boolean;
  onSelect: () => void;
}

export function LanguageMobileRow({ flag, label, selected, onSelect }: IProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="flex w-full items-center gap-3 rounded-[18px] bg-secondary p-3 text-left active:bg-secondary/80"
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-[8px] bg-background">
        {flag}
      </span>
      <span className="flex-1 text-sm font-semibold text-foreground">
        {label}
      </span>
      <span
        className={cn(
          "grid size-6 shrink-0 place-items-center rounded-full",
          selected ? "bg-foreground" : "bg-background",
        )}
        aria-hidden
      >
        {selected && <span className="size-2 rounded-full bg-background" />}
      </span>
    </button>
  );
}
