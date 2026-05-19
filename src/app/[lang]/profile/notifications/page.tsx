import { notFound } from "next/navigation";
import { Bell } from "@solar-icons/react/ssr";
import { hasLocale } from "@/core/config/i18n/i18n-config";
import { getDictionary } from "@/core/config/i18n/dictionaries";
import { Header } from "@/shared/components/header/header";
import { Footer } from "@/shared/components/footer/footer";
import { PagePlaceholder } from "@/shared/components/page-placeholder/page-placeholder";

export default async function NotificationsPage({
  params,
}: PageProps<"/[lang]/profile/notifications">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <>
      <Header lang={lang} dict={dict} />

      <main className="flex-1">
        <PagePlaceholder
          icon={Bell}
          title={dict.profile.nav.notifications}
          description={dict.profile.nav.notifications}
        />
      </main>

      <Footer dict={dict} />
    </>
  );
}
