import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n-config";
import { productDetailMock } from "../../_lib/mocks/product-detail.mocks";
import { GalleryPageContent } from "./_components/gallery-page-content";
import { galleryItemsMock } from "./_lib/mocks/gallery-items.mocks";

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
