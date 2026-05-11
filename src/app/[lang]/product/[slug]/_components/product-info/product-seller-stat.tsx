import type { ISellerStat } from "../../_lib/interface/seller-card.interface";

interface IProps {
  stat: ISellerStat;
}

export function ProductSellerStat({ stat }: IProps) {
  return (
    <span className="flex items-center gap-1 text-xs text-muted-foreground">
      <span className="font-semibold text-foreground">{stat.value}</span>
      {stat.label}
    </span>
  );
}
