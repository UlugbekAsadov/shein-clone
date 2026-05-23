import Image from "next/image";
import { Star, UserRounded } from "@solar-icons/react/ssr";
import type { IReview } from "@/features/product/pages/[slug]/utils/review.interface";
import { cn } from "@/lib/utils";
import { CommentsMobileReviewMeta } from "./comments-mobile-review-meta";
import { CommentsMobileHelpful } from "./comments-mobile-helpful";
import { CommentsMobileSellerResponse } from "./comments-mobile-seller-response";

interface IProps {
  review: IReview;
}

export function CommentsMobileReviewCard({ review }: IProps) {
  const countryClean = review.countryLabel.replace(/^From\s/i, "");

  return (
    <article className="rounded-[20px] bg-secondary p-4 h-full flex flex-col">
      <div className="flex items-center gap-2">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#DEDEE4] text-foreground/40">
          <UserRounded className="size-7" weight="Bold" />
        </span>
        <div className="flex-1">
          <p className="text-sm font-bold text-foreground">{review.user}</p>
          <p className="text-xs text-muted-foreground">{review.date}</p>
        </div>
      </div>

      <div className="mt-2 flex items-center gap-0.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star
            key={i}
            weight="Bold"
            className={cn(
              "size-4",
              i < review.rating ? "text-[#ECBB0D]" : "text-foreground/15",
            )}
          />
        ))}
      </div>

      <CommentsMobileReviewMeta meta={review.meta} />

      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-foreground flex-1">
        {review.text}
      </p>

      {review.images && review.images.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {review.images.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="relative size-16 overflow-hidden rounded-[12px] bg-muted"
            >
              <Image
                src={src}
                alt=""
                fill
                quality={100}
                sizes="64px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}

      <div className="mt-3 flex items-center justify-between">
        <span className="flex items-center gap-1.5 rounded-[4px] bg-background px-2 py-1 text-xs font-medium text-foreground">
          <span aria-hidden>{review.countryFlag}</span>
          {countryClean}
        </span>
        <CommentsMobileHelpful count={review.helpful} />
      </div>

      {review.sellerResponse && (
        <CommentsMobileSellerResponse response={review.sellerResponse} />
      )}
    </article>
  );
}
