"use client";

import { useCallback, useState } from "react";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import type { IProduct } from "@/types/product.interface";
import type { IApiProductsMeta } from "@/features/products/utils/products-response.interface";
import type { IActiveFilters } from "@/features/category/pages/[slug]/utils/active-filters.interface";
import type { IApiFilterOptions } from "@/types/filter-options.interface";
import type {
  IApiShopProduct,
  IApiShopFilterOptions,
  IApiShopProductsMeta,
} from "@/features/shop/utils/shop-response.interface";
import { shopApi } from "@/features/shop/api/shop.api";
import { CategoryFilterSidebar } from "@/features/category/pages/[slug]/components/category-filter-sidebar/category-filter-sidebar";
import { ProductsInfinite } from "@/features/products/components/products-infinite";

interface IProps {
  shopId: number;
  products: IApiShopProduct[];
  initialMeta: IApiShopProductsMeta;
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

function toApiFilterOptions(opts: IApiShopFilterOptions): IApiFilterOptions {
  return {
    price_range: { min: opts.price_range.min, max: opts.price_range.max },
    quick_filters: opts.quick_filters
      .filter((qf) => qf.available)
      .map((qf) => ({ key: qf.key, label: qf.label, count: qf.products_count })),
    badges: [],
    categories: opts.categories,
    brands: opts.brands,
    seasons: opts.seasons,
    attributes: opts.attributes,
  };
}

function parseShopParams(
  params: Record<string, string>,
): Record<string, string | number | number[] | string[] | undefined> {
  const brandIds = params.brand_ids?.split(",").map(Number).filter(Boolean) ?? [];
  const categoryIds = params.category_ids?.split(",").map(Number).filter(Boolean) ?? [];
  const quickFilters: string[] = [
    ...(params.has_discount === "1" ? ["has_discount"] : []),
    ...(params.is_original === "1" ? ["is_original"] : []),
  ];
  return {
    min_price: params.min_price ? Number(params.min_price) : undefined,
    max_price: params.max_price ? Number(params.max_price) : undefined,
    category_id: categoryIds[0],
    "brand_ids[]": brandIds.length > 0 ? brandIds : undefined,
    "quick_filters[]": quickFilters.length > 0 ? quickFilters : undefined,
  };
}

export function AllProductsPanel({ shopId, products, initialMeta, filterOptions, dict }: IProps) {
  const [currentFilterOptions, setCurrentFilterOptions] = useState(filterOptions);

  const fetchProducts = useCallback(
    async (
      params: Record<string, string>,
      page: number,
    ): Promise<{ products: IProduct[]; meta: IApiProductsMeta } | null> => {
      const result = await shopApi.getProducts(shopId, {
        page,
        ...parseShopParams(params),
      });
      if (!result.data) return null;
      return { products: result.data.map(toProduct), meta: result.meta };
    },
    [shopId],
  );

  const handleFiltersChange = useCallback(
    async (params: Record<string, string>) => {
      const result = await shopApi.getFilterOptions(shopId, parseShopParams(params));
      if (result.data) setCurrentFilterOptions(result.data);
    },
    [shopId],
  );

  const apiFilterOptions = currentFilterOptions ? toApiFilterOptions(currentFilterOptions) : null;

  return (
    <ProductsInfinite
      title=""
      header={null}
      initialProducts={products.map(toProduct)}
      initialMeta={initialMeta}
      initialParams={{ shop_id: String(shopId) }}
      filterOptions={null}
      dict={dict.listing}
      quickFiltersLabels={dict.nav.filters}
      fetchProducts={fetchProducts}
      onFiltersChange={handleFiltersChange}
      renderFilterSidebar={
        apiFilterOptions
          ? (onApply, initialFilters) => (
              <CategoryFilterSidebar
                filterOptions={apiFilterOptions}
                initialFilters={initialFilters}
                onApply={onApply}
                dict={dict.listing.filter}
                quickFiltersLabels={dict.nav.filters}
              />
            )
          : undefined
      }
    />
  );
}
