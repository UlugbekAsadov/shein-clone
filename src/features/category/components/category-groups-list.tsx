"use client";

import { useRouter } from "next/navigation";
import type { locales } from "@/core/config/i18n/i18n-config";
import type { ICategory } from "@/features/category/utils/category-group.interface";
import { CategoryGroupRow } from "./category-group-row";

interface IProps {
  lang: (typeof locales)[number];
  categories: ICategory[];
}

export function CategoryGroupsList({ lang, categories }: IProps) {
  const router = useRouter();

  const handleClick = (group: ICategory) => {
    if (group.children.length > 0) {
      router.push(`/${lang}/category?group=${group.slug}`);
      return;
    }
    router.push(`/${lang}/category/${group.slug}`);
  };

  return (
    <ul className="flex flex-col gap-1">
      {categories.map((group) => (
        <li key={group.slug}>
          <CategoryGroupRow group={group} onClick={handleClick} />
        </li>
      ))}
    </ul>
  );
}
