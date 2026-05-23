import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { AddressFormDesktop } from "@/features/profile/pages/addresses/components/addresses/address-form-desktop";
import { NewAddressMobilePage } from "@/features/profile/pages/addresses/components/new-address-mobile/new-address-mobile-page";
import { getUserAddress } from "@/features/profile/pages/addresses/services/address.service";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
  id: string;
}

export async function EditAddressPage({ lang, dict, id }: IProps) {
  const apiKey = process.env.NEXT_PUBLIC_YANDEX_API_KEY ?? "";
  const address = await getUserAddress(id);
  if (!address) notFound();

  return (
    <main className="flex-1">
      <Suspense>
        <NewAddressMobilePage
          lang={lang}
          dict={dict}
          initialAddress={address}
        />
      </Suspense>

      <div className="hidden md:block">
        <Suspense>
          <AddressFormDesktop
            lang={lang}
            dict={dict}
            apiKey={apiKey}
            initialAddress={address}
          />
        </Suspense>
      </div>
    </main>
  );
}
