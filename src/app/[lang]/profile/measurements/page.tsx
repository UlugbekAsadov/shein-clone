import { notFound } from "next/navigation";
import { hasLocale } from "@/core/config/i18n/i18n-config";
import { getDictionary } from "@/core/config/i18n/dictionaries";
import { MeasurementsPage } from "@/features/profile/pages/measurements/pages/measurements.page";

export default async function Page({
  params,
}: PageProps<"/[lang]/profile/measurements">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  return <MeasurementsPage lang={lang} dict={dict} />;
}
