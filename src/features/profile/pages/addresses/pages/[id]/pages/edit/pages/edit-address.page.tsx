"use client";

import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { AddressFormDesktop } from "@/features/profile/pages/addresses/components/addresses/address-form-desktop";
import { AddressFormDesktopSkeleton } from "@/features/profile/pages/addresses/components/addresses/address-form-desktop-skeleton";
import { NewAddressMobilePage } from "@/features/profile/pages/addresses/components/new-address-mobile/new-address-mobile-page";
import { NewAddressMobileSkeleton } from "@/features/profile/pages/addresses/components/new-address-mobile/new-address-mobile-skeleton";
import { useUserAddress } from "@/features/profile/pages/addresses/pages/[id]/pages/edit/hooks/use-user-address";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
  id: string;
}

export function EditAddressPage({ lang, dict, id }: IProps) {
  const apiKey = process.env.NEXT_PUBLIC_YANDEX_API_KEY ?? "";
  const { data: address, isLoading } = useUserAddress(id);

  if (isLoading) {
    return (
      <main className="flex-1">
        <NewAddressMobileSkeleton />

        <div className="hidden md:block">
          <AddressFormDesktopSkeleton />
        </div>
      </main>
    );
  }

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
