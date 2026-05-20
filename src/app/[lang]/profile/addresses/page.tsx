import { notFound } from "next/navigation";
import { hasLocale } from "@/core/config/i18n/i18n-config";
import { getDictionary } from "@/core/config/i18n/dictionaries";
import { Header } from "@/shared/components/header/header";
import { Footer } from "@/shared/components/footer/footer";
import { ProfileShell } from "@/features/profile/components/profile-shell";
import { AddressesDesktopList } from "@/features/profile/components/addresses/addresses-desktop-list";
import { AddressesMobilePage } from "@/features/profile/components/addresses-mobile/addresses-mobile-page";
import { addressMocks } from "@/features/profile/mocks/address.mocks";

export default async function AddressesPage({
  params,
}: PageProps<"/[lang]/profile/addresses">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <>
      <Header lang={lang} dict={dict} />

      <main className="flex-1">
        <AddressesMobilePage
          lang={lang}
          dict={dict}
          initialAddresses={addressMocks}
        />

        <div className="hidden md:block">
          <ProfileShell lang={lang} dict={dict} activeId="addresses">
            <AddressesDesktopList
              addresses={addressMocks}
              dict={dict}
              lang={lang}
            />
          </ProfileShell>
        </div>
      </main>

      <Footer dict={dict} />
    </>
  );
}
