import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { SearchBar } from "./search-bar";
import { LocaleSwitcher } from "./locale-switcher";
import { CurrencySwitcher } from "./currency-switcher";
import { CartIcon } from "../icons/outline";
import { CategoryNav } from "../category/category-nav";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
}

export function Header({ lang, dict }: IProps) {
  return (
    <header
      suppressHydrationWarning
      className="sticky top-0 z-40 hidden bg-background/95 header-shadow md:block pt-10 space-y-7"
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
            <CartIcon className="size-6 text-secondary-foreground" />
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

          <Link
            href={`/${lang}/profile/account`}
            className="flex items-center gap-2 rounded-full pl-1 pr-3"
          >
            <Image
              src="/placeholders/avatar.svg"
              alt="Profile"
              width={40}
              height={40}
              className="size-10 rounded-full bg-muted"
            />
            <span className="hidden text-left leading-tight md:block">
              <span className="block font-semibold">Arnold</span>
              <span className="block text-xs text-secondary-foreground">
                {dict.header.helloSignIn}
              </span>
            </span>
          </Link>
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
