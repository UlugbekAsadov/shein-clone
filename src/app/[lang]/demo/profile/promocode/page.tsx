import { notFound } from "next/navigation";
import { hasLocale } from "@/core/config/i18n/i18n-config";
import { getDictionary } from "@/core/config/i18n/dictionaries";
import { PromocodePage } from "@/features/profile/pages/promocode/pages/promocode.page";

export default async function Page({
  params,
}: PageProps<"/[lang]/demo/profile/promocode">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  return <PromocodePage lang={lang} dict={dict} />;
}
