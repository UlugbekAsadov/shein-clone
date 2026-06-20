"use client";

import { useCallback, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import type { IApiShop, IApiShopAbout, IApiShopPromoCode, IApiShopProduct } from "@/features/shop/utils/shop-response.interface";
import { SHOP_TAB_IDS } from "@/features/shop/pages/[slug]/utils/shop-tabs.constants";
import { ShopTabs } from "../shop-tabs/shop-tabs";
import { CouponsStrip } from "../coupons-strip/coupons-strip";
import { ShopMobileHeader } from "./shop-mobile-header";
import { ShopMobileProfile } from "./shop-mobile-profile";
import { ShopMobileInfoRows } from "./shop-mobile-info-rows";
import { ShopMobileActions } from "./shop-mobile-actions";
import { ShopMobileBrands } from "./shop-mobile-brands";
import { ShopMobileAllProducts } from "./shop-mobile-all-products";
import { ShopMobileAbout } from "./shop-mobile-about";

interface IProps {
  shop: IApiShop;
  shopId: number;
  products: IApiShopProduct[];
  coupons: IApiShopPromoCode[];
  about: IApiShopAbout | null;
  dict: IDictionary;
  lang: string;
}

export function ShopMobilePage({
  shop,
  products,
  coupons,
  about,
  dict,
}: IProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const rawTab = searchParams?.get("tab");
  const initialTab = (SHOP_TAB_IDS as readonly string[]).includes(rawTab ?? "")
    ? (rawTab as (typeof SHOP_TAB_IDS)[number])
    : "all";

  const [active, setActive] = useState<(typeof SHOP_TAB_IDS)[number]>(initialTab);

  const handleTabChange = useCallback(
    (tab: (typeof SHOP_TAB_IDS)[number]) => {
      setActive(tab);
      const params = new URLSearchParams(searchParams?.toString() ?? "");
      params.set("tab", tab);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams],
  );

  return (
    <div className="pb-6 md:hidden">
      <ShopMobileHeader title={shop.username} />

      <div className="flex flex-col gap-4 pt-2">
        <ShopMobileProfile shop={shop} dict={dict} />

        <ShopMobileInfoRows shop={shop} responseLabel={dict.shop.response} />

        <ShopMobileActions
          initialFollowing={shop.is_followed}
          followLabel={dict.shop.follow}
          followingLabel={dict.shop.following}
          messageLabel={dict.shop.message}
        />

        <ShopMobileBrands excludeSlug={shop.username} />

        <div className="px-4">
          <ShopTabs
            active={active}
            onChange={handleTabChange}
            allProductsLabel={dict.shop.tabs.allProducts}
            dealsOffersLabel={dict.shop.tabs.dealsOffers}
            aboutStoreLabel={dict.shop.tabs.aboutStore}
            dealsCount={coupons.length}
          />
        </div>

        {active === "all" && (
          <ShopMobileAllProducts
            products={products}
            priceLabel={dict.listing.toolbar.price}
            applyLabel={dict.listing.filter.apply}
            filterDict={{
              size: dict.listing.filter.size,
              color: dict.listing.filter.color,
              priceRange: dict.listing.filter.priceRange,
              priceTo: dict.listing.filter.priceTo,
              brands: dict.listing.filter.brands,
            }}
          />
        )}

        {active === "deals" && (
          <div className="flex flex-col gap-4 px-4">
            <CouponsStrip
              coupons={coupons}
              couponLabel={dict.shop.coupons.label}
              daysLeftLabel={dict.shop.coupons.daysLeft}
              copyLabel={dict.shop.coupons.copy}
              copiedLabel={dict.shop.coupons.copied}
              minOrderLabel={dict.shop.coupons.minOrder}
            />
          </div>
        )}

        {active === "about" && <ShopMobileAbout about={about} dict={dict} />}
      </div>
    </div>
  );
}
