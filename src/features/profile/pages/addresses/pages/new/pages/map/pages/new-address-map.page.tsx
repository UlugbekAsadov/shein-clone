import { Suspense } from "react";
import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { AddressMapMobilePage } from "@/features/profile/pages/addresses/components/address-map-mobile/address-map-mobile-page";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
}

export function NewAddressMapPage({ lang, dict }: IProps) {
  const apiKey = process.env.NEXT_PUBLIC_YANDEX_API_KEY ?? "";

  return (
    <main className="flex-1">
      <Suspense>
        <AddressMapMobilePage lang={lang} dict={dict} apiKey={apiKey} />
      </Suspense>
    </main>
  );
}
