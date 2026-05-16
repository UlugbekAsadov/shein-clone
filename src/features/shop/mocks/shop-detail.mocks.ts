import type { IShopDetail } from "@/features/shop/interfaces/shop-detail.interface";

export const shopDetail: IShopDetail = {
  id: "shop-1",
  slug: "fashionrepublic",
  name: "Ryvang",
  handle: "@fashionrepublic",
  avatar: "/placeholders/brand.svg",
  banner: "/placeholders/lifestyle.svg",
  verified: true,
  rating: 4.5,
  reviews: 324,
  stats: [
    { id: "sels", value: "900+", label: "sels", icon: "box" },
    { id: "years", value: "2 year", label: "seller", icon: "medal" },
    { id: "followers", value: "45,5K", label: "followers", icon: "users" },
    { id: "response", value: "98%", label: "response", icon: "chat" },
  ],
  countryFlag: "🇺🇿",
  countryLabel: "Uzbekistan",
  shipsFrom: "Ships from Los Angeles, CA",
  isFollowing: false,
};
