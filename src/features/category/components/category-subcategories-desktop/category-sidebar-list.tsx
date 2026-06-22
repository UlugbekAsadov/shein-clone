import type { locales } from "@/core/config/i18n/i18n-config";
import type { ICategory } from "@/features/category/utils/category-group.interface";
import { CategorySidebarItem } from "./category-sidebar-item";
import { CategorySidebarBack } from "./category-sidebar-back";

interface IProps {
  lang: (typeof locales)[number];
  title: string;
  categories: ICategory[];
  parent: ICategory | null;
}

export function CategorySidebarList({ lang, categories, parent }: IProps) {
  return (
    <ul className="flex w-56 shrink-0 flex-col gap-3 border-r border-border pr-6">
      {parent && (
        <li className="mb-1">
          <CategorySidebarBack lang={lang} parent={parent} />
        </li>
      )}
      <div className="space-y-3 pl-7">
        {categories.map((category) => (
          <li key={category.slug}>
            <CategorySidebarItem lang={lang} category={category} />
          </li>
        ))}
      </div>
    </ul>
  );
}
