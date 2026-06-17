export interface ISimilarProductBadgeStyle {
  text: { color: string; fontSize: string; fontWeight: string };
  wrapper: Record<string, string>;
}

export interface ISimilarProductBadge {
  id: number;
  name: string;
  slug: string;
  position: string;
  style: ISimilarProductBadgeStyle;
  icon: string;
  mobile_svg: string;
  products_count: number;
}

export interface ISimilarProductItem {
  id: number;
  slug: string;
  title: string;
  name: { uz: string; en: string; ru: string };
  image_url: string;
  price: number;
  discount: number;
  discount_type: string;
  currency: string;
  rating: number;
  delivery_date_text: string;
  is_wishlist: boolean;
  is_original: boolean;
  is_adult: boolean;
  size_type: string;
  size_recommendation: string;
  size_grid: unknown[];
  badges: ISimilarProductBadge[];
}
