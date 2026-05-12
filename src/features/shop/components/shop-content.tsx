"use client";

import { useState } from "react";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import type { IProduct } from "@/types/product.interface";
import type { IShopDetail } from "@/features/shop/interfaces/shop-detail.interface";
import type { ICoupon } from "@/features/shop/interfaces/coupon.interface";
import type { IAboutContent } from "@/features/shop/interfaces/about-content.interface";
import { SHOP_TAB_IDS } from "@/features/shop/constants/shop-tabs.constants";
import { ShopTabs } from "./shop-tabs/shop-tabs";
import { AllProductsPanel } from "./tab-panels/all-products-panel";
import { DealsOffersPanel } from "./tab-panels/deals-offers-panel";
import { AboutStorePanel } from "./tab-panels/about-store-panel";

interface IProps {
  shop: IShopDetail;
  products: IProduct[];
  coupons: ICoupon[];
  about: IAboutContent;
  dict: IDictionary;
}

export function ShopContent({
  shop,
  products,
  coupons,
  about,
  dict,
}: IProps) {
  const [active, setActive] = useState<(typeof SHOP_TAB_IDS)[number]>("all");

  return (
    <div className="space-y-6">
      <div className="mx-auto max-w-[1440px] px-6 border-b border-border pb-4">
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
        <AllProductsPanel products={products} dict={dict} />
      )}
      {active === "deals" && (
        <DealsOffersPanel coupons={coupons} products={products} dict={dict} />
      )}
      {active === "about" && (
        <AboutStorePanel shop={shop} about={about} dict={dict} />
      )}
    </div>
  );
}
