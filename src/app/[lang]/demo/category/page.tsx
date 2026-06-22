import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/core/config/i18n/i18n-config";
import { getDictionary } from "@/core/config/i18n/dictionaries";
import { getCategories } from "@/features/category/services/category.service";
import { findCategoryByKey } from "@/features/category/utils/category-tree.utils";
import { CategoryPage } from "@/features/category/pages/category.page";
import { buildMetadata } from "@/shared/utils/seo";

export async function generateMetadata({
  params,
  searchParams,
}: PageProps<"/[lang]/demo/category">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};

  const dict = await getDictionary(lang);
  const { group } = await searchParams;
  const groupSlug = typeof group === "string" ? group : null;

  const categories = await getCategories();
  const current = groupSlug
    ? findCategoryByKey(categories, groupSlug)
    : null;

  const title = current?.title ?? dict.seo.categoriesTitle;
  const description = current
    ? `${current.title} — 2020Mall`
    : dict.seo.categoriesDescription;
  const images = current
    ? [current.image_url, current.mobile_image_url]
    : [];
  const path = groupSlug
    ? `/${lang}/demo/category?group=${groupSlug}`
    : `/${lang}/demo/category`;

  return buildMetadata({
    title,
    description,
    path,
    images,
    locale: lang,
  });
}

export default async function Page({
  params,
  searchParams,
}: PageProps<"/[lang]/demo/category">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const { group } = await searchParams;
  const groupSlug = typeof group === "string" ? group : null;

  const dict = await getDictionary(lang);
  return <CategoryPage lang={lang} dict={dict} groupSlug={groupSlug} />;
}
