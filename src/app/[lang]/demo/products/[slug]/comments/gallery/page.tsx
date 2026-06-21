import { notFound } from "next/navigation";
import { hasLocale } from "@/core/config/i18n/i18n-config";
import { GalleryPage } from "@/features/products/pages/[slug]/pages/comments/pages/gallery/pages/gallery.page";

export default async function Page({
  params,
}: PageProps<"/[lang]/demo/products/[slug]/comments/gallery">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  return <GalleryPage lang={lang} slug={slug} />;
}
