import type { IReview } from "../../../../_lib/interface/review.interface";

export interface IGalleryItem {
  id: string;
  type: "image" | "video";
  src: string;
  review: IReview;
}
