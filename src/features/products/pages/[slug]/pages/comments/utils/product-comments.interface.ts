import type { IProductComment } from "@/features/products/pages/[slug]/utils/product-detail.interface";

export interface IProductCommentsMeta {
  current_page: number;
  from: number | null;
  last_page: number;
  per_page: number;
  to: number | null;
  total: number;
}

export interface IProductCommentsData {
  data: IProductComment[];
  meta: IProductCommentsMeta;
}
