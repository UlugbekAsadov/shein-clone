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

export interface ISimilarProductAutoFilter {
  limit: number;
  sort_by: string;
  sort_direction: string;
  category_ids: number[];
  brand_ids: number[];
  badge_ids: number[];
  season_ids: number[];
  shop_ids: number[];
  hashtag_ids: number[];
  sizes: string[];
  colors: string[];
  materials: string[];
  styles: string[];
  min_price: number | null;
  max_price: number | null;
  has_discount: boolean;
  is_original: boolean;
  min_sold_count: number;
  min_view_count: number;
}

export interface ISimilarProductsData {
  auto_filter: ISimilarProductAutoFilter;
  products: ISimilarProductItem[];
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
