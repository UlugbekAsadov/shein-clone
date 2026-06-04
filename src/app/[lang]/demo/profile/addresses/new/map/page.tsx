import { notFound } from "next/navigation";
import { hasLocale } from "@/core/config/i18n/i18n-config";
import { getDictionary } from "@/core/config/i18n/dictionaries";
import { NewAddressMapPage } from "@/features/profile/pages/addresses/pages/new/pages/map/pages/new-address-map.page";

export default async function Page({
  params,
}: PageProps<"/[lang]/demo/profile/addresses/new/map">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  return <NewAddressMapPage lang={lang} dict={dict} />;
}
