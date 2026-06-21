import type { locales } from "@/core/config/i18n/i18n-config";
import { productDetailMock } from "@/features/products/pages/[slug]/pages/comments/mocks/product-detail.mocks";
import { GalleryPageContent } from "@/features/products/pages/[slug]/pages/comments/pages/gallery/components/gallery-page-content";
import { galleryItemsMock } from "@/features/products/pages/[slug]/pages/comments/pages/gallery/mocks/gallery-items.mocks";

interface IProps {
  lang: (typeof locales)[number];
  slug: string;
}

export function GalleryPage({ lang, slug }: IProps) {
  return (
    <GalleryPageContent
      items={galleryItemsMock}
      product={productDetailMock}
      backHref={`/${lang}/products/${slug}`}
    />
  );
}
