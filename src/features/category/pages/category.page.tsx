import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { Header } from "@/shared/components/header/header";
import { Footer } from "@/shared/components/footer/footer";
import { MobileSearchBar } from "@/shared/components/header/mobile-search-bar";
import { getCategories } from "@/features/category/services/category.service";
import { CategoryDrillHeader } from "@/features/category/components/category-drill-header";
import { CategoryGroupsList } from "@/features/category/components/category-groups-list";
import { CategorySubcategoriesView } from "@/features/category/components/category-subcategories-view";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
  groupSlug: string | null;
}

export async function CategoryPage({ lang, dict, groupSlug }: IProps) {
  const categories = await getCategories();

  const activeGroup = groupSlug
    ? categories.find((g) => g.slug === groupSlug)
    : null;

  return (
    <>
      <Header lang={lang} dict={dict} />

      <main className="flex-1">
        <div className="pb-6">
          <div className="sticky top-0 z-30 bg-background pt-3 md:pt-4">
            <MobileSearchBar
              lang={lang}
              placeholder={dict.header.searchPlaceholder}
              visualSearchDict={dict.visualSearch}
            />
            {activeGroup && (
              <CategoryDrillHeader lang={lang} title={activeGroup.title} />
            )}
          </div>

          <div className="mx-auto max-w-360 px-4 md:px-6">
            {activeGroup ? (
              <CategorySubcategoriesView lang={lang} group={activeGroup} />
            ) : (
              <CategoryGroupsList lang={lang} categories={categories} />
            )}
          </div>
        </div>
      </main>

      <Footer dict={dict} />
    </>
  );
}
