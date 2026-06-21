import { cn } from "@/lib/utils";
import { AltArrowRight } from "@solar-icons/react/ssr";
import type { ReactNode } from "react";

interface IProps {
  icon: ReactNode;
  children: ReactNode;
  showChevron?: boolean;
  className?: string;
}

export function ProductShippingRow({
  icon,
  children,
  className,
  showChevron = true,
}: IProps) {
  return (
    <div className={cn("flex items-start gap-3", className)}>
      <div className="mt-0.5 grid size-6 place-items-center text-emerald-600">
        {icon}
      </div>
      <div className="flex-1 text-sm">{children}</div>
      {showChevron && (
        <AltArrowRight className="mt-1 size-4 text-muted-foreground" weight="Outline" />
      )}
    </div>
  );
}
