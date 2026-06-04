import { notFound } from "next/navigation";
import { hasLocale } from "@/core/config/i18n/i18n-config";
import { getDictionary } from "@/core/config/i18n/dictionaries";
import { EditAddressMapPage } from "@/features/profile/pages/addresses/pages/[id]/pages/edit/pages/map/pages/edit-address-map.page";

export default async function Page({
  params,
}: PageProps<"/[lang]/demo/profile/addresses/[id]/edit/map">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  return <EditAddressMapPage lang={lang} dict={dict} />;
}
