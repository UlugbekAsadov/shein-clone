"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { cn } from "@/lib/utils";
import { SearchBar } from "./search-bar";
import { LocaleSwitcher } from "./locale-switcher";
import { CurrencySwitcher } from "./currency-switcher";
import { HeaderUserAction } from "./header-user-action";
import { CategoryNav } from "../category/category-nav";
import { CartLarge2, Heart } from "@solar-icons/react/ssr";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
  isSticky?: boolean;
}

export function Header({ lang, dict, isSticky = true }: IProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      suppressHydrationWarning
      className={cn(
        "top-0 z-40 hidden bg-background/95 md:block pt-10 space-y-7",
        isScrolled && "header-shadow",
        isSticky && "sticky",
      )}
    >
      <div
        suppressHydrationWarning
        className="mx-auto flex max-w-360 items-center gap-10 px-6"
      >
        <Link
          href={`/${lang}`}
          className="text-2xl font-black tracking-tight mr-25"
          aria-label="Home"
        >
          LOGO
        </Link>

        <SearchBar
          lang={lang}
          placeholder={dict.header.searchPlaceholder}
          searchLabel={dict.header.search}
          visualSearchDict={dict.visualSearch}
        />

        <div suppressHydrationWarning className="flex items-center gap-4">
          <LocaleSwitcher current={lang} />
          <CurrencySwitcher />

          <div className="h-8 w-px bg-border" aria-hidden />

          <button
            type="button"
            aria-label="Cart"
            className="relative rounded-full cursor-pointer"
          >
            <CartLarge2 className="size-6 text-secondary-foreground" />
            <span className="absolute -right-1.5 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-rose-500 px-1 text-[10px] font-semibold text-white">
              8
            </span>
          </button>
          <Link
            href={`/${lang}/profile/wishlist`}
            aria-label="Wishlist"
            className="rounded-full"
          >
            <Heart className="size-6 text-secondary-foreground" />
          </Link>

          <div className="h-8 w-px bg-border" aria-hidden />

          <HeaderUserAction
            lang={lang}
            helloSignInLabel={dict.header.helloSignIn}
            signUpLabel={dict.header.signUp}
          />
        </div>
      </div>

      <CategoryNav
        lang={lang}
        categoriesLabel={dict.nav.categories}
        picksTitle={dict.categoryMenu.picksForYou}
        featuredTitle={dict.categoryMenu.featured}
        filters={dict.nav.filters}
      />
    </header>
  );
}
