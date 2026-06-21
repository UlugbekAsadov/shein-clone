import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/core/config/i18n/i18n-config";
import { getDictionary } from "@/core/config/i18n/dictionaries";
import { getProductDetail } from "@/features/products/services/products-detail.service";
import { ProductPage } from "@/features/products/pages/[slug]/pages/product.page";
import { buildMetadata, stripHtml, truncate } from "@/shared/utils/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/demo/products/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};

  const product = await getProductDetail(slug);
  if (!product) return {};

  const title = product.name?.[lang] || product.title;
  const description = truncate(
    stripHtml(product.description || title),
    200,
  );
  const images = [product.image_url, ...(product.additional_images ?? [])];

  return buildMetadata({
    title,
    description,
    path: `/${lang}/demo/products/${slug}`,
    images,
    locale: lang,
  });
}

export default async function Page({
  params,
}: PageProps<"/[lang]/demo/products/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  return <ProductPage lang={lang} dict={dict} slug={slug} />;
}
