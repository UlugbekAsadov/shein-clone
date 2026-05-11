import type { IShopDetail } from "@/features/shop/interfaces/shop-detail.interface";

export const shopDetail: IShopDetail = {
  id: "shop-1",
  slug: "fashionrepublic",
  name: "Ryvang rens",
  handle: "@fashionrepublic",
  avatar: "/placeholders/brand.svg",
  banner: "/placeholders/lifestyle.svg",
  verified: true,
  rating: 4.5,
  reviews: 324,
  stats: [
    { id: "sels", label: "900+ sels" },
    { id: "years", label: "2 year seller" },
    { id: "followers", label: "45,5K followers" },
    { id: "response", label: "98% response" },
  ],
  countryFlag: "🇺🇿",
  countryLabel: "Uzbekistan",
  shipsFrom: "Ships from Los Angeles, CA",
  isFollowing: false,
};
