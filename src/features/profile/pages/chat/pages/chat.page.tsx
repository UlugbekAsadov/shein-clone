import { ChatRound } from "@solar-icons/react/ssr";
import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { Header } from "@/shared/components/header/header";
import { Footer } from "@/shared/components/footer/footer";
import { PagePlaceholder } from "@/shared/components/page-placeholder/page-placeholder";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
}

export function ChatPage({ lang, dict }: IProps) {
  return (
    <>
      <Header lang={lang} dict={dict} />

      <main className="flex-1">
        <PagePlaceholder
          icon={ChatRound}
          title={dict.profile.nav.chat}
          description={dict.profile.nav.chat}
        />
      </main>

      <Footer dict={dict} />
    </>
  );
}
