import type { IRatingBucket } from "@/features/products/pages/[slug]/pages/comments/utils/rating-distribution.interface";
import { RatingHistogramRow } from "./rating-histogram-row";

interface IProps {
  buckets: IRatingBucket[];
}

export function RatingHistogram({ buckets }: IProps) {
  return (
    <div className="grid grid-cols-5 gap-6">
      {buckets.map((bucket) => (
        <RatingHistogramRow key={bucket.id} bucket={bucket} />
      ))}
    </div>
  );
}
