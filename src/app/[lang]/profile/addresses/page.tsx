import { notFound } from "next/navigation";
import { hasLocale } from "@/core/config/i18n/i18n-config";
import { getDictionary } from "@/core/config/i18n/dictionaries";
import { Header } from "@/shared/components/header/header";
import { Footer } from "@/shared/components/footer/footer";
import { ProfileShell } from "@/features/profile/components/profile-shell";
import { AddressesDesktopList } from "@/features/profile/components/addresses/addresses-desktop-list";
import { AddressesMobilePage } from "@/features/profile/components/addresses-mobile/addresses-mobile-page";
import { getUserAddresses } from "@/features/profile/services/address.service";

export default async function AddressesPage({
  params,
}: PageProps<"/[lang]/profile/addresses">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const addresses = await getUserAddresses();

  return (
    <>
      <Header lang={lang} dict={dict} />

      <main className="flex-1">
        <AddressesMobilePage
          lang={lang}
          dict={dict}
          initialAddresses={addresses}
        />

        <div className="hidden md:block">
          <ProfileShell lang={lang} dict={dict} activeId="addresses">
            <AddressesDesktopList
              addresses={addresses}
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
