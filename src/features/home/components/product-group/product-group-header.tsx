import Link from "next/link";
import { AltArrowRight } from "@solar-icons/react/ssr";
import { cn } from "@/lib/utils";
import { ProductGroupTimer } from "@/features/home/components/product-group/product-group-timer/product-group-timer";

interface IProps {
  title: React.ReactNode;
  subtitle?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  viewAllHiddenOnMobile?: boolean;
  rightAction?: React.ReactNode;
  className?: string;
  subTitleClassName?: string;
  subTitleColor?: string;
  colorHiddenOnMobile?: boolean;
  timer?: number;
  timerColor?: string;
}

export function ProductGroupHeader({
  title,
  subtitle,
  viewAllHref,
  viewAllLabel,
  viewAllHiddenOnMobile,
  rightAction,
  className,
  subTitleClassName,
  subTitleColor,
  colorHiddenOnMobile,
  timer,
  timerColor,
}: IProps) {
  return (
    <div
      className={cn(
        "mb-3 flex items-center justify-between gap-4 px-3 pt-3",
        "md:mb-4 md:p-0",
        className,
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
            <p
              className={cn(
                "mt-1 text-xs text-muted-foreground",
                colorHiddenOnMobile && "max-md:text-muted-foreground!",
                subTitleClassName,
              )}
              style={{ color: subTitleColor }}
            >
              {subtitle}
            </p>
          )}
        </div>
        {timer && <ProductGroupTimer timer={timer} color={timerColor} />}
      </div>

      {rightAction
        ? rightAction
        : viewAllHref &&
          viewAllLabel && (
            <Link
              href={viewAllHref}
              className={cn(
                "inline-flex text-[13px] whitespace-nowrap md:text-base items-center gap-1 font-medium text-secondary-foreground",
                viewAllHiddenOnMobile && "hidden md:inline-flex",
                colorHiddenOnMobile && "max-md:text-secondary-foreground!",
                className,
              )}
              style={{ color: subTitleColor }}
            >
              {viewAllLabel}
              <AltArrowRight className="size-5" weight="Outline" />
            </Link>
          )}
    </div>
  );
}
