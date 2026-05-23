import { QuestionCircle } from "@solar-icons/react/ssr";
import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { Header } from "@/shared/components/header/header";
import { Footer } from "@/shared/components/footer/footer";
import { PagePlaceholder } from "@/shared/components/page-placeholder/page-placeholder";
import { ProfileShell } from "@/features/profile/components/profile-shell";
import { HelpCentreMobilePage } from "@/features/profile/pages/help-centre/components/help-centre-mobile/help-centre-mobile-page";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
}

export function HelpCentrePage({ lang, dict }: IProps) {
  return (
    <>
      <Header lang={lang} dict={dict} />

      <main className="flex-1">
        <HelpCentreMobilePage dict={dict} />

        <div className="hidden md:block">
          <ProfileShell lang={lang} dict={dict} activeId="helpCentre">
            <PagePlaceholder
              icon={QuestionCircle}
              title={dict.profile.nav.helpCentre}
              description={dict.profile.nav.helpCentre}
            />
          </ProfileShell>
        </div>
      </main>

      <Footer dict={dict} />
    </>
  );
}
