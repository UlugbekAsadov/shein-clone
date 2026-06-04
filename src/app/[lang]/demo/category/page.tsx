import { notFound } from "next/navigation";
import { hasLocale } from "@/core/config/i18n/i18n-config";
import { getDictionary } from "@/core/config/i18n/dictionaries";
import { CategoryPage } from "@/features/category/pages/category.page";

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
