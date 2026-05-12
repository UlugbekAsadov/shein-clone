import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface IProps {
  title: React.ReactNode;
  subtitle?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  viewAllHiddenOnMobile?: boolean;
  rightAction?: React.ReactNode;
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  viewAllHref,
  viewAllLabel,
  viewAllHiddenOnMobile,
  rightAction,
  className,
}: IProps) {
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
              className={cn(
                "inline-flex items-center gap-1 text-sm font-medium text-foreground hover:underline",
                viewAllHiddenOnMobile && "hidden md:inline-flex",
              )}
            >
              {viewAllLabel}
              <ChevronRight className="size-4" />
            </Link>
          )}
    </div>
  );
}
