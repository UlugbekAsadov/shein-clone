"use client";

import { ProductRatingStars } from "@/shared/components/product/product-preview/product-rating-stars";
import type { IFitStat } from "@/features/products/pages/[slug]/utils/review.interface";
import { ProductReviewFitBar } from "./product-review-fit-bar";
import { useDictionary } from "@/core/config/i18n/use-dictionary";

interface IProps {
  rating: number;
  fitStats: IFitStat[];
}

export function ProductReviewSummary({ rating, fitStats }: IProps) {
  const dict = useDictionary();
  return (
    <div className="bg-secondary rounded-md p-5">
      <div className="flex flex-col">
        <span className="text-sm font-semibold">{dict.product.rating}:</span>
        <div className="flex items-center gap-2.5">
          <span className="text-3xl font-bold">{rating.toFixed(1)}</span>
          <ProductRatingStars />
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <div className="text-sm font-semibold">{dict.product.overFit}:</div>
        {fitStats.map((stat) => (
          <ProductReviewFitBar key={stat.id} stat={stat} />
        ))}
      </div>
    </div>
  );
}
