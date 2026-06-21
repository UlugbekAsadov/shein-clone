import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { Header } from "@/shared/components/header/header";
import { Footer } from "@/shared/components/footer/footer";
import { ProductBreadcrumb } from "@/features/products/pages/[slug]/components/product-breadcrumb";
import { productBreadcrumbTrail } from "@/features/products/pages/[slug]/mocks/breadcrumb.mocks";
import { productDetailMock } from "@/features/products/pages/[slug]/pages/comments/mocks/product-detail.mocks";
import { CommentsFilterSidebar } from "@/features/products/pages/[slug]/pages/comments/components/comments-filter-sidebar/comments-filter-sidebar";
import { CommentsHeader } from "@/features/products/pages/[slug]/pages/comments/components/comments-header";
import { CommentsSummaryCard } from "@/features/products/pages/[slug]/pages/comments/components/comments-summary/comments-summary-card";
import { CommentsMediaGallery } from "@/features/products/pages/[slug]/pages/comments/components/comments-media-gallery";
import { CommentsReviewList } from "@/features/products/pages/[slug]/pages/comments/components/comments-list/comments-review-list";
import { CommentsStickyBar } from "@/features/products/pages/[slug]/pages/comments/components/comments-sticky-bar";
import { CommentsMobilePage } from "@/features/products/pages/[slug]/pages/comments/components/comments-mobile/comments-mobile-page";
import { ratingDistributionMock } from "@/features/products/pages/[slug]/pages/comments/mocks/rating-distribution.mocks";
import { commentsReviewsMock } from "@/features/products/pages/[slug]/pages/comments/mocks/comments-reviews.mocks";
import {
  commentsMediaMock,
  commentsVideoIndex,
} from "@/features/products/pages/[slug]/pages/comments/mocks/comments-media.mocks";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
  slug: string;
}

export function CommentsPage({ lang, dict, slug }: IProps) {
  const product = productDetailMock;

  return (
    <>
      <CommentsMobilePage
        reviews={commentsReviewsMock}
        applyLabel={dict.listing.filter.apply}
      />

      <div className="hidden md:contents">
        <Header lang={lang} dict={dict} />

        <main className="flex-1 pb-24">
          <div className="mx-auto flex max-w-360 flex-col gap-6 px-6 py-6">
            <ProductBreadcrumb items={productBreadcrumbTrail} />

            <div className="flex gap-8">
              <CommentsFilterSidebar />

              <section className="flex flex-1 flex-col gap-4">
                <CommentsHeader totalLabel="100+" />
                <CommentsSummaryCard
                  rating={product.rating}
                  buckets={ratingDistributionMock}
                />
                <CommentsMediaGallery
                  lang={lang}
                  slug={slug}
                  images={commentsMediaMock}
                  videoIndex={commentsVideoIndex}
                />
                <CommentsReviewList reviews={commentsReviewsMock} />
              </section>
            </div>
          </div>
        </main>

        <CommentsStickyBar product={product} />
        <Footer dict={dict} />
      </div>
    </>
  );
}
