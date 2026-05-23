import type { IAboutInfoItem } from "@/features/shop/pages/[slug]/utils/about-info.interface";
import { InfoCardIcon } from "./info-card-icon";
import { cn } from "@/lib/utils";

interface IProps {
  item: IAboutInfoItem;
}

export function InfoCardItem({ item }: IProps) {
  return (
    <li className="flex items-center gap-3">
      <span
        className={cn(
          "grid size-8 shrink-0 place-items-center rounded-[8px] bg-white",
          "md:size-12 md:rounded-[12px]",
        )}
      >
        <InfoCardIcon name={item.icon} />
      </span>
      <div className="min-w-0">
        <p
          className={cn("text-xs font-semibold text-foreground", "md:text-sm")}
        >
          {item.title}
        </p>
        <p className={cn("text-xs text-muted-foreground", "md:text-sm")}>
          {item.subtitle}
        </p>
      </div>
    </li>
  );
}
