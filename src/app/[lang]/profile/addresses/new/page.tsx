import { notFound } from "next/navigation";
import { Suspense } from "react";
import { hasLocale } from "@/core/config/i18n/i18n-config";
import { getDictionary } from "@/core/config/i18n/dictionaries";
import { Header } from "@/shared/components/header/header";
import { Footer } from "@/shared/components/footer/footer";
import { ProfileShell } from "@/features/profile/components/profile-shell";
import { AddressForm } from "@/features/profile/components/addresses/address-form";
import { NewAddressMobilePage } from "@/features/profile/components/new-address-mobile/new-address-mobile-page";

export default async function NewAddressPage({
  params,
}: PageProps<"/[lang]/profile/addresses/new">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <>
      <Header lang={lang} dict={dict} />

      <main className="flex-1">
        <Suspense>
          <NewAddressMobilePage lang={lang} dict={dict} />
        </Suspense>

        <div className="hidden md:block">
          <ProfileShell lang={lang} dict={dict} activeId="addresses">
            <AddressForm dict={dict} lang={lang} />
          </ProfileShell>
        </div>
      </main>

      <Footer dict={dict} />
    </>
  );
}
