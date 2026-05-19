import { AltArrowRight } from "@solar-icons/react";

interface IProps {
  label: string;
  subLabel: string;
  onClick: () => void;
}

export function MeasurementMobileRow({ label, subLabel, onClick }: IProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-[18px] bg-secondary p-3 text-left active:bg-secondary/80"
    >
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="text-sm font-semibold text-foreground">{label}</span>
        <span className="text-xs font-regular text-muted-foreground">
          {subLabel}
        </span>
      </div>
      <AltArrowRight className="size-6 shrink-0 text-foreground" />
    </button>
  );
}
