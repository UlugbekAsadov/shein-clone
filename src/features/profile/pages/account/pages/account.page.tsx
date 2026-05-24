import { UserCircle } from "@solar-icons/react/ssr";
import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { Header } from "@/shared/components/header/header";
import { Footer } from "@/shared/components/footer/footer";
import { ProfileShell } from "@/features/profile/components/profile-shell";
import { ProfilePlaceholder } from "@/features/profile/components/profile-placeholder";
import { AccountMobilePage } from "@/features/profile/pages/account/components/account-mobile/account-mobile-page";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
}

export function AccountPage({ lang, dict }: IProps) {
  const t = dict.profile.account;

  return (
    <>
      <Header lang={lang} dict={dict} />

      <main className="flex-1">
        <AccountMobilePage dict={dict} />

        <div className="hidden md:block">
          <ProfileShell lang={lang} dict={dict} activeId="account">
            <header className="mb-6">
              <h1 className="text-xl font-bold">{t.title}</h1>
              <p className="mt-1 text-sm text-muted-foreground">{t.current}</p>
            </header>
            <ProfilePlaceholder
              icon={UserCircle}
              title={t.empty.title}
              description={t.empty.description}
            />
          </ProfileShell>
        </div>
      </main>

      <Footer dict={dict} />
    </>
  );
}
