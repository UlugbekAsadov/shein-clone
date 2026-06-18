import Link from "next/link";
import Image from "next/image";
import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { getCategories } from "@/features/category/services/category.service";
import { SearchBar } from "./search-bar";
import { LocaleSwitcher } from "./locale-switcher";
import { CurrencySwitcher } from "./currency-switcher";
import { HeaderUserAction } from "./header-user-action";
import { HeaderScrollWrapper } from "./header-scroll-wrapper";
import { CategoryNav } from "../category/category-nav";
import { CartLarge2, Heart } from "@solar-icons/react/ssr";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
  isSticky?: boolean;
}

export async function Header({ lang, dict, isSticky = true }: IProps) {
  const categories = await getCategories();

  return (
    <HeaderScrollWrapper isSticky={isSticky}>
      <div
        suppressHydrationWarning
        className="mx-auto flex max-w-360 items-center gap-10 px-6"
      >
        <Link
          href={`/${lang}/demo`}
          className="mr-25 shrink-0"
          aria-label="Home"
        >
          <Image
            src="/logo.svg"
            alt="2020Mall logo"
            width={120}
            height={60}
            priority
            style={{ height: "auto" }}
          />
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
        categories={categories}
      />
    </HeaderScrollWrapper>
  );
}
