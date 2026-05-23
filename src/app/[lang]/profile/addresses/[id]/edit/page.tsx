import { notFound } from "next/navigation";
import { Suspense } from "react";
import { hasLocale } from "@/core/config/i18n/i18n-config";
import { getDictionary } from "@/core/config/i18n/dictionaries";
import { AddressFormDesktop } from "@/features/profile/components/addresses/address-form-desktop";
import { NewAddressMobilePage } from "@/features/profile/components/new-address-mobile/new-address-mobile-page";
import { getUserAddress } from "@/features/profile/services/address.service";

export default async function EditAddressPage({
  params,
}: PageProps<"/[lang]/profile/addresses/[id]/edit">) {
  const { lang, id } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
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
