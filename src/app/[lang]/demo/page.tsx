import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { hasLocale } from "@/core/config/i18n/i18n-config";
import { getDictionary } from "@/core/config/i18n/dictionaries";
import { HomePage } from "@/features/home/pages/home.page";
import { getBanners } from "@/features/home/services/banner.service";
import { getMarketingBadge } from "@/features/home/services/marketing-badge.service";

export default async function Page({ params }: PageProps<"/[lang]/demo">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const headerStore = await headers();
  const userAgent = headerStore.get("user-agent") ?? "";
  const isMobile = /mobile|android|iphone|ipad|ipod/i.test(userAgent);

  const [dict, banners, marketingBadge] = await Promise.all([
    getDictionary(lang),
    getBanners(),
    isMobile ? Promise.resolve(null) : getMarketingBadge(),
  ]);
  return <HomePage lang={lang} dict={dict} banners={banners} marketingBadge={marketingBadge} />;
}
