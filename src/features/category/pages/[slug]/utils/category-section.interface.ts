interface IApiSectionName {
  en: string;
  ru: string;
  uz: string;
}

export interface IApiCategorySection {
  id: number;
  name: string;
  name_all: IApiSectionName;
  slug: string;
  description: string;
  icon: string;
  cover_image: string | null;
  bg_color: string;
  type: "list" | "card";
  timer: { end_at: string; remaining_seconds: number } | null;
  sort_order: number;
}

export interface IApiCategorySectionProduct {
  id: number;
  slug: string;
  title: string;
  name: IApiSectionName;
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
}

export interface IApiCategorySectionMeta {
  total: number;
  current_page: number;
  last_page: number;
  per_page: number;
}

export interface IApiCategorySectionData {
  section: IApiCategorySection;
  products: IApiCategorySectionProduct[];
  meta: IApiCategorySectionMeta;
}
