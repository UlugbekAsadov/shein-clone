import type { IReview } from "@/features/products/pages/[slug]/utils/review.interface";
import { CommentsMobileReviewCard } from "@/features/products/pages/[slug]/pages/comments/components/comments-mobile/comments-mobile-review-card";
import { ProductMobileSectionHeader } from "./product-mobile-section-header";

interface IProps {
  title: string;
  reviews: IReview[];
  viewAllHref?: string;
}

export function ProductMobileCommentsCarousel({
  title,
  reviews,
  viewAllHref,
}: IProps) {
  return (
    <div className="mt-5 flex flex-col gap-3">
      <ProductMobileSectionHeader title={title} viewAllHref={viewAllHref} />

      <div className="-mx-4 overflow-x-auto px-4 [&::-webkit-scrollbar]:hidden">
        <div className="flex w-max gap-3">
          {reviews.map((review) => (
            <div key={review.id} className="w-80 shrink-0">
              <CommentsMobileReviewCard review={review} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
