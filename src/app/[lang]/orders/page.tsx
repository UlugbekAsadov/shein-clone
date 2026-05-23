import { notFound } from "next/navigation";
import { hasLocale } from "@/core/config/i18n/i18n-config";
import { getDictionary } from "@/core/config/i18n/dictionaries";
import { OrdersPage } from "@/features/orders/pages/orders.page";

export default async function Page({ params }: PageProps<"/[lang]/orders">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  return <OrdersPage lang={lang} dict={dict} />;
}
