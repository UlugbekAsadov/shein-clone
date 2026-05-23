import {
  Box,
  ChatRound,
  MedalRibbonStar,
  UsersGroupRounded,
} from "@solar-icons/react/ssr";
import type { IShopStat } from "@/features/shop/pages/[slug]/utils/shop-detail.interface";

const ICON_MAP = {
  box: Box,
  medal: MedalRibbonStar,
  users: UsersGroupRounded,
  chat: ChatRound,
} as const;

interface IProps {
  stats: IShopStat[];
}

export function ShopProfileStats({ stats }: IProps) {
  return (
    <ul className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
      {stats.map(({ id, value, label, icon }) => {
        const Icon = ICON_MAP[icon];
        return (
          <li key={id} className="flex items-center gap-1">
            <Icon className="size-5 text-secondary-foreground" weight="Bold" />
            <span className="font-semibold text-foreground">
              {value} <span className="text-muted-foreground">{label}</span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}
