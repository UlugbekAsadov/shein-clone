import { notFound } from "next/navigation";
import { hasLocale } from "@/core/config/i18n/i18n-config";
import { getDictionary } from "@/core/config/i18n/dictionaries";
import { HomePage } from "@/features/home/pages/home.page";
import { getBanners } from "@/features/home/services/banner.service";

export default async function Page({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const [dict, banners] = await Promise.all([
    getDictionary(lang),
    getBanners(),
  ]);
  return <HomePage lang={lang} dict={dict} banners={banners} />;
}
