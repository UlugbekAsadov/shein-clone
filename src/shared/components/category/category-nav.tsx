"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import type { locales } from "@/core/config/i18n/i18n-config";
import type { ICategory } from "@/features/category/utils/category-group.interface";
import { getCategoryHref } from "@/features/category/utils/category-tree.utils";
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
  categories: ICategory[];
}

export function CategoryNav({
  lang,
  categoriesLabel,
  picksTitle,
  featuredTitle,
  filters,
  categories,
}: IProps) {
  const [open, setOpen] = useState(false);
  const [activeSlug, setActiveSlug] = useState(categories[0]?.slug ?? "");
  const scrollRef = useRef<HTMLElement>(null);
  const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelScheduledOpen = () => {
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
  };

  const scheduleOpen = () => {
    cancelScheduledOpen();
    openTimerRef.current = setTimeout(() => setOpen(true), 300);
  };

  const closeMenu = () => {
    cancelScheduledOpen();
    setOpen(false);
  };

  const scrollBy = (direction: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div
      className="relative hidden md:block"
      onMouseLeave={closeMenu}
    >
      <div className="flex w-screen items-center gap-6 px-6 pb-2">
        <button
          type="button"
          onClick={() => {
            cancelScheduledOpen();
            setOpen((v) => !v);
          }}
          onMouseEnter={scheduleOpen}
          className={cn(
            "flex items-center gap-2 text-sm font-medium text-white",
          )}
          aria-expanded={open}
        >
          <LayoutGridSolid className="size-5 fill-white" />
          {categoriesLabel}
          <AltArrowDown className="size-5" />
        </button>

        <nav
          ref={scrollRef}
          className="flex flex-1 items-center gap-5.5 overflow-x-auto scroll-smooth scrollbar-hidden"
        >
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={getCategoryHref(lang, c)}
              onMouseEnter={() => {
                scheduleOpen();
                setActiveSlug(c.slug);
              }}
              onFocus={() => {
                setOpen(true);
                setActiveSlug(c.slug);
              }}
              className="whitespace-nowrap text-sm font-medium transition-colors text-white hover:text-white"
            >
              {c.title}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            aria-label="Scroll left"
            onClick={() => scrollBy(-1)}
            className="grid size-8 place-items-center cursor-pointer text-primary-foreground"
          >
            <AltArrowLeft className="size-6" />
          </button>
          <button
            type="button"
            aria-label="Scroll right"
            onClick={() => scrollBy(1)}
            className="grid size-8 place-items-center cursor-pointer text-primary-foreground"
          >
            <AltArrowRight className="size-6" />
          </button>
        </div>
      </div>

      <div
        aria-hidden={!open}
        onClick={closeMenu}
        className={cn(
          "fixed inset-x-0 bottom-0 top-32.5 z-30 bg-black/50 transition-opacity duration-300 ease-out",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      <div
        aria-hidden={!open}
        className={cn(
          "absolute inset-x-0 top-full z-40 w-screen  transition-all duration-300 ease-out",
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-3 opacity-0",
        )}
      >
        <div className="origin-top overflow-hidden border border-border bg-background shadow-2xl">
          <CategoryMegaMenu
            lang={lang}
            picksTitle={picksTitle}
            featuredTitle={featuredTitle}
            filters={filters}
            activeSlug={activeSlug}
            onActiveChange={setActiveSlug}
            categories={categories}
          />
        </div>
      </div>
    </div>
  );
}
