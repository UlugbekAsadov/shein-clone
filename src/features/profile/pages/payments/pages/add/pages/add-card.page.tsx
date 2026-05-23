import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { AddCardMobilePage } from "@/features/profile/pages/payments/pages/add/components/add-card/add-card-mobile-page";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
}

export function AddCardPage({ lang, dict }: IProps) {
  return (
    <main className="flex-1">
      <AddCardMobilePage lang={lang} dict={dict} />
    </main>
  );
}
