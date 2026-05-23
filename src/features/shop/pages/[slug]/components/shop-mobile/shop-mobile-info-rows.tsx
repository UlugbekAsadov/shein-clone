import type { IShopDetail } from "@/features/shop/pages/[slug]/utils/shop-detail.interface";
import { UzbekistanFlagIcon } from "@/shared/components/icons/outline";
import { TruckIconSolid } from "@/shared/components/icons/solid";
import { ChatRoundLine } from "@solar-icons/react/ssr";

interface IProps {
  shop: IShopDetail;
  responseLabel: string;
}

export function ShopMobileInfoRows({ shop, responseLabel }: IProps) {
  const responseStat = shop.stats.find((s) => s.icon === "chat");

  return (
    <ul className="flex flex-col gap-1 px-4">
      <li className="flex items-center gap-1 text-sm text-foreground py-1">
        <UzbekistanFlagIcon className="size-5" />
        <span>{shop.countryLabel}</span>
      </li>
      <li className="flex items-center gap-1 text-xs font-medium text-foreground py-1">
        <ChatRoundLine className="size-5" weight="Bold" />
        <span>
          {responseStat?.value} {responseLabel}
        </span>
      </li>
      <li className="flex items-center gap-1 text-xs font-medium text-foreground py-1">
        <TruckIconSolid className="size-5 fill-foreground" />
        <span>{shop.shipsFrom}</span>
      </li>
    </ul>
  );
}
