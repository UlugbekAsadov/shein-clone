import type { IFitStat } from "@/features/product/interfaces/review.interface";
import { ProductReviewFitBar } from "../product-reviews/product-review-fit-bar";

interface IProps {
  stats: IFitStat[];
}

export function ProductMobileFitBars({ stats }: IProps) {
  return (
    <div className="mt-5 flex flex-col gap-3 border-b pb-5">
      {stats.map((stat) => (
        <ProductReviewFitBar key={stat.id} stat={stat} />
      ))}
    </div>
  );
}
