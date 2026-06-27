"use client";

import type { locales } from "@/core/config/i18n/i18n-config";
import { useCategories } from "@/features/category/hooks/use-categories";
import { CategoryRail } from "./category-rail";
import { CategoryRailSkeleton } from "./category-rail-skeleton";
import { CategoriesHeader } from "./categories-header";

interface IProps {
  lang: (typeof locales)[number];
  title: string;
  viewAllLabel: string;
}

export function Categories({ lang, title, viewAllLabel }: IProps) {
  const { data: items = [], isPending } = useCategories();

  return (
    <section className="mx-auto max-w-360 px-4 mt-4 md:px-6 md:py-3 md:pt-6">
      <CategoriesHeader title={title} />
      {isPending ? (
        <CategoryRailSkeleton />
      ) : (
        <CategoryRail lang={lang} items={items} />
      )}
    </section>
  );
}
