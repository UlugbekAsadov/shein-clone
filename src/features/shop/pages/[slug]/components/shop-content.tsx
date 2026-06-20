"use client";

import { useCallback, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import type {
  IApiShop,
  IApiShopAbout,
  IApiShopPromoCode,
  IApiShopProduct,
  IApiShopFilterOptions,
  IApiShopProductsMeta,
} from "@/features/shop/utils/shop-response.interface";
import { SHOP_TAB_IDS } from "@/features/shop/pages/[slug]/utils/shop-tabs.constants";
import { ShopTabs } from "./shop-tabs/shop-tabs";
import { AllProductsPanel } from "./tab-panels/all-products-panel";
import { DealsOffersPanel } from "./tab-panels/deals-offers-panel";
import { AboutStorePanel } from "./tab-panels/about-store-panel";

interface IProps {
  shop: IApiShop;
  shopId: number;
  products: IApiShopProduct[];
  initialMeta: IApiShopProductsMeta;
  filterOptions: IApiShopFilterOptions | null;
  coupons: IApiShopPromoCode[];
  about: IApiShopAbout | null;
  dict: IDictionary;
  lang: string;
}

export function ShopContent({
  shop,
  shopId,
  products,
  initialMeta,
  filterOptions,
  coupons,
  about,
  dict,
  lang,
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
    <div className="space-y-6">
      <div className="mx-auto max-w-360 px-6 border-b border-border pb-4">
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
        <AllProductsPanel
          shopId={shopId}
          products={products}
          initialMeta={initialMeta}
          filterOptions={filterOptions}
          dict={dict}
          lang={lang}
        />
      )}
      {active === "deals" && <DealsOffersPanel coupons={coupons} dict={dict} />}
      {active === "about" && (
        <AboutStorePanel shop={shop} about={about} dict={dict} lang={lang} />
      )}
    </div>
  );
}
