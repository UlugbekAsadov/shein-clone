import { notFound } from "next/navigation";
import { Ticket } from "lucide-react";
import { hasLocale } from "@/core/config/i18n/i18n-config";
import { getDictionary } from "@/core/config/i18n/dictionaries";
import { Header } from "@/shared/components/header/header";
import { CategoryNav } from "@/shared/components/category/category-nav";
import { Footer } from "@/shared/components/footer/footer";
import { ProfileShell } from "@/features/profile/components/profile-shell";
import { ProfilePlaceholder } from "@/features/profile/components/profile-placeholder";

export default async function PromocodePage({
  params,
}: PageProps<"/[lang]/profile/promocode">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const t = dict.profile.promocode;

  return (
    <>
      <Header lang={lang} dict={dict} />
      <CategoryNav
        lang={lang}
        categoriesLabel={dict.nav.categories}
        picksTitle={dict.categoryMenu.picksForYou}
        featuredTitle={dict.categoryMenu.featured}
        filters={dict.nav.filters}
      />

      <main className="flex-1">
        <ProfileShell lang={lang} dict={dict} activeId="promocode">
          <header className="mb-6">
            <h1 className="text-xl font-bold">{t.title}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{t.current}</p>
          </header>
          <ProfilePlaceholder
            icon={Ticket}
            title={t.empty.title}
            description={t.empty.description}
          />
        </ProfileShell>
      </main>

      <Footer dict={dict} />
    </>
  );
}
