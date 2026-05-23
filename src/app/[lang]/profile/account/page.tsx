import { notFound } from "next/navigation";
import { hasLocale } from "@/core/config/i18n/i18n-config";
import { getDictionary } from "@/core/config/i18n/dictionaries";
import { AccountPage } from "@/features/profile/pages/account/pages/account.page";

export default async function Page({
  params,
}: PageProps<"/[lang]/profile/account">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  return <AccountPage lang={lang} dict={dict} />;
}
