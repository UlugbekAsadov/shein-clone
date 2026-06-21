import type { ISellerStat } from "@/features/products/pages/[slug]/utils/seller-card.interface";
import {
  Box,
  ChatRoundLine,
  MedalRibbonStar,
  UsersGroupRounded,
} from "@solar-icons/react";

interface IProps {
  stat: ISellerStat;
}

const STAT_ICONS = {
  sold: Box,
  tenure: MedalRibbonStar,
  followers: UsersGroupRounded,
  response: ChatRoundLine,
} as const;

export function ProductSellerStat({ stat }: IProps) {
  const Icon = STAT_ICONS[stat.id as keyof typeof STAT_ICONS];

  return (
    <span className="flex items-center gap-1 text-xs text-secondary-foreground">
      {Icon ? <Icon className="size-5" weight="Bold" /> : null}
      <span className="font-semibold">{stat.value}</span>
      {stat.label}
    </span>
  );
}
