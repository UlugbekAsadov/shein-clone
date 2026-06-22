"use client";

import { useRouter } from "next/navigation";
import type { locales } from "@/core/config/i18n/i18n-config";
import type { ICategory } from "@/features/category/utils/category-group.interface";
import { getCategoryHref } from "@/features/category/utils/category-tree.utils";

export function useCategoryNavigation(lang: (typeof locales)[number]) {
  const router = useRouter();

  return (category: ICategory) => {
    router.push(getCategoryHref(lang, category));
  };
}
