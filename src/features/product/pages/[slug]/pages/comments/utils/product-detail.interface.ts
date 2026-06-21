import type { ISwatch } from "@/types/swatch.interface";
import type { ISize } from "@/types/size.interface";

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

export interface IProductDetailUI {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  rating: number;
  reviews: number;
  sold: number;
  price: number;
  originalPrice?: number;
  gallery: string[];
  colors: ISwatch[];
  sizes: ISize[];
  recommendedSize: string;
  specs: IProductSpec[];
  accordions: IProductAccordionItem[];
}
