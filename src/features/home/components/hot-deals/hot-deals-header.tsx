import { FlameSolid } from "@/shared/components/icons/solid";
import { AltArrowRight } from "@solar-icons/react";
import { HotDealsTimer } from "./hot-deals-timer";
import { cn } from "@/lib/utils";

interface IProps {
  title: string;
  subtitle: string;
  viewAllLabel: string;
}

export const HotDealsHeader = ({ title, subtitle, viewAllLabel }: IProps) => {
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
          <h2 className="text-xl font-bold leading-tight">
            <span className="flex items-center gap-1 text-white">
              {title}
              <FlameSolid className="size-6" />
            </span>
          </h2>
          <p className="text-xs text-secondary mt-0.5">{subtitle}</p>
        </div>
        <HotDealsTimer />
      </div>
      <a
        href="#"
        className="hidden items-center gap-1 text-sm font-medium text-white md:inline-flex"
      >
        {viewAllLabel}
        <AltArrowRight className="size-4" />
      </a>
    </div>
  );
};
