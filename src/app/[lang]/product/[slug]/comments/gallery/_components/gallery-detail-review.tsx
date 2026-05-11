import Image from "next/image";
import { UserRound } from "lucide-react";
import { ProductRatingStars } from "@/components/common/product/product-preview/product-rating-stars";
import { ProductReviewMeta } from "../../../_components/product-reviews/product-review-meta";
import { SellerResponseCard } from "../../_components/comments-list/seller-response-card";
import type { IReview } from "../../../_lib/interface/review.interface";

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
                quality={80}
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
