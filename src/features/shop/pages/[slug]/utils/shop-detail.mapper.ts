import type { IApiShop } from "@/features/shop/utils/shop-response.interface";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import type { locales } from "@/core/config/i18n/i18n-config";
import type { IShopDetail, IShopStat } from "./shop-detail.interface";

type Locale = (typeof locales)[number];

function formatCount(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`;
  return String(count);
}

function formatMemberYears(memberSince: string, dict: IDictionary): string {
  const years = new Date().getFullYear() - parseInt(memberSince, 10);
  const n = Math.max(1, years);
  const absN = Math.abs(n);
  const lastTwo = absN % 100;
  const lastOne = absN % 10;

  let form: "yearOne" | "yearFew" | "yearMany";
  if (lastTwo >= 11 && lastTwo <= 14) {
    form = "yearMany";
  } else if (lastOne === 1) {
    form = "yearOne";
  } else if (lastOne >= 2 && lastOne <= 4) {
    form = "yearFew";
  } else {
    form = "yearMany";
  }

  return `${n} ${dict.shop[form]}`;
}

export function mapApiShopToDetail(
  shop: IApiShop,
  lang: Locale,
  dict: IDictionary,
): IShopDetail {
  const stats: IShopStat[] = [
    {
      id: "sales",
      value: formatCount(shop.sales_count),
      label: dict.shop.sels,
      icon: "box",
    },
    {
      id: "member",
      value: formatMemberYears(shop.member_since, dict),
      label: dict.shop.seller,
      icon: "medal",
    },
    {
      id: "followers",
      value: formatCount(shop.followers_count),
      label: dict.shop.followers,
      icon: "users",
    },
    {
      id: "response",
      value: shop.positive_feedback,
      label: dict.shop.response,
      icon: "chat",
    },
  ];

  return {
    id: String(shop.id),
    slug: shop.username,
    name: shop.name[lang] ?? shop.display_name,
    handle: `@${shop.username}`,
    avatar: shop.logo_url,
    banner: shop.banner_url,
    verified: shop.is_verified,
    rating: shop.rating,
    reviews: shop.reviews_count,
    stats,
    countryFlag: "",
    countryLabel: shop.location.name,
    shipsFrom: shop.ships_from,
    isFollowing: shop.is_followed,
  };
}
