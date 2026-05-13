"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  sidebarCategories,
  picksForYou,
  featuredCategories,
} from "@/shared/mocks";
import type { locales } from "@/core/config/i18n/i18n-config";
import { cn } from "@/lib/utils";
import { FilterChip } from "./filter-chip";
import { AltArrowRight, Sale, ShieldCheck, Tag } from "@solar-icons/react";
import { TruckIcon } from "../icons/solid";

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
    <div className="p-5">
      <div className="mb-6 flex items-center gap-2">
        <FilterChip
          icon={<Sale className="size-4.5" weight="Bold" />}
          label={filters.onSale}
          tone="rose"
        />
        <FilterChip
          icon={<TruckIcon className="size-4.5" />}
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
          {sidebarCategories.map((c) => (
            <li key={c.id}>
              <Link
                href={`/${lang}/category/${c.slug}`}
                onMouseEnter={() => setActiveId(c.id)}
                onFocus={() => setActiveId(c.id)}
                className={cn(
                  "flex w-full items-center justify-between rounded-sm px-4 py-3 text-left font-medium hover:bg-[#0201061A] cursor-pointer",
                  activeId === c.id && "bg-[#0201061A]",
                )}
              >
                <span>{c.name}</span>
                <AltArrowRight className="size-6 text-muted-foreground" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="px-5">
          <h3 className="mb-4 text-base font-bold">{picksTitle}</h3>
          <div className="grid grid-cols-8 gap-4">
            {picksForYou.map((item) => (
              <Link
                key={item.id}
                href={`/${lang}/category/${item.slug}`}
                className="flex flex-col items-center  gap-2.5 text-center cursor-pointer group relative"
              >
                <span
                  className={cn(
                    "relative size-20 rounded-full bg-muted overflow-hidden ring-3 ring-border",
                    item.badge && " ring-rose-500 ",
                  )}
                >
                  <Image
                    src={item.image ?? "/placeholders/category.svg"}
                    alt={item.name}
                    fill
                    quality={95}
                    sizes="80px"
                    className="object-contain p-2 pb-0 group-hover:scale-110 transition-transform"
                  />
                </span>
                {item.badge && (
                  <span className="absolute -right-1 -top-1 grid h-5 min-w-9 place-items-center rounded-full bg-rose-500 px-1.5 text-[10px] font-semibold text-white">
                    {item.badge}
                  </span>
                )}
                <span className="line-clamp-1 text-xs text-foreground">
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
        <div className="border-l border-border pl-5">
          <h3 className="mb-4 text-base font-bold">{featuredTitle}</h3>
          <div className="grid grid-cols-3 gap-x-3 gap-y-5">
            {featuredCategories.map((item) => (
              <Link
                key={item.id}
                href={`/${lang}/category/${item.slug}`}
                className="flex flex-col items-center  gap-2.5 text-center cursor-pointer group relative"
              >
                <span
                  className={cn(
                    "relative size-20 rounded-full bg-muted overflow-hidden ring-3 ring-border",
                    item.badge && " ring-rose-500 ",
                  )}
                >
                  <Image
                    src={item.image ?? "/placeholders/category.svg"}
                    alt={item.name}
                    fill
                    quality={95}
                    sizes="80px"
                    className="object-contain p-2 pb-0 group-hover:scale-110 transition-transform"
                  />
                </span>
                {item.badge && (
                  <span className="absolute -right-1 -top-1 grid h-5 min-w-9 place-items-center rounded-full bg-rose-500 px-1.5 text-[10px] font-semibold text-white">
                    {item.badge}
                  </span>
                )}
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
