import { notFound } from "next/navigation";
import { hasLocale } from "@/core/config/i18n/i18n-config";
import { getDictionary } from "@/core/config/i18n/dictionaries";
import { SearchPage } from "@/features/search/pages/search.page";

export default async function Page({
  params,
  searchParams,
}: PageProps<"/[lang]/demo/search">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const { q } = await searchParams;
  const query = typeof q === "string" ? q : "";

  const dict = await getDictionary(lang);
  return <SearchPage lang={lang} dict={dict} query={query} />;
}
