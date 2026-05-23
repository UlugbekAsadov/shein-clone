import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { Header } from "@/shared/components/header/header";
import { Footer } from "@/shared/components/footer/footer";
import { MobileSearchBar } from "@/shared/components/header/mobile-search-bar";
import { mobileCategoryGroups } from "@/features/category/mocks/category-groups.mocks";
import { CategoryDrillHeader } from "@/features/category/components/category-drill-header";
import { CategoryGroupsList } from "@/features/category/components/category-groups-list";
import { CategorySubcategoriesView } from "@/features/category/components/category-subcategories-view";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
  groupSlug: string | null;
}

export function CategoryPage({ lang, dict, groupSlug }: IProps) {
  const activeGroup = groupSlug
    ? mobileCategoryGroups.find((g) => g.slug === groupSlug)
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
            />
            {activeGroup && (
              <CategoryDrillHeader lang={lang} title={activeGroup.name} />
            )}
          </div>

          <div className="mx-auto max-w-360 px-4 md:px-6">
            {activeGroup ? (
              <CategorySubcategoriesView lang={lang} group={activeGroup} />
            ) : (
              <CategoryGroupsList lang={lang} />
            )}
          </div>
        </div>
      </main>

      <Footer dict={dict} />
    </>
  );
}
