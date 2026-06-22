import type { locales } from "@/core/config/i18n/i18n-config";
import type { ICategory } from "@/features/category/utils/category-group.interface";

export function getCategoryHref(
  lang: (typeof locales)[number],
  category: ICategory,
): string {
  if (category.children.length > 0) {
    return `/${lang}/demo/category?group=${category.slug}`;
  }
  return `/${lang}/demo/products?category_ids=${category.id}`;
}

export function findCategoryBySlug(
  categories: ICategory[],
  slug: string,
): ICategory | null {
  for (const category of categories) {
    if (category.slug === slug) return category;
    const found = findCategoryBySlug(category.children, slug);
    if (found) return found;
  }
  return null;
}

export function findCategoryById(
  categories: ICategory[],
  id: number,
): ICategory | null {
  for (const category of categories) {
    if (category.id === id) return category;
    const found = findCategoryById(category.children, id);
    if (found) return found;
  }
  return null;
}

export function findCategoryByKey(
  categories: ICategory[],
  key: string,
): ICategory | null {
  const bySlug = findCategoryBySlug(categories, key);
  if (bySlug) return bySlug;
  const id = Number(key);
  return Number.isInteger(id) ? findCategoryById(categories, id) : null;
}

export function findCategoryTrail(
  categories: ICategory[],
  slug: string,
  trail: ICategory[] = [],
): ICategory[] | null {
  for (const category of categories) {
    const next = [...trail, category];
    if (category.slug === slug) return next;
    const found = findCategoryTrail(category.children, slug, next);
    if (found) return found;
  }
  return null;
}

export function getSubcategoryTiles(group: ICategory): ICategory[] {
  return group.children.flatMap((child) =>
    child.children.length > 0 ? child.children : [child],
  );
}
