"use client";

import { useRouter, usePathname } from "next/navigation";
import { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import {
  AmericaFlagIcon,
  RussiaFlagIcon,
  UzbekistanFlagIcon,
} from "@/shared/components/icons/outline";
import { LanguageMobileHeader } from "./language-mobile-header";
import { LanguageMobileRow } from "./language-mobile-row";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
}

const flagMap = {
  uz: <UzbekistanFlagIcon className="size-7" />,
  ru: <RussiaFlagIcon className="size-7" />,
  en: <AmericaFlagIcon className="size-7" />,
} as const;

export function LanguageMobilePage({ lang, dict }: IProps) {
  const router = useRouter();
  const pathname = usePathname();
  const t = dict.profile.languagePage;

  const handleSelect = (target: (typeof locales)[number]) => {
    if (target === lang) return;
    const segments = pathname.split("/");
    if (segments.length > 1) segments[1] = target;
    router.replace(segments.join("/") || `/${target}`);
  };

  return (
    <div className="flex min-h-screen flex-col md:hidden">
      <LanguageMobileHeader
        title={t.title}
        backHref={`/${lang}/profile/account`}
      />

      <div className="flex flex-col gap-3 px-4 pt-2">
        {locales.map((locale) => (
          <LanguageMobileRow
            key={locale}
            flag={flagMap[locale]}
            label={dict.language[locale]}
            selected={locale === lang}
            onSelect={() => handleSelect(locale)}
          />
        ))}
      </div>
    </div>
  );
}
