export interface IProductName {
  uz: string;
  en: string;
  ru: string;
}

export interface IProduct {
  id: number;
  slug?: string;
  title: string;
  name?: IProductName;
  image_url: string;
  images?: string[];
  price: number;
  old_price?: number;
  discount?: number;
  discount_type?: string;
  discount_percentage?: number;
  currency?: string;
  rating: number;
  reviews_count?: number;
  delivery_date_text?: string;
  is_original?: boolean;
  is_wishlist?: boolean;
  is_available?: boolean;
  is_adult?: boolean;
  subtitle?: string;
}
