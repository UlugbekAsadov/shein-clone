import { cn } from "@/lib/utils";
import { AltArrowRight } from "@solar-icons/react/ssr";
import type { ReactNode } from "react";

interface IProps {
  icon: ReactNode;
  children: ReactNode;
  showChevron?: boolean;
  className?: string;
  onClick?: () => void;
}

export function ProductShippingRow({
  icon,
  children,
  className,
  showChevron = true,
  onClick,
}: IProps) {
  const content = (
    <>
      <div className="mt-0.5 grid size-6 place-items-center text-emerald-600">
        {icon}
      </div>
      <div className="flex-1 text-sm">{children}</div>
      {showChevron && onClick && (
        <AltArrowRight
          className="mt-1 size-4 text-muted-foreground"
          weight="Outline"
        />
      )}
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "flex w-full items-start gap-3 text-left transition-opacity cursor-pointer",
          className,
        )}
      >
        {content}
      </button>
    );
  }

  return (
    <div className={cn("flex items-start gap-3", className)}>{content}</div>
  );
}
