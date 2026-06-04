import { notFound } from "next/navigation";
import { hasLocale } from "@/core/config/i18n/i18n-config";
import { getDictionary } from "@/core/config/i18n/dictionaries";
import { ProductPage } from "@/features/product/pages/[slug]/pages/product.page";

export default async function Page({
  params,
}: PageProps<"/[lang]/demo/product/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  return <ProductPage lang={lang} dict={dict} slug={slug} />;
}
