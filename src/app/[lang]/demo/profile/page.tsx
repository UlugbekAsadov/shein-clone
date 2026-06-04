import { notFound } from "next/navigation";
import { hasLocale } from "@/core/config/i18n/i18n-config";
import { getDictionary } from "@/core/config/i18n/dictionaries";
import { ProfilePage } from "@/features/profile/pages/profile.page";

export default async function Page({
  params,
}: PageProps<"/[lang]/demo/profile">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  return <ProfilePage lang={lang} dict={dict} />;
}
