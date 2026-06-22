import Link from "next/link";
import type { locales } from "@/core/config/i18n/i18n-config";
import type { ICategory } from "@/features/category/utils/category-group.interface";

interface IProps {
  lang: (typeof locales)[number];
  homeLabel: string;
  trail: ICategory[];
}

export function CategoryBreadcrumb({ lang, homeLabel, trail }: IProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm font-medium text-muted-foreground">
        <li className="flex items-center gap-1.5">
          <Link
            href={`/${lang}/demo`}
            className="transition-colors hover:text-foreground"
          >
            {homeLabel}
          </Link>
          <span aria-hidden>/</span>
        </li>
        {trail.map((category, index) => {
          const isLast = index === trail.length - 1;
          return (
            <li key={category.slug} className="flex items-center gap-1.5">
              {isLast ? (
                <span className="text-foreground">{category.title}</span>
              ) : (
                <Link
                  href={`/${lang}/demo/category?group=${category.slug}`}
                  className="transition-colors hover:text-foreground"
                >
                  {category.title}
                </Link>
              )}
              {!isLast && <span aria-hidden>/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
