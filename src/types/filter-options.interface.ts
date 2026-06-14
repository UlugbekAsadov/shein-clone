export interface IApiFilterQuickFilter {
  key: string;
  label: string;
  count: number;
}

export interface IApiFilterCategoryNode {
  id: number;
  name: string;
  image_url: string;
  parent_id: number | null;
  products_count: number;
  children: IApiFilterCategoryNode[];
}

export interface IApiFilterBrand {
  id: number;
  name: string;
  image_url: string;
  mobile_image_url: string;
  products_count: number;
}

export interface IApiFilterSeason {
  id: number;
  name: string;
  slug: string;
  products_count: number;
}

export interface IApiFilterAttributeItem {
  id: number;
  name: string;
  value: string;
}

export interface IApiFilterAttribute {
  id: number;
  name: string;
  slug: string;
  items: IApiFilterAttributeItem[];
}

export interface IApiFilterOptions {
  price_range: { min: number; max: number };
  quick_filters: IApiFilterQuickFilter[];
  categories: IApiFilterCategoryNode[];
  brands: IApiFilterBrand[];
  seasons: IApiFilterSeason[];
  attributes: IApiFilterAttribute[];
}
