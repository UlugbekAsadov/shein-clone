"use client";

import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { Header } from "@/shared/components/header/header";
import { Footer } from "@/shared/components/footer/footer";
import { ProfileShell } from "@/features/profile/components/profile-shell";
import { AddressesDesktopList } from "@/features/profile/pages/addresses/components/addresses/addresses-desktop-list";
import { AddressesDesktopSkeleton } from "@/features/profile/pages/addresses/components/addresses/addresses-desktop-skeleton";
import { AddressesMobilePage } from "@/features/profile/pages/addresses/components/addresses-mobile/addresses-mobile-page";
import { AddressesMobileSkeleton } from "@/features/profile/pages/addresses/components/addresses-mobile/addresses-mobile-skeleton";
import { useUserAddresses } from "@/features/profile/pages/addresses/hooks/use-user-addresses";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
}

export function AddressesPage({ lang, dict }: IProps) {
  const { data: addresses = [], isPending } = useUserAddresses();

  return (
    <>
      <Header lang={lang} dict={dict} />

      <main className="flex-1">
        {isPending ? (
          <AddressesMobileSkeleton />
        ) : (
          <AddressesMobilePage
            lang={lang}
            dict={dict}
            initialAddresses={addresses}
          />
        )}

        <div className="hidden md:block">
          <ProfileShell lang={lang} dict={dict} activeId="addresses">
            {isPending ? (
              <AddressesDesktopSkeleton />
            ) : (
              <AddressesDesktopList
                addresses={addresses}
                dict={dict}
                lang={lang}
              />
            )}
          </ProfileShell>
        </div>
      </main>

      <Footer dict={dict} />
    </>
  );
}
