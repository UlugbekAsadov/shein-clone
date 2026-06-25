"use client";

import Image from "next/image";
import Link from "next/link";
import type { locales } from "@/core/config/i18n/i18n-config";
import type { ICategory } from "@/features/category/utils/category-group.interface";
import { getCategoryHref } from "@/features/category/utils/category-tree.utils";
import { cn } from "@/lib/utils";
import { AltArrowRight } from "@solar-icons/react";

interface IProps {
  lang: (typeof locales)[number];
  picksTitle: string;
  featuredTitle: string;
  filters: {
    onSale: string;
    freeDelivery: string;
    original: string;
    new: string;
  };
  activeSlug: string;
  onActiveChange: (slug: string) => void;
  categories: ICategory[];
}

export function CategoryMegaMenu({
  lang,
  picksTitle,
  featuredTitle,
  activeSlug,
  onActiveChange,
  categories,
}: IProps) {
  const activeCategory = categories.find((c) => c.slug === activeSlug);

  return (
    <div className="flex max-h-[70vh] flex-col p-5">
      <div className="grid min-h-0 flex-1 grid-cols-[260px_1fr_300px]">
        <ul className="flex min-h-0 flex-col overflow-y-auto border-r border-border pr-5 scrollbar-hidden">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link
                href={getCategoryHref(lang, c)}
                onMouseEnter={() => onActiveChange(c.slug)}
                onFocus={() => onActiveChange(c.slug)}
                className={cn(
                  "flex w-full items-center justify-between rounded-sm px-5 py-4 text-left font-medium hover:bg-[#0201061A] cursor-pointer",
                  activeSlug === c.slug && "bg-[#0201061A]",
                )}
              >
                <span className="line-clamp-1">{c.title}</span>
                <AltArrowRight className="size-6 min-w-6 text-muted-foreground" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="min-h-0 overflow-y-auto px-5 scrollbar-hidden">
          <h3 className="sticky top-0 mb-4 bg-background text-base font-bold">
            {picksTitle}
          </h3>
          <div className="flex flex-wrap gap-4">
            {activeCategory?.children?.map((item) => (
              <Link
                key={item.slug}
                href={getCategoryHref(lang, item)}
                className="flex flex-col items-center gap-2.5 text-center cursor-pointer group relative"
              >
                <span className="relative size-20 rounded-[36px] bg-muted overflow-hidden ring-3 ring-border">
                  <Image
                    src={item.image_url ?? "/placeholders/category.svg"}
                    alt={item.title}
                    fill
                    quality={95}
                    sizes="80px"
                    className="object-cover group-hover:scale-110 transition-transform"
                  />
                </span>
                <span className="line-clamp-1 text-xs text-foreground">
                  {item.title}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="min-h-0 overflow-y-auto border-l border-border pl-5 scrollbar-hidden">
          <h3 className="sticky top-0 mb-4 bg-background text-base font-bold">
            {featuredTitle}
          </h3>
          <div className="grid grid-cols-3 gap-x-3 gap-y-5">
            {categories.map((item) => (
              <Link
                key={item.slug}
                href={getCategoryHref(lang, item)}
                className="flex flex-col items-center gap-2.5 text-center cursor-pointer group relative"
              >
                <span className="relative size-20 rounded-[36px] bg-muted overflow-hidden ring-3 ring-border">
                  <Image
                    src={item.image_url ?? "/placeholders/category.svg"}
                    alt={item.title}
                    fill
                    quality={95}
                    sizes="80px"
                    className="object-cover group-hover:scale-110 transition-transform"
                  />
                </span>
                <span className="line-clamp-1 text-xs text-foreground">
                  {item.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
