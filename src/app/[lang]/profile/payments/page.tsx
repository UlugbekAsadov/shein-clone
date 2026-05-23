import { notFound } from "next/navigation";
import { hasLocale } from "@/core/config/i18n/i18n-config";
import { getDictionary } from "@/core/config/i18n/dictionaries";
import { PaymentsPage } from "@/features/profile/pages/payments/pages/payments.page";

export default async function Page({
  params,
}: PageProps<"/[lang]/profile/payments">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  return <PaymentsPage lang={lang} dict={dict} />;
}
