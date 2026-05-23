import { notFound } from "next/navigation";
import { hasLocale } from "@/core/config/i18n/i18n-config";
import { getDictionary } from "@/core/config/i18n/dictionaries";
import { ShopPage } from "@/features/shop/pages/[slug]/pages/shop.page";

export default async function Page({
  params,
}: PageProps<"/[lang]/shop/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  return <ShopPage lang={lang} dict={dict} slug={slug} />;
}
