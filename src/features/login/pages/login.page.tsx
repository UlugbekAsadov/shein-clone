import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { LoginPageContent } from "@/features/login/components/login-page-content";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
}

export function LoginPage({ lang, dict }: IProps) {
  return (
    <main className="flex min-h-dvh flex-1 flex-col bg-background px-5 pt-6 pb-8 md:items-center md:justify-center md:px-6 md:py-16">
      <LoginPageContent lang={lang} dict={dict} />
    </main>
  );
}
