export type Category = {
  id: string;
  name: string;
  slug: string;
  image?: string;
  badge?: string;
};

export type CategoryGroup = {
  id: string;
  name: string;
  items: Category[];
};

export type Product = {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  badge?: "Original" | "New" | "Sale";
  saveLabel?: string;
  discountLabel?: string;
  delivery?: string;
};

export type Brand = {
  id: string;
  name: string;
  image: string;
  brandBg?: string;
  storyViewed?: boolean;
  contents: string[];
};

export type ShopTag = {
  label: string;
  variant: "shipping" | "topSeller";
};

export type Shop = {
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
  tag?: ShopTag;
  isFollowing?: boolean;
};

export type HeroSlide = {
  id: string;
  image: string;
  title: string;
  subtitle?: string;
};

export type DiscountTile = {
  id: string;
  percent: number;
  image: string;
  bgImage: string;
  shopName: string;
  shopCategory: string;
  verified?: boolean;
  background: string;
};
