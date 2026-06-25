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
import { HeaderCartButton } from "./header-cart-button";
import { CategoryNav } from "../category/category-nav";
import { Heart } from "@solar-icons/react/ssr";

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
        className="flex w-screen items-center gap-10 px-6"
      >
        <div className="flex flex-1 basis-0">
          <Link href={`/${lang}/demo`} className="shrink-0" aria-label="Home">
            <Image
              src="/logo-white.svg"
              alt="2020Mall logo"
              width={180}
              height={60}
              priority
              style={{ height: "auto" }}
            />
          </Link>
        </div>

        <div className="flex flex-1 justify-center">
          <div className="flex w-full max-w-2xl">
            <SearchBar
              lang={lang}
              placeholder={dict.header.searchPlaceholder}
              searchLabel={dict.header.search}
              visualSearchDict={dict.visualSearch}
            />
          </div>
        </div>

        <div
          suppressHydrationWarning
          className="flex flex-1 basis-0 shrink-0 items-center justify-end gap-4"
        >
          <LocaleSwitcher current={lang} />
          <CurrencySwitcher />

          <div className="h-8 w-px bg-border" aria-hidden />

          <HeaderCartButton lang={lang} />
          <Link
            href={`/${lang}/profile/wishlist`}
            aria-label="Wishlist"
            className="rounded-full"
          >
            <Heart className="size-6 text-white" />
          </Link>

          <div className="h-8 w-px bg-border" aria-hidden />

          <HeaderUserAction lang={lang} signUpLabel={dict.header.signUp} />
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
