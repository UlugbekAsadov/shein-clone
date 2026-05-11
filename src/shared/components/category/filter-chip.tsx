import { cn } from "@/lib/utils";
import { filterChipTones } from "@/shared/constants/filter-chip-tones.constants";

interface IProps {
  icon: React.ReactNode;
  label: string;
  tone: keyof typeof filterChipTones;
}

export function FilterChip({ icon, label, tone }: IProps) {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-xs font-medium hover:bg-muted/80"
    >
      <span
        className={cn(
          "grid size-5 place-items-center rounded-full",
          filterChipTones[tone],
        )}
      >
        {icon}
      </span>
      {label}
    </button>
  );
}
