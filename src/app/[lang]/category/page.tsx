import { notFound } from "next/navigation";
import { hasLocale } from "@/core/config/i18n/i18n-config";
import { getDictionary } from "@/core/config/i18n/dictionaries";
import { Header } from "@/shared/components/header/header";
import { Footer } from "@/shared/components/footer/footer";
import { CategoryPage } from "@/features/category/components/category-page/category-page";

export default async function CategoryListPage({
  params,
  searchParams,
}: PageProps<"/[lang]/category">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const { group } = await searchParams;
  const groupSlug = typeof group === "string" ? group : null;

  const dict = await getDictionary(lang);

  return (
    <>
      <Header lang={lang} dict={dict} />

      <main className="flex-1">
        <CategoryPage
          lang={lang}
          groupSlug={groupSlug}
          searchPlaceholder={dict.header.searchPlaceholder}
        />
      </main>

      <Footer dict={dict} />
    </>
  );
}
