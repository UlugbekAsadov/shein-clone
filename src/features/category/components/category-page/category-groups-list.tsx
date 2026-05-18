"use client";

import { useRouter } from "next/navigation";
import type { locales } from "@/core/config/i18n/i18n-config";
import type { IMobileCategoryGroup } from "@/features/category/interfaces/category-group.interface";
import { mobileCategoryGroups } from "@/features/category/mocks/category-groups.mocks";
import { CategoryGroupRow } from "./category-group-row";

interface IProps {
  lang: (typeof locales)[number];
}

export function CategoryGroupsList({ lang }: IProps) {
  const router = useRouter();

  const handleClick = (group: IMobileCategoryGroup) => {
    if (group.children && group.children.length > 0) {
      router.push(`/${lang}/category?group=${group.slug}`);
      return;
    }
    router.push(`/${lang}/category/${group.slug}`);
  };

  return (
    <ul className="flex flex-col gap-1">
      {mobileCategoryGroups.map((group) => (
        <li key={group.id}>
          <CategoryGroupRow group={group} onClick={handleClick} />
        </li>
      ))}
    </ul>
  );
}
