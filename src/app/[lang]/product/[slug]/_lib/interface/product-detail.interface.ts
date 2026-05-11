import type { ISwatch } from "@/lib/interfaces/swatch.interface";
import type { ISize } from "@/lib/interfaces/size.interface";

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
  price: number;
  originalPrice?: number;
  saveLabel?: string;
  gallery: string[];
  colors: ISwatch[];
  sizes: ISize[];
  recommendedSize: string;
  specs: IProductSpec[];
  accordions: IProductAccordionItem[];
}
