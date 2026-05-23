import { notFound } from "next/navigation";
import { hasLocale } from "@/core/config/i18n/i18n-config";
import { getDictionary } from "@/core/config/i18n/dictionaries";
import { AddCardPage } from "@/features/profile/pages/payments/pages/add/pages/add-card.page";

export default async function Page({
  params,
}: PageProps<"/[lang]/profile/payments/add">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  return <AddCardPage lang={lang} dict={dict} />;
}
