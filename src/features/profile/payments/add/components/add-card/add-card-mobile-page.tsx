import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { CardsMobileHeader } from "@/features/profile/components/cards-mobile/cards-mobile-header";
import { AddCardForm } from "./add-card-form";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
}

export function AddCardMobilePage({ lang, dict }: IProps) {
  const t = dict.profile.payments.addCardPage;

  return (
    <div className="flex min-h-screen flex-col md:hidden">
      <CardsMobileHeader title={t.title} />
      <AddCardForm lang={lang} dict={dict} />
    </div>
  );
}
