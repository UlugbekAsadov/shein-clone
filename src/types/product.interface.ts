import type { ICurrencyPrices } from "@/types/currency-prices.interface";

export interface IProduct {
  id: string;
  slug?: string;
  title: string;
  subtitle: string;
  prices: ICurrencyPrices;
  originalPrices?: ICurrencyPrices;
  image: string;
  images?: string[];
  rating: number;
  reviews: number;
  badge?: "Original" | "New" | "Sale";
  discountLabel?: string;
  delivery?: string;
}
