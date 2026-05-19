import { cn } from "@/lib/utils";

interface IProps {
  label: string;
  selected: boolean;
  onSelect: () => void;
}

export function MeasurementMobileOption({ label, selected, onSelect }: IProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="flex w-full items-center justify-between py-2.5 text-left"
    >
      <span className="text-sm font-semibold text-foreground">{label}</span>
      <span
        className={cn(
          "grid size-6 shrink-0 place-items-center rounded-full",
          selected ? "bg-foreground" : "bg-secondary",
        )}
        aria-hidden
      >
        {selected && (
          <span className="size-2 rounded-full bg-background" />
        )}
      </span>
    </button>
  );
}
