import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface IProps {
  title: React.ReactNode;
  subtitle?: string;
  viewAllHref: string;
  viewAllLabel: string;
}

export function FeaturedShopsHeader({
  title,
  subtitle,
  viewAllHref,
  viewAllLabel,
}: IProps) {
  return (
    <div
      className={cn(
        "mb-3 flex items-center justify-between gap-4 px-3 pt-3",
        "md:mb-4 md:p-0",
      )}
    >
      <div
        className={cn(
          "flex items-center gap-4 justify-between w-full",
          "md:justify-start md:w-fit",
        )}
      >
        <div>
          <h2
            className={cn(
              "text-base md:text-xl font-semibold md:font-bold leading-tight",
            )}
          >
            {title}
          </h2>
          {subtitle && (
            <p className={cn("mt-1 text-xs text-muted-foreground")}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
      <Link
        href={viewAllHref}
        className={cn(
          "inline-flex text-[13px] md:text-base items-center gap-1 font-medium text-secondary-foreground",
        )}
      >
        {viewAllLabel}
        <ChevronRight className="size-5" />
      </Link>
    </div>
  );
}
