export interface IProductLocaleText {
  uz: string;
  en: string;
  ru: string;
}

export interface IProductHighlight {
  title: string;
  description: string;
}

export interface IProductFitStats {
  small_percentage: number;
  true_to_size_percentage: number;
  large_percentage: number;
}

export interface IProductVariantSize {
  sku_id: number;
  size: string;
  price: number;
  discount: number;
  discount_type: string;
  currency: string;
}

export interface IProductVariant {
  color: string;
  image_url: string;
  additional_images: string[];
  sizes: IProductVariantSize[];
}

export interface IProductCommentUser {
  name: string;
  avatar: string | null;
}

export interface IProductCommentSpec {
  label: string;
  value: string;
}

export interface IProductCommentCountry {
  name: string;
  flag: string;
}

export interface IProductCommentShopReply {
  shop: IProductCommentUser;
  created_at: string;
  content: string;
}

export interface IProductComment {
  id: number;
  user: IProductCommentUser;
  created_at: string;
  rating: number;
  specs: IProductCommentSpec[];
  content: string;
  images: string[];
  country: IProductCommentCountry | null;
  helpful_count: number;
  is_liked: boolean;
  shop_reply: IProductCommentShopReply | null;
}

export interface IProductDetail {
  id: number;
  shop_id: number | null;
  slug: string;
  title: string;
  name: IProductLocaleText;
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
  description: string;
  sold_count: number;
  reviews_count: number;
  additional_images: string[];
  fit_stats: IProductFitStats;
  review_images_gallery: string[];
  brand_info: unknown | null;
  highlights: IProductHighlight[];
  latest_comments: IProductComment[];
  variant_clothes: IProductVariant[];
}
