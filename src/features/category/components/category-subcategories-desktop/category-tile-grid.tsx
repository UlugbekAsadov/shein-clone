import type { locales } from "@/core/config/i18n/i18n-config";
import type { ICategory } from "@/features/category/utils/category-group.interface";
import { CategoryTile } from "./category-tile";

interface IProps {
  lang: (typeof locales)[number];
  categories: ICategory[];
}

export function CategoryTileGrid({ lang, categories }: IProps) {
  return (
    <div className=" flex-1 flex flex-wrap gap-4 h-fit">
      {categories.map((category, index) => (
        <CategoryTile
          key={`${category.slug}-${index}`}
          lang={lang}
          category={category}
        />
      ))}
    </div>
  );
}
