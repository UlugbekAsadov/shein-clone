import { notFound } from "next/navigation";
import { hasLocale } from "@/core/config/i18n/i18n-config";
import { getDictionary } from "@/core/config/i18n/dictionaries";
import { AddressesPage } from "@/features/profile/pages/addresses/pages/addresses.page";

export default async function Page({
  params,
}: PageProps<"/[lang]/profile/addresses">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  return <AddressesPage lang={lang} dict={dict} />;
}
