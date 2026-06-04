import { notFound } from "next/navigation";
import { hasLocale } from "@/core/config/i18n/i18n-config";
import { getDictionary } from "@/core/config/i18n/dictionaries";
import { EditAddressPage } from "@/features/profile/pages/addresses/pages/[id]/pages/edit/pages/edit-address.page";

export default async function Page({
  params,
}: PageProps<"/[lang]/demo/profile/addresses/[id]/edit">) {
  const { lang, id } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  return <EditAddressPage lang={lang} dict={dict} id={id} />;
}
