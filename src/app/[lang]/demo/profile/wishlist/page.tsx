import { notFound } from "next/navigation";
import { hasLocale } from "@/core/config/i18n/i18n-config";
import { getDictionary } from "@/core/config/i18n/dictionaries";
import { WishlistPage } from "@/features/profile/pages/wishlist/pages/wishlist.page";

export default async function Page({
  params,
}: PageProps<"/[lang]/demo/profile/wishlist">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  return <WishlistPage lang={lang} dict={dict} />;
}
