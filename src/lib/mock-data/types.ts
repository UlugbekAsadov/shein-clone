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
};

export type Shop = {
  id: string;
  name: string;
  avatar: string;
  banner: string;
  rating: number;
  itemsSold: string;
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
  shopName: string;
  background: string;
};
