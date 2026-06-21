import Image from "next/image";
import Link from "next/link";
import type { ICategory } from "@/features/category/utils/category-group.interface";
import type { locales } from "@/core/config/i18n/i18n-config";
import { cn } from "@/lib/utils";

interface IProps {
  lang: (typeof locales)[number];
  category: ICategory;
}

export function CategoryCard({ lang, category }: IProps) {
  return (
    <Link
      href={`/${lang}/demo/products?category_ids=${category.id}`}
      className="group relative flex w-15 shrink-0 cursor-pointer flex-col items-center gap-2.5 text-center md:w-30"
    >
      <span
        className={cn(
          "relative size-15 md:size-30 overflow-hidden rounded-full bg-muted ring-2 md:ring-3 ring-border",
        )}
      >
        <Image
          src={category.image_url ?? "/placeholders/category.svg"}
          alt={category.title}
          fill
          quality={95}
          sizes="120px"
          className="object-cover transition-transform group-hover:scale-110"
        />
      </span>
      <span className="text-xs md:text-base line-clamp-1 font-medium text-foreground">
        {category.title}
      </span>
    </Link>
  );
}
