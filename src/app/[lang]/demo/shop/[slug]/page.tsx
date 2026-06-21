import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/core/config/i18n/i18n-config";
import { getDictionary } from "@/core/config/i18n/dictionaries";
import { getShopHeader } from "@/features/shop/services/shop.service";
import { ShopPage } from "@/features/shop/pages/[slug]/pages/shop.page";
import { buildMetadata, stripHtml, truncate } from "@/shared/utils/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/demo/shop/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};

  const shop = await getShopHeader(slug);
  if (!shop) return {};

  const title = shop.display_name || shop.name?.[lang] || slug;
  const description = truncate(
    stripHtml(shop.description || title),
    200,
  );
  const images = [shop.banner_url, shop.logo_url];

  return buildMetadata({
    title,
    description,
    path: `/${lang}/demo/shop/${slug}`,
    images,
    type: "profile",
    locale: lang,
  });
}

export default async function Page({
  params,
}: PageProps<"/[lang]/demo/shop/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  return <ShopPage lang={lang} dict={dict} slug={slug} />;
}
