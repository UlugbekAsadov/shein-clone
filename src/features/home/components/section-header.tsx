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
      className={cn(
        "mb-3 flex items-center justify-between gap-4 px-3 pt-3",
        "md:mb-4 md:p-0",
        className,
      )}
    >
      <div>
        <h2 className="text-base md:text-xl font-semibold md:font-bold leading-tight">
          {title}
        </h2>
        {subtitle && (
          <p
            className={cn(
              "mt-1 text-xs text-muted-foreground",
              subTitleClassName,
            )}
          >
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
                "inline-flex text-[13px] md:text-base items-center gap-1 font-medium text-secondary-foreground",
                viewAllHiddenOnMobile && "hidden md:inline-flex",
              )}
            >
              {viewAllLabel}
              <ChevronRight className="size-5" />
            </Link>
          )}
    </div>
  );
}
