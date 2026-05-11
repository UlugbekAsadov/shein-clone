import { ChevronRight } from "lucide-react";
import type { IFitStat, IReview } from "../../_lib/interface/review.interface";
import { ProductReviewCard } from "./product-review-card";
import { ProductReviewMediaGallery } from "./product-review-media-gallery";
import { ProductReviewSummary } from "./product-review-summary";

interface IProps {
  totalLabel: string;
  rating: number;
  fitStats: IFitStat[];
  media: string[];
  reviews: IReview[];
}

export function ProductReviewsSection({
  totalLabel,
  rating,
  fitStats,
  media,
  reviews,
}: IProps) {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Customer Reviews ({totalLabel})</h2>
        <button
          type="button"
          className="flex cursor-pointer items-center gap-1 text-muted-foreground hover:text-foreground"
        >
          View all
          <ChevronRight className="size-5" />
        </button>
      </div>

      <ProductReviewSummary rating={rating} fitStats={fitStats} />
      <ProductReviewMediaGallery images={media} />

      <div className="mt-4">
        {reviews.map((review) => (
          <ProductReviewCard key={review.id} review={review} />
        ))}
      </div>
    </section>
  );
}
