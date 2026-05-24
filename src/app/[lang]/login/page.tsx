import { notFound, redirect } from "next/navigation";
import { hasLocale } from "@/core/config/i18n/i18n-config";
import { getDictionary } from "@/core/config/i18n/dictionaries";
import { isAuthenticated } from "@/features/auth/services/auth.service";
import { LoginPage } from "@/features/login/pages/login.page";

export default async function Page({ params }: PageProps<"/[lang]/login">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  if (await isAuthenticated()) {
    redirect(`/${lang}/profile`);
  }

  const dict = await getDictionary(lang);
  return <LoginPage lang={lang} dict={dict} />;
}
