import { Translation } from "@solar-icons/react/ssr";
import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { Header } from "@/shared/components/header/header";
import { Footer } from "@/shared/components/footer/footer";
import { PagePlaceholder } from "@/shared/components/page-placeholder/page-placeholder";
import { LanguageMobilePage } from "@/features/profile/pages/language/components/language-mobile/language-mobile-page";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
}

export function LanguagePage({ lang, dict }: IProps) {
  return (
    <>
      <Header lang={lang} dict={dict} />

      <main className="flex-1">
        <LanguageMobilePage lang={lang} dict={dict} />

        <div className="hidden md:block">
          <PagePlaceholder
            icon={Translation}
            title={dict.profile.nav.language}
            description={dict.profile.nav.language}
          />
        </div>
      </main>

      <Footer dict={dict} />
    </>
  );
}
