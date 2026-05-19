import { notFound } from "next/navigation";
import { hasLocale } from "@/core/config/i18n/i18n-config";
import { getDictionary } from "@/core/config/i18n/dictionaries";
import { Header } from "@/shared/components/header/header";
import { Footer } from "@/shared/components/footer/footer";
import { ProductBreadcrumb } from "@/features/product/components/product-breadcrumb";
import { productBreadcrumbTrail } from "@/features/product/mocks/breadcrumb.mocks";
import { productDetailMock } from "@/features/product/mocks/product-detail.mocks";
import { CommentsFilterSidebar } from "@/features/product/components/comments/comments-filter-sidebar/comments-filter-sidebar";
import { CommentsHeader } from "@/features/product/components/comments/comments-header";
import { CommentsSummaryCard } from "@/features/product/components/comments/comments-summary/comments-summary-card";
import { CommentsMediaGallery } from "@/features/product/components/comments/comments-media-gallery";
import { CommentsReviewList } from "@/features/product/components/comments/comments-list/comments-review-list";
import { CommentsStickyBar } from "@/features/product/components/comments/comments-sticky-bar";
import { CommentsMobilePage } from "@/features/product/components/comments/comments-mobile/comments-mobile-page";
import { ratingDistributionMock } from "@/features/product/mocks/rating-distribution.mocks";
import { commentsReviewsMock } from "@/features/product/mocks/comments-reviews.mocks";
import {
  commentsMediaMock,
  commentsVideoIndex,
} from "@/features/product/mocks/comments-media.mocks";

export default async function ProductCommentsPage({
  params,
}: PageProps<"/[lang]/product/[slug]/comments">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
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
