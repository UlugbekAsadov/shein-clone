import Image from "next/image";
import { ThumbsUp, UserRound } from "lucide-react";
import { ProductRatingStars } from "@/shared/components/product/product-preview/product-rating-stars";
import { ProductReviewMeta } from "@/features/product/components/product-reviews/product-review-meta";
import type { IReview } from "@/features/product/interfaces/review.interface";
import { SellerResponseCard } from "./seller-response-card";

interface IProps {
  review: IReview;
}

export function CommentsReviewItem({ review }: IProps) {
  return (
    <div>
      <article className="rounded-xl bg-secondary p-5">
        <div className="flex items-center gap-3">
          <div className="grid size-9 place-items-center rounded-full bg-[#DEDEE4] text-sm font-semibold">
            <UserRound className="size-7 stroke-[#A8A8AE]" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-bold">{review.user}</div>
            <div className="text-xs text-muted-foreground">{review.date}</div>
          </div>
        </div>

        <div className="mt-2">
          <ProductRatingStars />
        </div>

        <div className="mt-2">
          <ProductReviewMeta meta={review.meta} />
        </div>

        <p className="mt-3 text-sm leading-relaxed">{review.text}</p>

        {review.images && (
          <div className="mt-3 flex flex-wrap gap-2">
            {review.images.map((src, i) => (
              <div
                key={`${src}-${i}`}
                className="relative size-14 overflow-hidden rounded-md bg-muted"
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  quality={80}
                  sizes="56px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}

        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5 rounded-[4px] bg-background px-3 py-1">
            <span aria-hidden>{review.countryFlag}</span>
            {review.countryLabel}
          </span>
          <button
            type="button"
            className="flex cursor-pointer items-center gap-1.5 hover:text-foreground"
          >
            Helpful ({review.helpful})
            <ThumbsUp className="size-3.5" />
          </button>
        </div>

        {review.sellerResponse && (
          <SellerResponseCard response={review.sellerResponse} />
        )}
      </article>

      <div className="my-6 border-t-2 border-dashed border-border last:border-0" />
    </div>
  );
}
