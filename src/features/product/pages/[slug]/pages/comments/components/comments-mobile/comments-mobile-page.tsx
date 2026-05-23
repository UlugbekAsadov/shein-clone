import type { IReview } from "@/features/product/pages/[slug]/utils/review.interface";
import { CommentsMobileHeader } from "./comments-mobile-header";
import { CommentsMobileReviewCard } from "./comments-mobile-review-card";

interface IProps {
  reviews: IReview[];
  applyLabel: string;
}

export function CommentsMobilePage({ reviews, applyLabel }: IProps) {
  return (
    <div className="pb-6 md:hidden">
      <CommentsMobileHeader title="Comments" applyLabel={applyLabel} />

      <div className="flex flex-col gap-3 px-4 pt-3">
        {reviews.map((review) => (
          <CommentsMobileReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}
