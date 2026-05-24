import Link from "next/link";
import { AltArrowRight } from "@solar-icons/react/ssr";
import type { locales } from "@/core/config/i18n/i18n-config";
import type {
  IFitStat,
  IReview,
} from "@/features/product/pages/[slug]/utils/review.interface";
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
  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Customer Reviews ({totalLabel})</h2>
        <Link
          href={`/${lang}/product/${slug}/comments`}
          className="flex cursor-pointer items-center gap-1 text-muted-foreground hover:text-foreground"
        >
          View all
          <AltArrowRight className="size-5" weight="Outline" />
        </Link>
      </div>

      <ProductReviewSummary rating={rating} fitStats={fitStats} />
      <ProductReviewMediaGallery lang={lang} slug={slug} images={media} />

      <div className="mt-4">
        {reviews.map((review) => (
          <ProductReviewCard key={review.id} review={review} />
        ))}
      </div>
    </section>
  );
}
