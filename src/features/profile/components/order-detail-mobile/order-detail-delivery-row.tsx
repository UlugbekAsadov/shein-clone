import type { ComponentType } from "react";
import type { IconProps } from "@solar-icons/react";

interface IProps {
  icon: ComponentType<IconProps>;
  label: string;
  value: string;
  isLast?: boolean;
}

export function OrderDetailDeliveryRow({
  icon: Icon,
  label,
  value,
  isLast,
}: IProps) {
  return (
    <div className="relative flex items-start gap-3 pb-5 last:pb-0">
      {!isLast && (
        <span
          aria-hidden
          className="absolute left-5 top-10 bottom-0 w-px border-l border-dashed border-foreground/30"
        />
      )}

      <span className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full bg-background text-foreground">
        <Icon className="size-6" />
      </span>

      <div className="min-w-0 flex-1 pt-1">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="text-sm font-semibold text-foreground">{value}</p>
      </div>
    </div>
  );
}
