import { notFound } from "next/navigation";
import { hasLocale } from "@/core/config/i18n/i18n-config";
import { getDictionary } from "@/core/config/i18n/dictionaries";
import { HomePage } from "@/features/home/pages/home.page";

export default async function Page({ params }: PageProps<"/[lang]/demo">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return <HomePage lang={lang} dict={dict} />;
}
