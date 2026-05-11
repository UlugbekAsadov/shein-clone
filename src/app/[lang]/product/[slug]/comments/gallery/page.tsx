import { notFound } from "next/navigation";
import { hasLocale } from "@/core/config/i18n/i18n-config";
import { productDetailMock } from "@/features/product/mocks/product-detail.mocks";
import { GalleryPageContent } from "@/features/product/components/gallery/gallery-page-content";
import { galleryItemsMock } from "@/features/product/mocks/gallery-items.mocks";

export default async function ProductCommentsGalleryPage({
  params,
}: PageProps<"/[lang]/product/[slug]/comments/gallery">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <GalleryPageContent
      items={galleryItemsMock}
      product={productDetailMock}
      backHref={`/${lang}/product/${slug}`}
    />
  );
}
