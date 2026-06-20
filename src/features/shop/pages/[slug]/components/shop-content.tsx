"use client";

import { useState } from "react";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import type {
  IApiShop,
  IApiShopAbout,
  IApiShopPromoCode,
  IApiShopProduct,
  IApiShopFilterOptions,
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
  productCount: number;
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
  productCount,
  filterOptions,
  coupons,
  about,
  dict,
  lang,
}: IProps) {
  const [active, setActive] = useState<(typeof SHOP_TAB_IDS)[number]>("all");

  return (
    <div className="space-y-6">
      <div className="mx-auto max-w-360 px-6 border-b border-border pb-4">
        <ShopTabs
          active={active}
          onChange={setActive}
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
          productCount={productCount}
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
