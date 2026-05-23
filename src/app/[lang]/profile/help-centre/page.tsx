import { notFound } from "next/navigation";
import { hasLocale } from "@/core/config/i18n/i18n-config";
import { getDictionary } from "@/core/config/i18n/dictionaries";
import { HelpCentrePage } from "@/features/profile/pages/help-centre/pages/help-centre.page";

export default async function Page({
  params,
}: PageProps<"/[lang]/profile/help-centre">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  return <HelpCentrePage lang={lang} dict={dict} />;
}
