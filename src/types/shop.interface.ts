export interface IShopTag {
  label: string;
  variant: "shipping" | "topSeller";
}

export interface IShop {
  id: string;
  name: string;
  category: string;
  avatar: string;
  banner: string;
  verified?: boolean;
  rating: number;
  reviews: number;
  itemsSoldCount: string;
  yearsSelling: string;
  tag?: IShopTag;
  isFollowing?: boolean;
}
