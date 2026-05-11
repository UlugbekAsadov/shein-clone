import { Award, MessageCircle, Package, Users } from "lucide-react";
import type { ISellerStat } from "@/features/product/types";

interface IProps {
  stat: ISellerStat;
}

const STAT_ICONS = {
  sold: Package,
  tenure: Award,
  followers: Users,
  response: MessageCircle,
} as const;

export function ProductSellerStat({ stat }: IProps) {
  const Icon = STAT_ICONS[stat.id as keyof typeof STAT_ICONS];

  return (
    <span className="flex items-center gap-1 text-xs text-secondary-foreground">
      {Icon ? <Icon className="size-4" /> : null}
      <span className="font-semibold">{stat.value}</span>
      {stat.label}
    </span>
  );
}
