import Image from "next/image";
import { UserRound } from "lucide-react";
import { ProductRatingStars } from "@/shared/components/product/product-preview/product-rating-stars";
import { ProductReviewMeta } from "@/features/product/components/product-reviews/product-review-meta";
import { SellerResponseCard } from "@/features/product/components/comments/comments-list/seller-response-card";
import type { IReview } from "@/features/product/interfaces/review.interface";

interface IProps {
  review: IReview;
}

export function GalleryDetailReview({ review }: IProps) {
  return (
    <div className="flex h-full flex-col gap-3 rounded-xl bg-secondary p-5">
      <div className="flex items-center gap-3">
        <div className="grid size-9 place-items-center rounded-full bg-[#DEDEE4]">
          <UserRound className="size-7 stroke-[#A8A8AE]" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-bold">{review.user}</div>
          <div className="text-xs text-muted-foreground">{review.date}</div>
        </div>
      </div>

      <ProductRatingStars />

      <ProductReviewMeta meta={review.meta} />

      <p className="text-sm leading-relaxed">{review.text}</p>

      {review.images && (
        <div className="flex flex-wrap gap-2">
          {review.images.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="relative size-14 overflow-hidden rounded-md bg-muted"
            >
              <Image
                src={src}
                alt=""
                fill
                quality={100}
                sizes="56px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {review.sellerResponse && (
        <SellerResponseCard response={review.sellerResponse} />
      )}
    </div>
  );
}
