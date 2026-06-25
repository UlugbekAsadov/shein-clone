"use client";

import Link from "next/link";
import { AltArrowRight } from "@solar-icons/react/ssr";
import type { locales } from "@/core/config/i18n/i18n-config";
import { useDictionary } from "@/core/config/i18n/use-dictionary";
import type {
  IFitStat,
  IReview,
} from "@/features/products/pages/[slug]/utils/review.interface";
import { ProductReviewCard } from "./product-review-card";
import { ProductReviewMediaGallery } from "./product-review-media-gallery";
import { ProductReviewSummary } from "./product-review-summary";

interface IProps {
  lang: (typeof locales)[number];
  slug: string;
  totalLabel: string;
  rating: number;
  fitStats: IFitStat[];
  media: string[];
  reviews: IReview[];
}

export function ProductReviewsSection({
  lang,
  slug,
  totalLabel,
  rating,
  fitStats,
  media,
  reviews,
}: IProps) {
  const dict = useDictionary();
  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          {dict.product.customerReviews} ({totalLabel})
        </h2>
        <Link
          href={`/${lang}/products/${slug}/comments`}
          className="flex cursor-pointer items-center gap-1 text-muted-foreground hover:text-foreground"
        >
          {dict.common.viewAll}
          <AltArrowRight className="size-5" weight="Outline" />
        </Link>
      </div>

      <ProductReviewSummary rating={rating} fitStats={fitStats} />
      {media.length > 0 && (
        <ProductReviewMediaGallery lang={lang} slug={slug} images={media} />
      )}
    </section>
  );
}
