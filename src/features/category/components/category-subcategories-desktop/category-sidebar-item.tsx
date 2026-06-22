"use client";

import type { locales } from "@/core/config/i18n/i18n-config";
import type { ICategory } from "@/features/category/utils/category-group.interface";
import { useCategoryNavigation } from "@/features/category/hooks/use-category-navigation";

interface IProps {
  lang: (typeof locales)[number];
  category: ICategory;
}

export function CategorySidebarItem({ lang, category }: IProps) {
  const navigate = useCategoryNavigation(lang);

  return (
    <button
      type="button"
      onClick={() => navigate(category)}
      className="flex w-full items-center justify-between gap-3 text-left text-secondary-foreground hover:text-primary transition-colors cursor-pointer"
    >
      <span className="line-clamp-1 font-medium">{category.title}</span>
    </button>
  );
}
