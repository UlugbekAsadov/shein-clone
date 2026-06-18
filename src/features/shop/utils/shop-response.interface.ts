import type { IProductLocaleText } from "@/features/product/pages/[slug]/utils/product-detail.interface";

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
