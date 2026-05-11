import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import type { locales } from "@/lib/i18n-config";
import type { IDictionary } from "@/lib/dictionaries";
import { SearchBar } from "./search-bar";
import { LocaleSwitcher } from "./locale-switcher";
import { CurrencySwitcher } from "./currency-switcher";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
}

export function Header({ lang, dict }: IProps) {
  return (
    <header
      suppressHydrationWarning
      className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur"
    >
      <div
        suppressHydrationWarning
        className="mx-auto flex h-20 max-w-[1440px] items-center gap-6 px-6"
      >
        <Link
          href={`/${lang}`}
          className="text-2xl font-black tracking-tight"
          aria-label="Home"
        >
          LOGO
        </Link>

        <SearchBar
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
            className="relative rounded-full p-2 hover:bg-muted"
          >
            <ShoppingCart className="size-6 text-muted-foreground" />
            <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-rose-500 px-1 text-[10px] font-semibold text-white">
              8
            </span>
          </button>
          <button
            type="button"
            aria-label="Wishlist"
            className="rounded-full p-2 hover:bg-muted"
          >
            <Heart className="size-6 text-muted-foreground" />
          </button>

          <button
            type="button"
            className="flex items-center gap-2 rounded-full pl-1 pr-3 hover:bg-muted"
          >
            <Image
              src="/placeholders/avatar.svg"
              alt="Profile"
              width={40}
              height={40}
              className="size-10 rounded-full bg-muted"
            />
            <span className="hidden text-left leading-tight md:block">
              <span className="block text-sm font-semibold">Arnold</span>
              <span className="block text-xs text-muted-foreground">
                {dict.header.helloSignIn}
              </span>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
