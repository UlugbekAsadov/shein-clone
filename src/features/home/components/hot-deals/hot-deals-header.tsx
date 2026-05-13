import { FlameSolid } from "@/shared/components/icons/solid";
import { AltArrowRight } from "@solar-icons/react";
import { HotDealsTimer } from "./hot-deals-timer";

interface IProps {
  title: string;
  subtitle: string;
  viewAllLabel: string;
}

export const HotDealsHeader = ({ title, subtitle, viewAllLabel }: IProps) => {
  return (
    <div className="mb-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
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
