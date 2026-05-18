import type { locales } from "@/core/config/i18n/i18n-config";
import { MobileSearchBar } from "@/shared/components/header/mobile-search-bar";
import { mobileCategoryGroups } from "@/features/category/mocks/category-groups.mocks";
import { CategoryGroupsList } from "./category-groups-list";
import { CategoryDrillHeader } from "./category-drill-header";
import { CategorySubcategoriesView } from "./category-subcategories-view";

interface IProps {
  lang: (typeof locales)[number];
  groupSlug: string | null;
  searchPlaceholder: string;
}

export function CategoryPage({ lang, groupSlug, searchPlaceholder }: IProps) {
  const activeGroup = groupSlug
    ? mobileCategoryGroups.find((g) => g.slug === groupSlug)
    : null;

  return (
    <div className="pb-6">
      <div className="sticky top-0 z-30 bg-background pt-3 md:pt-4">
        <MobileSearchBar lang={lang} placeholder={searchPlaceholder} />
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
  );
}
