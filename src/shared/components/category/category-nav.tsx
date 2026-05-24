"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { navCategories } from "@/shared/mocks";
import type { locales } from "@/core/config/i18n/i18n-config";
import { CategoryMegaMenu } from "./category-mega-menu";
import { cn } from "@/lib/utils";
import { LayoutGridSolid } from "../icons/solid";
import { AltArrowDown, AltArrowLeft, AltArrowRight } from "@solar-icons/react";

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
  const [activeId, setActiveId] = useState(
    navCategories[0]?.id ?? "",
  );
  const scrollRef = useRef<HTMLElement>(null);

  const scrollBy = (direction: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
  };

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
          className={cn("flex items-center gap-2 text-base font-medium")}
          aria-expanded={open}
        >
          <LayoutGridSolid className="size-6" />
          {categoriesLabel}
          <AltArrowDown className="size-6" />
        </button>

        <nav
          ref={scrollRef}
          className="flex flex-1 items-center gap-5.5 overflow-x-auto scroll-smooth scrollbar-hidden"
        >
          {navCategories.map((c) => (
            <Link
              key={c.id}
              href={`/${lang}/category/${c.slug}`}
              onMouseEnter={() => {
                setOpen(true);
                setActiveId(c.id);
              }}
              onFocus={() => {
                setOpen(true);
                setActiveId(c.id);
              }}
              className={cn(
                "whitespace-nowrap font-medium transition-colors text-muted-foreground hover:text-foreground",
              )}
            >
              {c.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            aria-label="Scroll left"
            onClick={() => scrollBy(-1)}
            className="grid size-8 place-items-center cursor-pointer"
          >
            <AltArrowLeft className="size-6" />
          </button>
          <button
            type="button"
            aria-label="Scroll right"
            onClick={() => scrollBy(1)}
            className="grid size-8 place-items-center cursor-pointer"
          >
            <AltArrowRight className="size-6" />
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
            activeId={activeId}
            onActiveChange={setActiveId}
          />
        </div>
      </div>
    </div>
  );
}
