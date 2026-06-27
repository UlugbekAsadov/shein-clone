"use client";

import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { Header } from "@/shared/components/header/header";
import { Footer } from "@/shared/components/footer/footer";
import { MobileSearchBar } from "@/shared/components/header/mobile-search-bar";
import { useCategories } from "@/features/category/hooks/use-categories";
import {
  findCategoryByKey,
  findCategoryTrail,
} from "@/features/category/utils/category-tree.utils";
import { CategoryDrillHeader } from "@/features/category/components/category-drill-header";
import { CategoryGroupsList } from "@/features/category/components/category-groups-list";
import { CategoryGroupsListSkeleton } from "@/features/category/components/category-groups-list-skeleton";
import { CategorySubcategoriesView } from "@/features/category/components/category-subcategories-view";
import { CategorySubcategoriesDesktop } from "@/features/category/components/category-subcategories-desktop/category-subcategories-desktop";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
  groupSlug: string | null;
}

export function CategoryPage({ lang, dict, groupSlug }: IProps) {
  const { data: categories = [], isPending } = useCategories();

  const activeGroup = groupSlug
    ? findCategoryByKey(categories, groupSlug)
    : null;
  const trail = activeGroup
    ? (findCategoryTrail(categories, activeGroup.slug) ?? [])
    : [];
  const parent = trail.length > 1 ? trail[trail.length - 2] : null;
  const backHref = parent
    ? `/${lang}/demo/category?group=${parent.slug}`
    : `/${lang}/demo/category`;

  return (
    <>
      <Header lang={lang} dict={dict} />

      <main className="flex-1">
        <div className="pb-6 h-full">
          <div className="sticky top-0 z-30 bg-background pt-3 md:hidden">
            <MobileSearchBar
              lang={lang}
              placeholder={dict.header.searchPlaceholder}
              visualSearchDict={dict.visualSearch}
            />
            {activeGroup && (
              <CategoryDrillHeader title={activeGroup.title} backHref={backHref} />
            )}
          </div>

          <div className="mx-auto max-w-360 px-4 md:px-6 h-full">
            {isPending ? (
              <CategoryGroupsListSkeleton />
            ) : activeGroup ? (
              <>
                <div className="md:hidden">
                  <CategorySubcategoriesView lang={lang} group={activeGroup} />
                </div>
                <div className="hidden md:block h-full">
                  <CategorySubcategoriesDesktop
                    lang={lang}
                    homeLabel={dict.breadcrumb.home}
                    group={activeGroup}
                    trail={trail}
                  />
                </div>
              </>
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
