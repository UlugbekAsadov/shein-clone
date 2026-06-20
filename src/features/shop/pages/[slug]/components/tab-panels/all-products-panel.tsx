"use client";

import { useState, useEffect } from "react";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import type { IProduct } from "@/types/product.interface";
import type { IFilterState } from "@/types/filter.interface";
import type {
  IApiShopProduct,
  IApiShopFilterOptions,
} from "@/features/shop/utils/shop-response.interface";
import { shopApi } from "@/features/shop/api/shop.api";
import { ShopProductListing } from "../shop-product-listing";

interface IProps {
  shopId: number;
  products: IApiShopProduct[];
  productCount: number;
  filterOptions: IApiShopFilterOptions | null;
  dict: IDictionary;
  lang: string;
}

function toProduct(p: IApiShopProduct): IProduct {
  return {
    id: String(p.id),
    slug: p.slug,
    title: p.title,
    subtitle: "",
    price: p.price,
    image: p.image_url,
    rating: p.rating,
    reviews: 0,
    badge: p.is_original ? "Original" : undefined,
    discountLabel:
      p.discount > 0
        ? p.discount_type === "percent"
          ? `${p.discount}%`
          : String(p.discount)
        : undefined,
    delivery: p.delivery_date_text,
  };
}

function buildParams(opts: {
  quickFilters: string[];
  brandIds: number[];
  categoryId?: number;
  priceRange?: [number, number];
}): Record<string, string | number | string[] | number[] | undefined> {
  return {
    "quick_filters[]": opts.quickFilters.length > 0 ? opts.quickFilters : undefined,
    "brand_ids[]": opts.brandIds.length > 0 ? opts.brandIds : undefined,
    category_id: opts.categoryId,
    min_price: opts.priceRange?.[0],
    max_price: opts.priceRange?.[1],
  };
}

export function AllProductsPanel({
  shopId,
  products,
  productCount,
  filterOptions,
  dict,
}: IProps) {
  const [currentProducts, setCurrentProducts] = useState(products);
  const [currentCount, setCurrentCount] = useState(productCount);
  const [currentFilterOptions, setCurrentFilterOptions] = useState(filterOptions);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedQuickFilters, setSelectedQuickFilters] = useState<string[]>([]);
  const [selectedBrandIds, setSelectedBrandIds] = useState<number[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | undefined>();
  const [appliedPriceRange, setAppliedPriceRange] = useState<[number, number] | undefined>();

  useEffect(() => {
    const params = buildParams({
      quickFilters: selectedQuickFilters,
      brandIds: selectedBrandIds,
      categoryId: selectedCategoryId,
      priceRange: appliedPriceRange,
    });

    let cancelled = false;

    async function fetchData() {
      setIsLoading(true);
      try {
        const [productsResult, filterOptionsResult] = await Promise.all([
          shopApi.getProducts(shopId, params),
          shopApi.getFilterOptions(shopId, params),
        ]);
        if (cancelled) return;
        setCurrentProducts(productsResult.data ?? []);
        setCurrentCount(productsResult.meta?.total ?? 0);
        if (filterOptionsResult.data) setCurrentFilterOptions(filterOptionsResult.data);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [shopId, selectedQuickFilters, selectedBrandIds, selectedCategoryId, appliedPriceRange]);

  function toggleQuickFilter(key: string) {
    setSelectedQuickFilters((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  }

  function toggleBrand(id: number) {
    setSelectedBrandIds((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id],
    );
  }

  function selectCategory(id: number | undefined) {
    setSelectedCategoryId((prev) => (prev === id ? undefined : id));
  }

  function applyPriceRange(range: [number, number]) {
    setAppliedPriceRange(range);
  }

  const filterState: IFilterState = {
    quickFilters: selectedQuickFilters,
    brandIds: selectedBrandIds,
    categoryId: selectedCategoryId,
    priceRange: appliedPriceRange,
  };

  return (
    <div className="mx-auto max-w-360 px-6">
      <ShopProductListing
        products={currentProducts.map(toProduct)}
        productCount={currentCount}
        filterOptions={currentFilterOptions}
        isLoading={isLoading}
        filterState={filterState}
        onToggleQuickFilter={toggleQuickFilter}
        onToggleBrand={toggleBrand}
        onSelectCategory={selectCategory}
        onApplyPrice={applyPriceRange}
        dict={dict}
      />
    </div>
  );
}
