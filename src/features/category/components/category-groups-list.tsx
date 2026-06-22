"use client";

import type { locales } from "@/core/config/i18n/i18n-config";
import type { ICategory } from "@/features/category/utils/category-group.interface";
import { useCategoryNavigation } from "@/features/category/hooks/use-category-navigation";
import { CategoryGroupRow } from "./category-group-row";

interface IProps {
  lang: (typeof locales)[number];
  categories: ICategory[];
}

export function CategoryGroupsList({ lang, categories }: IProps) {
  const navigate = useCategoryNavigation(lang);

  return (
    <ul className="flex flex-col gap-1">
      {categories.map((group) => (
        <li key={group.slug}>
          <CategoryGroupRow group={group} onClick={navigate} />
        </li>
      ))}
    </ul>
  );
}
