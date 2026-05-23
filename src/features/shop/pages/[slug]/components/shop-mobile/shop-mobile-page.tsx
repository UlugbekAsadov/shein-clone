"use client";

import { useState } from "react";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import type { IProduct } from "@/types/product.interface";
import type { IShopDetail } from "@/features/shop/pages/[slug]/utils/shop-detail.interface";
import type { ICoupon } from "@/features/shop/pages/[slug]/utils/coupon.interface";
import type { IAboutContent } from "@/features/shop/pages/[slug]/utils/about-content.interface";
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
  shop: IShopDetail;
  products: IProduct[];
  coupons: ICoupon[];
  about: IAboutContent;
  dict: IDictionary;
}

export function ShopMobilePage({
  shop,
  products,
  coupons,
  about,
  dict,
}: IProps) {
  const [active, setActive] = useState<(typeof SHOP_TAB_IDS)[number]>("all");
  const handle = shop.handle.replace(/^@/, "");

  return (
    <div className="pb-6 md:hidden">
      <ShopMobileHeader title={handle} />

      <div className="flex flex-col gap-4 pt-2">
        <ShopMobileProfile
          shop={shop}
          labels={{
            sels: dict.shop.sels,
            followers: dict.shop.followers,
            seller: dict.shop.seller,
          }}
        />

        <ShopMobileInfoRows shop={shop} responseLabel={dict.shop.response} />

        <ShopMobileActions
          initialFollowing={shop.isFollowing}
          followLabel={dict.shop.follow}
          followingLabel={dict.shop.following}
          messageLabel={dict.shop.message}
        />

        <ShopMobileBrands excludeSlug={shop.slug} />

        <div className="px-4">
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
