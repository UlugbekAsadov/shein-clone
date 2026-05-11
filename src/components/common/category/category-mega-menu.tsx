"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BadgeCheck, ChevronRight, Sparkles, Tag, Truck } from "lucide-react";
import {
  sidebarCategories,
  picksForYou,
  featuredCategories,
} from "@/lib/mock-data";
import type { locales } from "@/lib/i18n-config";
import { cn } from "@/lib/utils";
import { FilterChip } from "./filter-chip";

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
}

export function CategoryMegaMenu({
  lang,
  picksTitle,
  featuredTitle,
  filters,
}: IProps) {
  const [activeId, setActiveId] = useState("men-clothing");

  return (
    <div className="p-6">
      <div className="mb-5 flex items-center gap-2">
        <FilterChip
          icon={<Tag className="size-3.5" />}
          label={filters.onSale}
          tone="rose"
        />
        <FilterChip
          icon={<Truck className="size-3.5" />}
          label={filters.freeDelivery}
          tone="emerald"
        />
        <FilterChip
          icon={<BadgeCheck className="size-3.5" />}
          label={filters.original}
          tone="blue"
        />
        <FilterChip
          icon={<Sparkles className="size-3.5" />}
          label={filters.new}
          tone="amber"
        />
      </div>

      <div className="grid grid-cols-[260px_1fr_300px] gap-6">
        <ul className="flex flex-col">
          {sidebarCategories.map((c) => (
            <li key={c.id}>
              <Link
                href={`/${lang}/category/${c.slug}`}
                onMouseEnter={() => setActiveId(c.id)}
                onFocus={() => setActiveId(c.id)}
                className={cn(
                  "flex w-full items-center justify-between rounded-sm px-4 py-3 text-left text-[15px] font-medium hover:bg-muted cursor-pointer",
                  activeId === c.id && "bg-muted",
                )}
              >
                <span>{c.name}</span>
                <ChevronRight className="size-4 text-muted-foreground" />
              </Link>
            </li>
          ))}
        </ul>

        <div>
          <h3 className="mb-4 text-base font-bold">{picksTitle}</h3>
          <div className="grid grid-cols-8 gap-x-3 gap-y-5">
            {picksForYou.map((item) => (
              <Link
                key={item.id}
                href={`/${lang}/category/${item.slug}`}
                className="flex flex-col items-center gap-2 text-center cursor-pointer"
              >
                <span className="relative size-16 overflow-hidden rounded-full bg-muted">
                  <Image
                    src={item.image ?? "/placeholders/category.svg"}
                    alt={item.name}
                    fill
                    quality={95}
                    sizes="64px"
                    className="object-cover"
                  />
                </span>
                <span className="line-clamp-1 text-xs text-foreground">
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-base font-bold">{featuredTitle}</h3>
          <div className="grid grid-cols-3 gap-x-3 gap-y-5">
            {featuredCategories.map((item) => (
              <Link
                key={item.id}
                href={`/${lang}/category/${item.slug}`}
                className="flex flex-col items-center gap-2 text-center cursor-pointer"
              >
                <span
                  className={cn(
                    "relative size-16 overflow-hidden rounded-full bg-muted",
                    item.badge && "ring-2 ring-rose-500 ring-offset-2",
                  )}
                >
                  <Image
                    src={item.image ?? "/placeholders/category.svg"}
                    alt={item.name}
                    fill
                    quality={95}
                    sizes="64px"
                    className="object-cover"
                  />
                  {item.badge && (
                    <span className="absolute -right-1 -top-1 grid h-5 min-w-9 place-items-center rounded-full bg-rose-500 px-1.5 text-[10px] font-semibold text-white">
                      {item.badge}
                    </span>
                  )}
                </span>
                <span className="line-clamp-1 text-xs text-foreground">
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
