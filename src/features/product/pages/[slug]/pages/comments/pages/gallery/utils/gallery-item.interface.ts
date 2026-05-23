import type { IReview } from "@/features/product/pages/[slug]/utils/review.interface";

export interface IGalleryItem {
  id: string;
  type: "image" | "video";
  src: string;
  review: IReview;
}
