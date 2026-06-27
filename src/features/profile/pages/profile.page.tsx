"use client";

import { UserCircle } from "@solar-icons/react/ssr";
import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { Header } from "@/shared/components/header/header";
import { Footer } from "@/shared/components/footer/footer";
import { useUser } from "@/features/auth/hooks/use-user";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import { ProfileShell } from "@/features/profile/components/profile-shell";
import { ProfilePlaceholder } from "@/features/profile/components/profile-placeholder";
import { ProfileLoginPrompt } from "@/features/profile/components/profile-login-prompt";
import { ProfileMobilePage } from "@/features/profile/components/profile-mobile/profile-mobile-page";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
}

export function ProfilePage({ lang, dict }: IProps) {
  const { user } = useUser();
  const { isPending } = useCurrentUser();
  const t = dict.profile.account;
  const guest = dict.profile.guest;

  return (
    <>
      <Header lang={lang} dict={dict} />

      <main className="flex-1">
        <ProfileMobilePage lang={lang} dict={dict} user={user} />

        <div className="hidden md:block">
          {isPending || user ? (
            <ProfileShell lang={lang} dict={dict} activeId="account">
              <header className="mb-6">
                <h1 className="text-xl font-bold">{t.title}</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t.current}
                </p>
              </header>
              <ProfilePlaceholder
                icon={UserCircle}
                title={t.empty.title}
                description={t.empty.description}
              />
            </ProfileShell>
          ) : (
            <div className="mx-auto max-w-3xl px-4 py-16">
              <ProfileLoginPrompt
                title={guest.title}
                description={guest.desktopDescription}
                loginButton={guest.loginButton}
              />
            </div>
          )}
        </div>
      </main>

      <Footer dict={dict} />
    </>
  );
}
