import { notFound } from "next/navigation";
import { hasLocale } from "@/core/config/i18n/i18n-config";
import { getDictionary } from "@/core/config/i18n/dictionaries";
import { OrderDetailPage } from "@/features/orders/pages/[id]/pages/order-detail.page";

export default async function Page({
  params,
}: PageProps<"/[lang]/demo/orders/[id]">) {
  const { lang, id } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  return <OrderDetailPage lang={lang} dict={dict} id={id} />;
}
