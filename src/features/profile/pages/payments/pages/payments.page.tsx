"use client";

import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { Header } from "@/shared/components/header/header";
import { Footer } from "@/shared/components/footer/footer";
import { ProfileShell } from "@/features/profile/components/profile-shell";
import { CardsMobilePage } from "@/features/profile/pages/payments/components/cards-mobile/cards-mobile-page";
import { CardsMobileSkeleton } from "@/features/profile/pages/payments/components/cards-mobile/cards-mobile-skeleton";
import { CardsDesktopPage } from "@/features/profile/pages/payments/components/cards-desktop/cards-desktop-page";
import { CardsDesktopSkeleton } from "@/features/profile/pages/payments/components/cards-desktop/cards-desktop-skeleton";
import { useUserCards } from "@/features/profile/pages/payments/hooks/use-user-cards";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
}

export function PaymentsPage({ lang, dict }: IProps) {
  const { data: cards = [], isPending } = useUserCards();

  return (
    <>
      <Header lang={lang} dict={dict} />

      <main className="flex-1">
        {isPending ? (
          <CardsMobileSkeleton />
        ) : (
          <CardsMobilePage lang={lang} dict={dict} initialCards={cards} />
        )}

        <div className="hidden md:block">
          <ProfileShell lang={lang} dict={dict} activeId="payments">
            {isPending ? (
              <CardsDesktopSkeleton />
            ) : (
              <CardsDesktopPage dict={dict} initialCards={cards} />
            )}
          </ProfileShell>
        </div>
      </main>

      <Footer dict={dict} />
    </>
  );
}
