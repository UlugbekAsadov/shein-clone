import { Star } from "@solar-icons/react/ssr";
import { Progress } from "@/shared/components/ui/progress";
import type { IRatingBucket } from "@/features/products/pages/[slug]/pages/comments/utils/rating-distribution.interface";

interface IProps {
  bucket: IRatingBucket;
}

export function RatingHistogramRow({ bucket }: IProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-1">
        <span className="text-xs font-semibold">{bucket.stars}</span>
        <div className="flex items-center gap-0.5">
          {Array.from({ length: bucket.stars }).map((_, i) => (
            <Star
              key={i}
              className="size-3 fill-foreground text-foreground"
              weight="Outline"
            />
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Progress value={bucket.percent} className="h-1.5 flex-1 bg-muted" />
        <span className="shrink-0 text-xs font-medium">{bucket.percent}%</span>
      </div>
    </div>
  );
}
