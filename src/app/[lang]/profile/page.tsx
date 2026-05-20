import { notFound } from "next/navigation";
import { CircleUserRound } from "lucide-react";
import { hasLocale } from "@/core/config/i18n/i18n-config";
import { getDictionary } from "@/core/config/i18n/dictionaries";
import { Header } from "@/shared/components/header/header";
import { Footer } from "@/shared/components/footer/footer";
import { ProfileShell } from "@/features/profile/components/profile-shell";
import { ProfilePlaceholder } from "@/features/profile/components/profile-placeholder";
import { ProfileMobilePage } from "@/features/profile/components/profile-mobile/profile-mobile-page";

export default async function ProfilePage({
  params,
}: PageProps<"/[lang]/profile">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const t = dict.profile.account;

  return (
    <>
      <Header lang={lang} dict={dict} />

      <main className="flex-1">
        <ProfileMobilePage lang={lang} dict={dict} />

        <div className="hidden md:block">
          <ProfileShell lang={lang} dict={dict} activeId="account">
            <header className="mb-6">
              <h1 className="text-xl font-bold">{t.title}</h1>
              <p className="mt-1 text-sm text-muted-foreground">{t.current}</p>
            </header>
            <ProfilePlaceholder
              icon={CircleUserRound}
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
