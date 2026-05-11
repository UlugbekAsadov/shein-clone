import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n-config";
import { getDictionary } from "@/lib/dictionaries";
import { Header } from "@/components/common/header/header";
import { CategoryNav } from "@/components/common/category/category-nav";
import { Footer } from "@/components/common/footer/footer";
import { ProductBreadcrumb } from "../_components/product-breadcrumb";
import { productBreadcrumbTrail } from "../_lib/mocks/breadcrumb.mocks";
import { productDetailMock } from "../_lib/mocks/product-detail.mocks";
import { CommentsFilterSidebar } from "./_components/comments-filter-sidebar/comments-filter-sidebar";
import { CommentsHeader } from "./_components/comments-header";
import { CommentsSummaryCard } from "./_components/comments-summary/comments-summary-card";
import { CommentsMediaGallery } from "./_components/comments-media-gallery";
import { CommentsReviewList } from "./_components/comments-list/comments-review-list";
import { CommentsStickyBar } from "./_components/comments-sticky-bar";
import { ratingDistributionMock } from "./_lib/mocks/rating-distribution.mocks";
import { commentsReviewsMock } from "./_lib/mocks/comments-reviews.mocks";
import {
  commentsMediaMock,
  commentsVideoIndex,
} from "./_lib/mocks/comments-media.mocks";

export default async function ProductCommentsPage({
  params,
}: PageProps<"/[lang]/product/[slug]/comments">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const product = productDetailMock;

  return (
    <>
      <Header lang={lang} dict={dict} />
      <CategoryNav
        lang={lang}
        categoriesLabel={dict.nav.categories}
        picksTitle={dict.categoryMenu.picksForYou}
        featuredTitle={dict.categoryMenu.featured}
        filters={dict.nav.filters}
      />

      <main className="flex-1 pb-24">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-6 py-6">
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
    </>
  );
}
