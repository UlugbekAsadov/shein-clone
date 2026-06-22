import Link from "next/link";
import { AltArrowLeft } from "@solar-icons/react";
import type { locales } from "@/core/config/i18n/i18n-config";
import type { ICategory } from "@/features/category/utils/category-group.interface";

interface IProps {
  lang: (typeof locales)[number];
  parent: ICategory;
}

export function CategorySidebarBack({ lang, parent }: IProps) {
  return (
    <Link
      href={`/${lang}/demo/category?group=${parent.slug}`}
      className="flex items-center gap-2 font-medium text-foreground transition-colors hover:text-primary"
    >
      <AltArrowLeft className="size-5" />
      <span className="line-clamp-1">{parent.title}</span>
    </Link>
  );
}
