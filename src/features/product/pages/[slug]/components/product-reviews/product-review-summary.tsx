import { ProductRatingStars } from "@/shared/components/product/product-preview/product-rating-stars";
import type { IFitStat } from "@/features/product/pages/[slug]/utils/review.interface";
import { ProductReviewFitBar } from "./product-review-fit-bar";

interface IProps {
  rating: number;
  fitStats: IFitStat[];
}

export function ProductReviewSummary({ rating, fitStats }: IProps) {
  return (
    <div className="bg-secondary rounded-md p-5">
      <div className="flex flex-col">
        <span className="text-sm font-semibold">Rating:</span>
        <div className="flex items-center gap-2.5">
          <span className="text-3xl font-bold">{rating.toFixed(1)}</span>
          <ProductRatingStars />
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <div className="text-sm font-semibold">Over Fit:</div>
        {fitStats.map((stat) => (
          <ProductReviewFitBar key={stat.id} stat={stat} />
        ))}
      </div>
    </div>
  );
}
