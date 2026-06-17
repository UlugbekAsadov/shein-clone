"use client";

import Image from "next/image";
import Link from "next/link";
import type { locales } from "@/core/config/i18n/i18n-config";
import type { ICategory } from "@/features/category/utils/category-group.interface";
import { cn } from "@/lib/utils";
import { FilterChip } from "./filter-chip";
import { AltArrowRight, Sale, ShieldCheck, Tag } from "@solar-icons/react";
import { TruckIconSolid } from "../icons/solid";

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
  filters,
  activeSlug,
  onActiveChange,
  categories,
}: IProps) {
  const activeCategory = categories.find((c) => c.slug === activeSlug);

  return (
    <div className="p-5">
      <div className="mb-6 flex items-center gap-2">
        <FilterChip
          icon={<Sale className="size-4.5" weight="Bold" />}
          label={filters.onSale}
          tone="rose"
        />
        <FilterChip
          icon={<TruckIconSolid className="size-4.5" fill="#21BE65" />}
          label={filters.freeDelivery}
          tone="emerald"
        />
        <FilterChip
          icon={<ShieldCheck className="size-4.5" weight="Bold" />}
          label={filters.original}
          tone="blue"
        />
        <FilterChip
          icon={<Tag className="size-4.5" weight="Bold" />}
          label={filters.new}
          tone="amber"
        />
      </div>

      <div className="grid grid-cols-[260px_1fr_300px]">
        <ul className="flex flex-col border-r border-border pr-5">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/${lang}/demo/products?category_ids=${c.id}`}
                onMouseEnter={() => onActiveChange(c.slug)}
                onFocus={() => onActiveChange(c.slug)}
                className={cn(
                  "flex w-full items-center justify-between rounded-sm px-4 py-3 text-left font-medium hover:bg-[#0201061A] cursor-pointer",
                  activeSlug === c.slug && "bg-[#0201061A]",
                )}
              >
                <span className="line-clamp-1">{c.title}</span>
                <AltArrowRight className="size-6 min-w-6 text-muted-foreground" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="px-5">
          <h3 className="mb-4 text-base font-bold">{picksTitle}</h3>
          <div className="grid grid-cols-8 gap-4">
            {activeCategory?.children?.map((item) => (
              <Link
                key={item.slug}
                href={`/${lang}/demo/products?category_ids=${item.id}`}
                className="flex flex-col items-center gap-2.5 text-center cursor-pointer group relative"
              >
                <span className="relative size-20 rounded-full bg-muted overflow-hidden ring-3 ring-border">
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

        <div className="border-l border-border pl-5">
          <h3 className="mb-4 text-base font-bold">{featuredTitle}</h3>
          <div className="grid grid-cols-3 gap-x-3 gap-y-5">
            {categories.map((item) => (
              <Link
                key={item.slug}
                href={`/${lang}/demo/products?category_ids=${item.id}`}
                className="flex flex-col items-center gap-2.5 text-center cursor-pointer group relative"
              >
                <span className="relative size-20 rounded-full bg-muted overflow-hidden ring-3 ring-border">
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
