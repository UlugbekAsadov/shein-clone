"use client";

import type { locales } from "@/core/config/i18n/i18n-config";
import type { ICategory } from "@/features/category/utils/category-group.interface";
import { CategorySubcategoryRow } from "./category-subcategory-row";

interface IProps {
  lang: (typeof locales)[number];
  group: ICategory;
}

export function CategorySubcategoriesView({ lang, group }: IProps) {
  return (
    <ul className="flex flex-col divide-y divide-border/0 pl-10">
      {group.children.map((subgroup) => (
        <li key={subgroup.slug}>
          <CategorySubcategoryRow lang={lang} subgroup={subgroup} />
        </li>
      ))}
    </ul>
  );
}
