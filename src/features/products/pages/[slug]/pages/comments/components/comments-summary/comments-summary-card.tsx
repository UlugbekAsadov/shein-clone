"use client";

import { Star } from "@solar-icons/react/ssr";
import { cn } from "@/lib/utils";
import { useDictionary } from "@/core/config/i18n/use-dictionary";
import type { IRatingBucket } from "@/features/products/pages/[slug]/pages/comments/utils/rating-distribution.interface";
import { RatingHistogram } from "./rating-histogram";

interface IProps {
  rating: number;
  buckets: IRatingBucket[];
}

export function CommentsSummaryCard({ rating, buckets }: IProps) {
  const dict = useDictionary();

  return (
    <div className="flex flex-col gap-5 rounded-lg bg-secondary p-5">
      <div className="flex flex-col gap-1">
        <span className="text-sm font-semibold">
          {dict.comments.summaryRating}:
        </span>
        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold leading-none">
            {rating.toFixed(1)}
          </span>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                weight="Bold"
                className={cn(
                  "size-5",
                  i < Math.round(rating)
                    ? "fill-primary text-primary"
                    : "fill-foreground/15 text-foreground/15",
                )}
              />
            ))}
          </div>
        </div>
      </div>
      <RatingHistogram buckets={buckets} />
    </div>
  );
}
