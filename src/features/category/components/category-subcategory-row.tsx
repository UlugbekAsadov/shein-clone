"use client";

import { useRouter } from "next/navigation";
import type { locales } from "@/core/config/i18n/i18n-config";
import type { ICategory } from "@/features/category/utils/category-group.interface";

interface IProps {
  lang: (typeof locales)[number];
  subgroup: ICategory;
}

export function CategorySubcategoryRow({ lang, subgroup }: IProps) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push(`/${lang}/category/${subgroup.slug}`)}
      className="flex w-full items-center justify-between py-2 text-left"
    >
      <span className="text-sm font-semibold text-foreground">
        {subgroup.title}
      </span>
    </button>
  );
}
