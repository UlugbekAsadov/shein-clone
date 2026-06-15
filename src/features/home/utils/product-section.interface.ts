interface IApiSectionName {
  en: string;
  ru: string;
  uz: string;
}

export interface IAutoFilter {
  limit?: number;
  sort_by?: string;
  sort_direction?: string;
  shop_ids?: number[];
  badge_ids?: number[];
  brand_ids?: number[];
  season_ids?: number[];
  hashtag_ids?: number[];
  category_ids?: number[];
  max_price?: number | null;
  min_price?: number | null;
  min_sold_count?: number;
  min_view_count?: number;
}

interface IApiSection {
  id: number;
  name: string;
  name_all: IApiSectionName;
  slug: string;
  description: string;
  icon: string;
  cover_image: string | null;
  bg_color: string;
  timer: { end_at: string; remaining_seconds: number } | null;
  sort_order: number;
  type: "list" | "card";
  auto_filter?: IAutoFilter;
}

export interface IApiSectionProduct {
  id: number;
  slug: string;
  title: string;
  name: IApiSectionName;
  image_url: string;
  price: number;
  old_price: number;
  discount_percentage: number;
  rating: number;
  delivery_date_text: string;
  is_wishlist: boolean;
  is_original: boolean;
  is_adult: boolean;
  size_type: string;
  size_recommendation: string;
  size_grid: unknown[];
}

interface IProductSectionMeta {
  total: number;
  current_page: number;
  last_page: number;
  per_page: number;
}

export interface IProductSection {
  section: IApiSection;
  products: IApiSectionProduct[];
  meta: IProductSectionMeta;
}
