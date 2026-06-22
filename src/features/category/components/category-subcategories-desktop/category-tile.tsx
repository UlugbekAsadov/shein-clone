"use client";

import Image from "next/image";
import type { locales } from "@/core/config/i18n/i18n-config";
import type { ICategory } from "@/features/category/utils/category-group.interface";
import { useCategoryNavigation } from "@/features/category/hooks/use-category-navigation";

interface IProps {
  lang: (typeof locales)[number];
  category: ICategory;
}

export function CategoryTile({ lang, category }: IProps) {
  const navigate = useCategoryNavigation(lang);

  return (
    <button
      type="button"
      onClick={() => navigate(category)}
      className="group flex flex-col items-center gap-2.5 text-center cursor-pointer h-fit"
    >
      <span className="relative size-20 overflow-hidden rounded-full bg-muted ring-3 ring-border">
        <Image
          src={category.image_url ?? "/placeholders/category.svg"}
          alt={category.title}
          fill
          quality={95}
          sizes="80px"
          className="object-cover transition-transform group-hover:scale-110"
        />
      </span>
      <span className="line-clamp-1 text-xs font-medium text-foreground group-hover:underline">
        {category.title}
      </span>
    </button>
  );
}
