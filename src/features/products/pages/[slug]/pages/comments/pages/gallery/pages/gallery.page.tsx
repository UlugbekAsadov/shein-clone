"use client";

import type { locales } from "@/core/config/i18n/i18n-config";
import { useProductDetail } from "@/features/products/pages/[slug]/hooks/use-product-detail";
import { useGalleryComments } from "@/features/products/pages/[slug]/pages/comments/pages/gallery/hooks/use-gallery-comments";
import { toStickyProduct } from "@/features/products/pages/[slug]/pages/comments/utils/map-sticky-product";
import { mapCommentsToGalleryItems } from "@/features/products/pages/[slug]/pages/comments/pages/gallery/utils/map-comments-to-gallery-items";
import { GalleryPageContent } from "@/features/products/pages/[slug]/pages/comments/pages/gallery/components/gallery-page-content";
import { GalleryLoading } from "@/features/products/pages/[slug]/pages/comments/pages/gallery/components/gallery-loading";
import { GalleryEmpty } from "@/features/products/pages/[slug]/pages/comments/pages/gallery/components/gallery-empty";

interface IProps {
  lang: (typeof locales)[number];
  slug: string;
}

export function GalleryPage({ lang, slug }: IProps) {
  const backHref = `/${lang}/products/${slug}`;

  const { data: product, isPending: productPending } = useProductDetail(slug);
  const { data: commentsData, isLoading: commentsLoading } = useGalleryComments(
    product?.id,
  );

  if (productPending || commentsLoading || !product) {
    return <GalleryLoading backHref={backHref} />;
  }

  const items = mapCommentsToGalleryItems(commentsData?.data ?? []);

  if (items.length === 0) {
    return <GalleryEmpty backHref={backHref} />;
  }

  return (
    <GalleryPageContent
      items={items}
      product={toStickyProduct(product)}
      backHref={backHref}
      lang={lang}
    />
  );
}
