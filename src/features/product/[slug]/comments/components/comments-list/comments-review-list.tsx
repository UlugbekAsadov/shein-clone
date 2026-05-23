import type { IReview } from "@/features/product/interfaces/review.interface";
import { CommentsReviewItem } from "./comments-review-item";

interface IProps {
  reviews: IReview[];
}

export function CommentsReviewList({ reviews }: IProps) {
  return (
    <div className="mt-2 flex flex-col">
      {reviews.map((review) => (
        <CommentsReviewItem key={review.id} review={review} />
      ))}
    </div>
  );
}
