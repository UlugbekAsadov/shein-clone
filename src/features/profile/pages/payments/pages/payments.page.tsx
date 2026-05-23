import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { Header } from "@/shared/components/header/header";
import { Footer } from "@/shared/components/footer/footer";
import { ProfileShell } from "@/features/profile/components/profile-shell";
import { CardsMobilePage } from "@/features/profile/pages/payments/components/cards-mobile/cards-mobile-page";
import { CardsDesktopPage } from "@/features/profile/pages/payments/components/cards-desktop/cards-desktop-page";
import { cardMocks } from "@/features/profile/pages/payments/mocks/card.mocks";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
}

export function PaymentsPage({ lang, dict }: IProps) {
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
