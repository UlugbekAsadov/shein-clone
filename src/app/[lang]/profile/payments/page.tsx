import { notFound } from "next/navigation";
import { hasLocale } from "@/core/config/i18n/i18n-config";
import { getDictionary } from "@/core/config/i18n/dictionaries";
import { Header } from "@/shared/components/header/header";
import { Footer } from "@/shared/components/footer/footer";
import { ProfileShell } from "@/features/profile/components/profile-shell";
import { CardsMobilePage } from "@/features/profile/components/cards-mobile/cards-mobile-page";
import { CardsDesktopPage } from "@/features/profile/components/cards-desktop/cards-desktop-page";
import { cardMocks } from "@/features/profile/mocks/card.mocks";

export default async function PaymentsPage({
  params,
}: PageProps<"/[lang]/profile/payments">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <>
      <Header lang={lang} dict={dict} />

      <main className="flex-1">
        <CardsMobilePage lang={lang} dict={dict} initialCards={cardMocks} />

        <div className="hidden md:block">
          <ProfileShell lang={lang} dict={dict} activeId="payments">
            <CardsDesktopPage dict={dict} initialCards={cardMocks} />
          </ProfileShell>
        </div>
      </main>

      <Footer dict={dict} />
    </>
  );
}
