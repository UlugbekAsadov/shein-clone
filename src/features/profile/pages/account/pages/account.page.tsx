"use client";

import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { Header } from "@/shared/components/header/header";
import { Footer } from "@/shared/components/footer/footer";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import { ProfileShell } from "@/features/profile/components/profile-shell";
import { useAccountProfile } from "@/features/profile/pages/account/hooks/use-account-profile";
import { AccountForm } from "@/features/profile/pages/account/components/account-desktop/account-form";
import { AccountFormSkeleton } from "@/features/profile/pages/account/components/account-desktop/account-form-skeleton";
import { AccountMobilePage } from "@/features/profile/pages/account/components/account-mobile/account-mobile-page";
import { AccountMobileSkeleton } from "@/features/profile/pages/account/components/account-mobile/account-mobile-skeleton";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
}

export function AccountPage({ lang, dict }: IProps) {
  const t = dict.profile.account;
  const profile = useAccountProfile();
  const { isPending } = useCurrentUser();

  return (
    <>
      <Header lang={lang} dict={dict} />

      <main className="flex-1">
        {isPending ? (
          <AccountMobileSkeleton />
        ) : (
          <AccountMobilePage dict={dict} profile={profile} />
        )}

        <div className="hidden md:block">
          <ProfileShell lang={lang} dict={dict} activeId="account">
            <header className="mb-6">
              <h1 className="text-xl font-bold">{t.title}</h1>
              <p className="mt-1 text-sm text-muted-foreground">{t.current}</p>
            </header>
            {isPending ? (
              <AccountFormSkeleton />
            ) : (
              <AccountForm dict={dict} profile={profile} />
            )}
          </ProfileShell>
        </div>
      </main>

      <Footer dict={dict} />
    </>
  );
}
