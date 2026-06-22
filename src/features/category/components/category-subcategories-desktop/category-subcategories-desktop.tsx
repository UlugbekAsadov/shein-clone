import type { locales } from "@/core/config/i18n/i18n-config";
import type { ICategory } from "@/features/category/utils/category-group.interface";
import { getSubcategoryTiles } from "@/features/category/utils/category-tree.utils";
import { CategoryBreadcrumb } from "./category-breadcrumb";
import { CategorySidebarList } from "./category-sidebar-list";
import { CategoryTileGrid } from "./category-tile-grid";

interface IProps {
  lang: (typeof locales)[number];
  homeLabel: string;
  group: ICategory;
  trail: ICategory[];
}

export function CategorySubcategoriesDesktop({
  lang,
  homeLabel,
  group,
  trail,
}: IProps) {
  const tiles = getSubcategoryTiles(group);

  return (
    <div className="py-6 h-full">
      <CategoryBreadcrumb lang={lang} homeLabel={homeLabel} trail={trail} />

      <h1 className="mt-4 mb-6 text-2xl font-bold text-foreground">
        {group.title}
      </h1>

      <div className="flex gap-8">
        <CategorySidebarList lang={lang} categories={group.children} />
        <CategoryTileGrid lang={lang} categories={tiles} />
      </div>
    </div>
  );
}
