import { notFound } from "next/navigation";
import { hasLocale } from "@/core/config/i18n/i18n-config";
import { getDictionary } from "@/core/config/i18n/dictionaries";
import { ProfileOrdersPage } from "@/features/profile/pages/orders/pages/orders.page";

export default async function Page({
  params,
}: PageProps<"/[lang]/profile/orders">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  return <ProfileOrdersPage lang={lang} dict={dict} />;
}
