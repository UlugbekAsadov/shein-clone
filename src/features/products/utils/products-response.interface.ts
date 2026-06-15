interface IApiProductsName {
  en: string;
  ru: string;
  uz: string;
}

export interface IApiProductsProduct {
  id: number;
  slug: string;
  title: string;
  name: IApiProductsName;
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

export interface IApiProductsMeta {
  total: number;
  current_page: number;
  last_page: number;
  per_page: number;
}

export interface IApiProductsData {
  data: IApiProductsProduct[];
  meta: IApiProductsMeta;
}
