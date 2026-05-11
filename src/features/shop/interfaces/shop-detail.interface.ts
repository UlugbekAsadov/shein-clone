export interface IShopStat {
  id: string;
  label: string;
}

export interface IShopDetail {
  id: string;
  slug: string;
  name: string;
  handle: string;
  avatar: string;
  banner: string;
  verified?: boolean;
  rating: number;
  reviews: number;
  stats: IShopStat[];
  countryFlag: string;
  countryLabel: string;
  shipsFrom: string;
  isFollowing?: boolean;
}
