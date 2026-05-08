import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  title: React.ReactNode;
  subtitle?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  rightAction?: React.ReactNode;
  className?: string;
};

export function SectionHeader({
  title,
  subtitle,
  viewAllHref,
  viewAllLabel,
  rightAction,
  className,
}: Props) {
  return (
    <div className={cn("mb-4 flex items-end justify-between gap-4", className)}>
      <div>
        <h2 className="text-xl font-bold leading-tight">{title}</h2>
        {subtitle && (
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
      {rightAction
        ? rightAction
        : viewAllHref &&
          viewAllLabel && (
            <Link
              href={viewAllHref}
              className="inline-flex items-center gap-1 text-sm font-medium text-foreground hover:underline"
            >
              {viewAllLabel}
              <ChevronRight className="size-4" />
            </Link>
          )}
    </div>
  );
}
