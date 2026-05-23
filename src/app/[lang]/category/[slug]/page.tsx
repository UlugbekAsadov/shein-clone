import { notFound } from "next/navigation";
import { hasLocale } from "@/core/config/i18n/i18n-config";
import { getDictionary } from "@/core/config/i18n/dictionaries";
import { CategorySlugPage } from "@/features/category/pages/[slug]/pages/category-slug.page";

export default async function Page({
  params,
}: PageProps<"/[lang]/category/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  return <CategorySlugPage lang={lang} dict={dict} slug={slug} />;
}
