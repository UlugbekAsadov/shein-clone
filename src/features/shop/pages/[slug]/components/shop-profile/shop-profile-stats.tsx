import {
  Box,
  ChatRound,
  MedalRibbonStar,
  UsersGroupRounded,
} from "@solar-icons/react/ssr";
import type { IApiShop } from "@/features/shop/utils/shop-response.interface";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import {
  formatCount,
  formatMemberYears,
} from "@/features/shop/pages/[slug]/utils/shop-format.utils";

interface IProps {
  shop: IApiShop;
  dict: IDictionary;
}

export function ShopProfileStats({ shop, dict }: IProps) {
  const stats = [
    {
      id: "sales",
      value: formatCount(shop.sales_count),
      label: dict.shop.sels,
      Icon: Box,
    },
    {
      id: "member",
      value: formatMemberYears(shop.member_since, dict),
      label: dict.shop.seller,
      Icon: MedalRibbonStar,
    },
    {
      id: "followers",
      value: formatCount(shop.followers_count),
      label: dict.shop.followers,
      Icon: UsersGroupRounded,
    },
    {
      id: "response",
      value: shop.positive_feedback,
      label: dict.shop.response,
      Icon: ChatRound,
    },
  ];

  return (
    <ul className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
      {stats.map(({ id, value, label, Icon }) => (
        <li key={id} className="flex items-center gap-1">
          <Icon className="size-5 text-secondary-foreground" weight="Bold" />
          <span className="font-semibold text-foreground">
            {value} <span className="text-muted-foreground">{label}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
