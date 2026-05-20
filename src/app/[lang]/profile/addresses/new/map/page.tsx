import { notFound } from "next/navigation";
import { Suspense } from "react";
import { hasLocale } from "@/core/config/i18n/i18n-config";
import { getDictionary } from "@/core/config/i18n/dictionaries";
import { AddressMapMobilePage } from "@/features/profile/components/address-map-mobile/address-map-mobile-page";

export default async function AddressMapPage({
  params,
}: PageProps<"/[lang]/profile/addresses/new/map">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const apiKey = process.env.NEXT_PUBLIC_YANDEX_API_KEY ?? "";

  return (
    <main className="flex-1">
      <Suspense>
        <AddressMapMobilePage lang={lang} dict={dict} apiKey={apiKey} />
      </Suspense>
    </main>
  );
}
