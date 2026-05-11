import type { IShopStat } from "@/features/shop/interfaces/shop-detail.interface";

interface IProps {
  stats: IShopStat[];
}

export function ShopProfileStats({ stats }: IProps) {
  return (
    <ul className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
      {stats.map((s) => (
        <li key={s.id} className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          <span>{s.label}</span>
        </li>
      ))}
    </ul>
  );
}
