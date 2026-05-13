import Image from "next/image";
import Link from "next/link";
import type { ICategory } from "@/types/category.interface";
import type { locales } from "@/core/config/i18n/i18n-config";
import { cn } from "@/lib/utils";

interface IProps {
  lang: (typeof locales)[number];
  category: ICategory;
}

export function CategoryCard({ lang, category }: IProps) {
  return (
    <Link
      href={`/${lang}/category/${category.slug}`}
      className="group relative flex shrink-0 cursor-pointer flex-col items-center gap-2.5 text-center"
    >
      <span
        className={cn(
          "relative size-30 overflow-hidden rounded-full bg-muted ring-3 ring-border",
        )}
      >
        <Image
          src={category.image ?? "/placeholders/category.svg"}
          alt={category.name}
          fill
          quality={95}
          sizes="120px"
          className="object-contain p-2 pb-0 transition-transform group-hover:scale-110"
        />
      </span>
      {category.badge && (
        <span className="absolute -right-1 -top-1 grid h-6.75 min-w-10 place-items-center rounded-full bg-rose-500 px-1.5 text-xs font-bold text-white">
          {category.badge}
        </span>
      )}
      <span className="line-clamp-1 font-medium text-foreground">
        {category.name}
      </span>
    </Link>
  );
}
