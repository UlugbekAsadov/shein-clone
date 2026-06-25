import Link from "next/link";
import type { ICategory } from "@/features/category/utils/category-group.interface";
import { getCategoryHref } from "@/features/category/utils/category-tree.utils";
import type { locales } from "@/core/config/i18n/i18n-config";
import { CategorySquircle } from "@/shared/components/category/category-squircle";

interface IProps {
  lang: (typeof locales)[number];
  category: ICategory;
}

export function CategoryCard({ lang, category }: IProps) {
  return (
    <Link
      href={getCategoryHref(lang, category)}
      className="group relative flex w-15 group shrink-0 cursor-pointer flex-col items-center gap-2.5 text-center md:w-30"
    >
      <CategorySquircle
        src={category.image_url ?? "/placeholders/category.svg"}
        alt={category.title}
        sizes="120px"
        className="size-15 md:size-30"
        ringClassName="inset-[2px] md:inset-[3px]"
        imageClassName="transition-transform group-hover:scale-110"
      />
      <span className="text-xs md:text-base line-clamp-1 font-medium text-foreground">
        {category.title}
      </span>
    </Link>
  );
}
