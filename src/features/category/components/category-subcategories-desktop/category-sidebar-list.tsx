import type { locales } from "@/core/config/i18n/i18n-config";
import type { ICategory } from "@/features/category/utils/category-group.interface";
import { CategorySidebarItem } from "./category-sidebar-item";

interface IProps {
  lang: (typeof locales)[number];
  categories: ICategory[];
}

export function CategorySidebarList({ lang, categories }: IProps) {
  return (
    <ul className="flex w-56 shrink-0 flex-col border-r border-border pr-6 gap-3">
      {categories.map((category) => (
        <li key={category.slug}>
          <CategorySidebarItem lang={lang} category={category} />
        </li>
      ))}
    </ul>
  );
}
