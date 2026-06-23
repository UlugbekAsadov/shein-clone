import type { IProductLocaleText } from "@/features/products/pages/[slug]/utils/product-detail.interface";

export interface IApiShopProductBadge {
  id: number;
  name: string;
  slug: string;
  position: string;
  style: Record<string, unknown>;
  icon: string;
  mobile_svg?: string;
}

export interface IApiShopProduct {
  id: number;
  slug: string;
  title: string;
  name: { uz: string; en: string; ru: string };
  image_url: string;
  price: number;
  discount: number;
  discount_type: "fixed" | "percent";
  currency: string;
  rating: number;
  delivery_date_text: string;
  is_wishlist: boolean;
  is_original: boolean;
  is_adult: boolean;
  size_type: string;
  size_recommendation: string;
  badges: IApiShopProductBadge[];
}

export interface IApiShopProductsMeta {
  current_page: number;
  last_page: number;
  total: number;
  per_page: number;
}

export interface IApiShopProductsResponse {
  success: boolean;
  message: string;
  data: IApiShopProduct[];
  meta: IApiShopProductsMeta;
}

export interface IApiShopProductsData {
  data: IApiShopProduct[];
  meta: IApiShopProductsMeta;
}

export interface IApiShopFilterQuickFilter {
  key: string;
  label: string;
  available: boolean;
  products_count: number;
}

export interface IApiShopFilterCategory {
  id: number;
  name: string;
  image_url: string;
  parent_id: number | null;
  products_count: number;
  children: IApiShopFilterCategory[];
}

export interface IApiShopFilterBrand {
  id: number;
  name: string;
  image_url: string;
  mobile_image_url: string;
  products_count: number;
}

export interface IApiShopFilterSeason {
  id: number;
  name: string;
  slug: string;
  products_count: number;
}

export interface IApiShopFilterAttributeItem {
  id: number;
  name: string;
  value: string;
  hex: string;
}

export interface IApiShopFilterAttribute {
  id: number;
  name: string;
  slug: string;
  items: IApiShopFilterAttributeItem[];
}

export interface IApiShopFilterOptions {
  price_range: { min: number; max: number; currency: string };
  quick_filters: IApiShopFilterQuickFilter[];
  categories: IApiShopFilterCategory[];
  brands: IApiShopFilterBrand[];
  seasons: IApiShopFilterSeason[];
  attributes: IApiShopFilterAttribute[];
}

export interface IApiShop {
  id: number;
  username: string;
  name: IProductLocaleText;
  display_name: string;
  logo_url: string;
  banner_url: string;
  is_verified: boolean;
  description?: string;
  rating: number;
  reviews_count: number;
  followers_count: number;
  sales_count: number;
  member_since: string;
  response_rate: string;
  response_time: string;
  ships_from: string;
  location: { name: string; country_code: string };
  seller_type: string;
  positive_feedback: string;
  is_followed: boolean;
}

export interface IApiShopByIdData {
  shop: IApiShop;
}

export interface IApiShopAboutLocationShipping {
  store_location: string;
  shipping_origin: string;
  seller_type: string;
}

export interface IApiShopAboutTrustVerification {
  verified_seller: boolean;
  positive_feedback: string;
  response_time: string;
  member_since: string;
}

export interface IApiShopAboutBrand {
  id: number;
  name: string;
  image_url: string;
  mobile_image_url: string;
}

export interface IApiShopAbout {
  description: string;
  location_shipping: IApiShopAboutLocationShipping;
  trust_verification: IApiShopAboutTrustVerification;
  guarantees: unknown[];
  brands: IApiShopAboutBrand[];
}

export interface IApiShopPromoCode {
  id: number;
  code: string;
  title: string;
  description: string;
  discount_type: "fixed" | "percentage";
  discount_value: number;
  currency: string;
  min_order_amount: number;
  starts_at: string;
  expires_at: string;
  days_left: number;
}
