import type { IAboutInfoItem } from "@/features/shop/interfaces/about-info.interface";
import { InfoCardIcon } from "./info-card-icon";

interface IProps {
  item: IAboutInfoItem;
}

export function InfoCardItem({ item }: IProps) {
  return (
    <li className="flex items-center gap-3">
      <span className="grid size-12 shrink-0 place-items-center rounded-[12px] bg-white ">
        <InfoCardIcon name={item.icon} />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-foreground">{item.title}</p>
        <p className="text-sm text-muted-foreground">{item.subtitle}</p>
      </div>
    </li>
  );
}
