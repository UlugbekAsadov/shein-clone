import { Suspense } from "react";
import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { AddressFormDesktop } from "@/features/profile/pages/addresses/components/addresses/address-form-desktop";
import { NewAddressMobilePage } from "@/features/profile/pages/addresses/components/new-address-mobile/new-address-mobile-page";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
}

export function NewAddressPage({ lang, dict }: IProps) {
  const apiKey = process.env.NEXT_PUBLIC_YANDEX_API_KEY ?? "";

  return (
    <main className="flex-1">
      <Suspense>
        <NewAddressMobilePage lang={lang} dict={dict} />
      </Suspense>

      <div className="hidden md:block">
        <Suspense>
          <AddressFormDesktop lang={lang} dict={dict} apiKey={apiKey} />
        </Suspense>
      </div>
    </main>
  );
}
