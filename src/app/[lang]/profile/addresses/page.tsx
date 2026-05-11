import { notFound } from "next/navigation";
import { hasLocale } from "@/core/config/i18n/i18n-config";
import { getDictionary } from "@/core/config/i18n/dictionaries";
import { Header } from "@/shared/components/header/header";
import { CategoryNav } from "@/shared/components/category/category-nav";
import { Footer } from "@/shared/components/footer/footer";
import { ProfileShell } from "@/features/profile/components/profile-shell";
import { AddressesList } from "@/features/profile/components/addresses/addresses-list";
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
      <CategoryNav
        lang={lang}
        categoriesLabel={dict.nav.categories}
        picksTitle={dict.categoryMenu.picksForYou}
        featuredTitle={dict.categoryMenu.featured}
        filters={dict.nav.filters}
      />

      <main className="flex-1">
        <ProfileShell lang={lang} dict={dict} activeId="addresses">
          <AddressesList addresses={addressMocks} dict={dict} lang={lang} />
        </ProfileShell>
      </main>

      <Footer dict={dict} />
    </>
  );
}
