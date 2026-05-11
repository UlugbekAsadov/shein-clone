"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
} from "lucide-react";
import { navCategories } from "@/lib/mock-data";
import type { locales } from "@/lib/i18n-config";
import { CategoryMegaMenu } from "./category-mega-menu";
import { cn } from "@/lib/utils";

interface IProps {
  lang: (typeof locales)[number];
  categoriesLabel: string;
  picksTitle: string;
  featuredTitle: string;
  filters: {
    onSale: string;
    freeDelivery: string;
    original: string;
    new: string;
  };
}

export function CategoryNav({
  lang,
  categoriesLabel,
  picksTitle,
  featuredTitle,
  filters,
}: IProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative border-b border-border bg-background"
      onMouseLeave={() => setOpen(false)}
    >
      <div className="mx-auto flex h-14 max-w-[1440px] items-center gap-6 px-6">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          onMouseEnter={() => setOpen(true)}
          className={cn(
            "flex items-center gap-2 rounded-lg px-2 py-1.5 text-[15px] font-semibold hover:bg-muted",
            open && "bg-muted",
          )}
          aria-expanded={open}
        >
          <LayoutGrid className="size-4" />
          {categoriesLabel}
          <ChevronDown className="size-4" />
        </button>

        <nav className="flex flex-1 items-center gap-7 overflow-hidden">
          {navCategories.map((c, idx) => (
            <Link
              key={c.id}
              href={`/${lang}/category/${c.slug}`}
              className={cn(
                "whitespace-nowrap text-[15px] transition-colors hover:text-foreground",
                idx === 0 ? "font-medium text-foreground" : "text-muted-foreground",
              )}
            >
              {c.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Scroll left"
            className="grid size-8 place-items-center rounded-full hover:bg-muted"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Scroll right"
            className="grid size-8 place-items-center rounded-full hover:bg-muted"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      <div
        aria-hidden={!open}
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-x-0 bottom-0 top-[137px] z-30 bg-black/50 transition-opacity duration-300 ease-out",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      <div
        aria-hidden={!open}
        className={cn(
          "absolute inset-x-0 top-full z-40 mx-auto max-w-[1440px] px-6 transition-all duration-300 ease-out",
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-3 opacity-0",
        )}
      >
        <div className="origin-top overflow-hidden rounded-b-2xl border border-border bg-background shadow-2xl">
          <CategoryMegaMenu
            lang={lang}
            picksTitle={picksTitle}
            featuredTitle={featuredTitle}
            filters={filters}
          />
        </div>
      </div>
    </div>
  );
}
