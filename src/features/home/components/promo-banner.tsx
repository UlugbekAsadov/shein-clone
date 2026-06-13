import Link from "next/link";
import { Bag4 } from "@solar-icons/react/ssr";
import type { IMarketingBadge } from "@/features/home/utils/marketing-badge.interface";

const ICON_MAP = {
  bag: Bag4,
} as const;

interface IProps {
  badge: IMarketingBadge;
}

export function PromoBanner({ badge }: IProps) {
  const Icon = ICON_MAP[badge.icon as keyof typeof ICON_MAP] ?? Bag4;

  return (
    <div className="mx-auto max-w-360 px-6 py-6">
      <Link href={badge.url ?? "#"} target="_blank" rel="noopener noreferrer">
        <div
          style={{ backgroundColor: badge.bg_color }}
          className="flex items-center justify-center gap-4 cursor-pointer rounded-[18px] px-8 py-2.5"
        >
          <div className="flex items-center gap-1.5">
            <Icon className="size-6" style={{ color: badge.text_1_color }} weight="Bold" />
            <span
              style={{ color: badge.text_1_color }}
              className="text-sm font-bold uppercase tracking-wider"
            >
              {badge.text_1}
            </span>
          </div>
          <span style={{ color: badge.text_2_color }} className="text-sm">
            {badge.text_2}
          </span>
          <span
            style={{ color: badge.text_3_color }}
            className="text-sm font-bold transition-colors"
          >
            {badge.text_3}
          </span>
        </div>
      </Link>
    </div>
  );
}
