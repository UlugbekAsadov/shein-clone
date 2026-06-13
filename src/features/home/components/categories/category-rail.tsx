"use client";

import type { ICategory } from "@/types/category.interface";
import type { locales } from "@/core/config/i18n/i18n-config";
import { cn } from "@/lib/utils";
import { useScrollEdges } from "@/features/home/hooks/use-scroll-edges";
import { CategoryCard } from "./category-card";

interface IProps {
  lang: (typeof locales)[number];
  items: ICategory[];
}

export function CategoryRail({ lang, items }: IProps) {
  const { ref, atStart, atEnd } = useScrollEdges<HTMLDivElement>();

  return (
    <div className="relative">
      <div
        ref={ref}
        className="flex gap-4 overflow-x-auto p-2 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <CategoryCard key={item.id} lang={lang} category={item} />
        ))}
      </div>
      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 left-0 w-12 bg-linear-to-r from-background to-transparent transition-opacity duration-200",
          atStart && "opacity-0",
        )}
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 right-0 w-12 bg-linear-to-l from-background to-transparent transition-opacity duration-200",
          atEnd && "opacity-0",
        )}
      />
    </div>
  );
}
