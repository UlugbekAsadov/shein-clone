import type { IReview } from "@/features/product/interfaces/review.interface";

export interface IGalleryItem {
  id: string;
  type: "image" | "video";
  src: string;
  review: IReview;
}
