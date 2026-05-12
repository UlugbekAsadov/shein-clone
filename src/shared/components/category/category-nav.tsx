"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { navCategories } from "@/shared/mocks";
import type { locales } from "@/core/config/i18n/i18n-config";
import { CategoryMegaMenu } from "./category-mega-menu";
import { cn } from "@/lib/utils";
import { LayoutGridSolid } from "../icons/solid";
import { ChevronDownIcon } from "../icons/outline";

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
  const [open, setOpen] = useState(true);

  return (
    <div
      className="relative hidden md:block "
      onMouseLeave={() => setOpen(false)}
    >
      <div className="mx-auto flex max-w-360 items-center gap-6 px-6 pb-5">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          onMouseEnter={() => setOpen(true)}
          className={cn(
            "flex items-center gap-2 text-base font-medium",
          )}
          aria-expanded={open}
        >
          <LayoutGridSolid className="size-6" />
          {categoriesLabel}
          <ChevronDownIcon className="size-6" />
        </button>

        <nav className="flex flex-1 items-center gap-5.5 overflow-hidden">
          {navCategories.map((c) => (
            <Link
              key={c.id}
              href={`/${lang}/category/${c.slug}`}
              className={cn(
                "whitespace-nowrap font-medium transition-colors text-muted-foreground hover:text-foreground",
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
            className="grid size-8 place-items-center cursor-pointer"
          >
            <ChevronLeft className="size-6" />
          </button>
          <button
            type="button"
            aria-label="Scroll right"
            className="grid size-8 place-items-center cursor-pointer"
          >
            <ChevronRight className="size-6" />
          </button>
        </div>
      </div>

      <div
        aria-hidden={!open}
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-x-0 bottom-0 top-42.5 z-30 bg-black/50 transition-opacity duration-300 ease-out",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      <div
        aria-hidden={!open}
        className={cn(
          "absolute inset-x-0 top-full z-40 mx-auto max-w-360 px-6 transition-all duration-300 ease-out",
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
