import type { ISwatch } from "@/types/swatch.interface";
import type { ISize } from "@/types/size.interface";
import type { ICurrencyPrices } from "@/types/currency-prices.interface";

export interface IProductSpec {
  id: string;
  label: string;
  value: string;
}

export interface IProductAccordionItem {
  id: string;
  title: string;
  body: string;
}

export interface IProductDetail {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  rating: number;
  reviews: number;
  sold: number;
  prices: ICurrencyPrices;
  originalPrices?: ICurrencyPrices;
  gallery: string[];
  colors: ISwatch[];
  sizes: ISize[];
  recommendedSize: string;
  specs: IProductSpec[];
  accordions: IProductAccordionItem[];
}
