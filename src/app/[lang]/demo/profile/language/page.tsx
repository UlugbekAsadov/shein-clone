import { notFound } from "next/navigation";
import { hasLocale } from "@/core/config/i18n/i18n-config";
import { getDictionary } from "@/core/config/i18n/dictionaries";
import { LanguagePage } from "@/features/profile/pages/language/pages/language.page";

export default async function Page({
  params,
}: PageProps<"/[lang]/demo/profile/language">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  return <LanguagePage lang={lang} dict={dict} />;
}
