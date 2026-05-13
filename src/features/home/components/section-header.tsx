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
  subTitleClassName?: string;
}

export function SectionHeader({
  title,
  subtitle,
  viewAllHref,
  viewAllLabel,
  viewAllHiddenOnMobile,
  rightAction,
  className,
  subTitleClassName,
}: IProps) {
  return (
    <div
      className={cn("mb-4 flex items-center justify-between gap-4", className)}
    >
      <div>
        <h2 className="text-xl font-bold leading-tight">{title}</h2>
        {subtitle && (
          <p className={cn("mt-1 text-xs text-muted-foreground", subTitleClassName)}>
            {subtitle}
          </p>
        )}
      </div>
      {rightAction
        ? rightAction
        : viewAllHref &&
          viewAllLabel && (
            <Link
              href={viewAllHref}
              className={cn(
                "inline-flex items-center gap-1 font-medium text-secondary-foreground",
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
