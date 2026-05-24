import { Star } from "@solar-icons/react/ssr";
import type { IRatingBucket } from "@/features/product/pages/[slug]/pages/comments/utils/rating-distribution.interface";
import { RatingHistogram } from "./rating-histogram";

interface IProps {
  rating: number;
  buckets: IRatingBucket[];
}

export function CommentsSummaryCard({ rating, buckets }: IProps) {
  return (
    <div className="flex flex-col gap-5 rounded-lg bg-secondary p-5">
      <div className="flex flex-col gap-1">
        <span className="text-sm font-semibold">Rating:</span>
        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold leading-none">
            {rating.toFixed(1)}
          </span>
          <div className="flex items-center gap-0.5">
            {[0, 1, 2].map((i) => (
              <Star
                key={i}
                className="size-5 fill-foreground text-foreground"
                weight="Outline"
              />
            ))}
            <Star className="size-5 fill-amber-400 text-amber-400" weight="Outline" />
          </div>
        </div>
      </div>
      <RatingHistogram buckets={buckets} />
    </div>
  );
}
