"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { Header } from "@/shared/components/header/header";
import { Footer } from "@/shared/components/footer/footer";
import { ProductBreadcrumb } from "@/features/products/pages/[slug]/components/product-breadcrumb";
import { CommentsFilterBar } from "@/features/products/pages/[slug]/pages/comments/components/comments-filter-bar/comments-filter-bar";
import { CommentsHeader } from "@/features/products/pages/[slug]/pages/comments/components/comments-header";
import { CommentsSummaryCard } from "@/features/products/pages/[slug]/pages/comments/components/comments-summary/comments-summary-card";
import { CommentsMediaGallery } from "@/features/products/pages/[slug]/pages/comments/components/comments-media-gallery";
import { CommentsReviewList } from "@/features/products/pages/[slug]/pages/comments/components/comments-list/comments-review-list";
import { CommentsStickyBar } from "@/features/products/pages/[slug]/pages/comments/components/comments-sticky-bar";
import { CommentsMobilePage } from "@/features/products/pages/[slug]/pages/comments/components/comments-mobile/comments-mobile-page";
import { CommentsPageSkeleton } from "@/features/products/pages/[slug]/pages/comments/components/comments-page-skeleton/comments-page-skeleton";
import { CommentsMobileSkeleton } from "@/features/products/pages/[slug]/pages/comments/components/comments-page-skeleton/comments-mobile-skeleton";
import { useProductDetail } from "@/features/products/pages/[slug]/hooks/use-product-detail";
import { useProductComments } from "@/features/products/pages/[slug]/pages/comments/hooks/use-product-comments";
import { useCommentsFilterOptions } from "@/features/products/pages/[slug]/pages/comments/hooks/use-comments-filter-options";
import { mapCommentToReview } from "@/features/products/pages/[slug]/utils/map-comment-to-review";
import {
  toColorOptions,
  toContentTypeOptions,
  toRatingBuckets,
  toRatingOptions,
  toSizeOptions,
} from "@/features/products/pages/[slug]/pages/comments/utils/comment-filter-mappers";
import { toStickyProduct } from "@/features/products/pages/[slug]/pages/comments/utils/map-sticky-product";
import {
  buildCommentsFilterQuery,
  parseCommentsFilters,
} from "@/features/products/pages/[slug]/pages/comments/utils/comments-filter-url";
import type { ICommentsFilterState } from "@/features/products/pages/[slug]/pages/comments/utils/comments-filter-state.interface";
import type { ICommentsFilterGroup } from "@/features/products/pages/[slug]/pages/comments/utils/comments-filter-group.interface";
import type { ICommentsSortControl } from "@/features/products/pages/[slug]/pages/comments/utils/comments-sort.interface";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
  slug: string;
}

function toggleValue(values: string[], id: string): string[] {
  return values.includes(id)
    ? values.filter((value) => value !== id)
    : [...values, id];
}

export function CommentsPage({ lang, dict, slug }: IProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters = useMemo(
    () => parseCommentsFilters(new URLSearchParams(searchParams.toString())),
    [searchParams],
  );

  const applyFilters = (next: ICommentsFilterState) => {
    const query = buildCommentsFilterQuery(next);
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };

  const { data: product, isPending: productPending } = useProductDetail(slug);
  const { data: filterOptions } = useCommentsFilterOptions(product?.id);
  const { data: commentsData, isLoading: commentsLoading } = useProductComments(
    product?.id,
    filters,
  );

  if (productPending || commentsLoading) {
    return (
      <>
        <CommentsMobileSkeleton />

        <div className="hidden md:contents">
          <Header lang={lang} dict={dict} />
          <main className="flex-1 pb-24">
            <CommentsPageSkeleton />
          </main>
          <Footer dict={dict} />
        </div>
      </>
    );
  }

  const reviews = (commentsData?.data ?? []).map(mapCommentToReview);
  const mediaImages = Array.from(
    new Set(reviews.flatMap((review) => review.images ?? [])),
  ).slice(0, 14);

  const ratingBuckets = toRatingBuckets(filterOptions);
  const total = commentsData?.meta.total ?? 0;
  const rating = product?.rating ?? 0;

  const filterGroups: ICommentsFilterGroup[] = [
    {
      key: "rating",
      label: dict.comments.filterRating,
      options: toRatingOptions(filterOptions),
      selected: filters.ratings,
      onToggle: (id) =>
        applyFilters({ ...filters, ratings: toggleValue(filters.ratings, id) }),
      onClear: () => applyFilters({ ...filters, ratings: [] }),
    },
    {
      key: "content-type",
      label: dict.comments.filterContentType,
      options: toContentTypeOptions(filterOptions),
      selected: filters.contentTypes,
      onToggle: (id) =>
        applyFilters({
          ...filters,
          contentTypes: toggleValue(filters.contentTypes, id),
        }),
      onClear: () => applyFilters({ ...filters, contentTypes: [] }),
    },
    {
      key: "color",
      label: dict.comments.filterColor,
      options: toColorOptions(filterOptions),
      selected: filters.colors,
      onToggle: (id) =>
        applyFilters({ ...filters, colors: toggleValue(filters.colors, id) }),
      onClear: () => applyFilters({ ...filters, colors: [] }),
    },
    {
      key: "size",
      label: dict.comments.filterSize,
      options: toSizeOptions(filterOptions),
      selected: filters.sizes,
      onToggle: (id) =>
        applyFilters({ ...filters, sizes: toggleValue(filters.sizes, id) }),
      onClear: () => applyFilters({ ...filters, sizes: [] }),
    },
  ];

  const sortControl: ICommentsSortControl = {
    value: filters.sort,
    options: [
      { id: "date", label: dict.comments.sortDate },
      { id: "rating", label: dict.comments.sortRating },
    ],
    onChange: (id) => applyFilters({ ...filters, sort: id }),
  };

  const breadcrumbItems = [
    { id: "home", label: dict.breadcrumb.home, href: `/${lang}/demo` },
    { id: "current", label: product?.title ?? "" },
  ];

  return (
    <>
      <CommentsMobilePage
        reviews={reviews}
        applyLabel={dict.listing.filter.apply}
        groups={filterGroups}
        sort={sortControl}
      />

      <div className="hidden md:contents">
        <Header lang={lang} dict={dict} />

        <main className="flex-1 pb-24">
          <div className="mx-auto flex max-w-360 flex-col gap-6 px-6 py-6">
            <ProductBreadcrumb items={breadcrumbItems} />

            <section className="flex flex-col gap-4">
              <CommentsHeader totalLabel={String(total)} />
              <CommentsSummaryCard rating={rating} buckets={ratingBuckets} />
              {mediaImages.length > 0 && (
                <CommentsMediaGallery
                  lang={lang}
                  slug={slug}
                  images={mediaImages}
                />
              )}

              <CommentsFilterBar
                groups={filterGroups}
                sort={sortControl}
                sortLabel={dict.comments.filterSort}
              />

              <CommentsReviewList reviews={reviews} />
            </section>
          </div>
        </main>

        {/* {product && <CommentsStickyBar product={toStickyProduct(product)} />} */}
        <Footer dict={dict} />
      </div>
    </>
  );
}
