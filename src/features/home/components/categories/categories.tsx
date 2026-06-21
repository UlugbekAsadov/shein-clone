import type { locales } from "@/core/config/i18n/i18n-config";
import { getCategories } from "@/features/category/services/category.service";
import { CategoryRail } from "./category-rail";
import { CategoriesHeader } from "./categories-header";

interface IProps {
  lang: (typeof locales)[number];
  title: string;
  viewAllLabel: string;
}

export async function Categories({ lang, title, viewAllLabel }: IProps) {
  const items = await getCategories();

  return (
    <section className="mx-auto max-w-360 px-4 mt-4 md:px-6 md:py-3 md:pt-6">
      <CategoriesHeader title={title} />
      <CategoryRail lang={lang} items={items} />
    </section>
  );
}
