import Image from "next/image";
import { Like, User } from "@solar-icons/react/ssr";
import { ProductRatingStars } from "@/shared/components/product/product-preview/product-rating-stars";
import type { IReview } from "@/features/product/pages/[slug]/utils/review.interface";
import { ProductReviewMeta } from "./product-review-meta";

interface IProps {
  review: IReview;
}

export function ProductReviewCard({ review }: IProps) {
  return (
    <>
      <article className="py-4 bg-secondary p-5 rounded-[26px]">
        <div className="flex items-center gap-3">
          <div className="grid size-9 place-items-center rounded-full bg-[#DEDEE4] text-sm font-semibold">
            <User className="stroke-[#A8A8AE] size-7" weight="Outline" />
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
                  quality={100}
                  sizes="56px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}

        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5 bg-background px-3 py-1 rounded-[4px]">
            <span aria-hidden>{review.countryFlag}</span>
            {review.countryLabel}
          </span>
          <button
            type="button"
            className="flex cursor-pointer items-center gap-1.5 hover:text-foreground"
          >
            Helpful ({review.helpful})
            <Like className="size-3.5" weight="Outline" />
          </button>
        </div>
      </article>
      <div className="border-t-2 border-dashed border-border my-6 last:border-0" />
    </>
  );
}
