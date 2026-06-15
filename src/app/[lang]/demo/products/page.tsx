import { notFound } from "next/navigation";
import { hasLocale } from "@/core/config/i18n/i18n-config";
import { getDictionary } from "@/core/config/i18n/dictionaries";
import { ProductsPage } from "@/features/products/pages/products.page";

export default async function Page({
  params,
  searchParams,
}: PageProps<"/[lang]/demo/products">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const rawParams = await searchParams;
  const normalizedParams: Record<string, string> = {};
  for (const [key, value] of Object.entries(rawParams)) {
    if (typeof value === "string") normalizedParams[key] = value;
    else if (Array.isArray(value)) normalizedParams[key] = value.join(",");
  }

  const dict = await getDictionary(lang);
  return <ProductsPage lang={lang} dict={dict} params={normalizedParams} />;
}
