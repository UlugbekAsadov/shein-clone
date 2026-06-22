"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ListingShell } from "@/shared/components/listing/listing-shell";
import { productsApi } from "@/features/products/api/products.api";
import type { IProduct } from "@/types/product.interface";
import type { IApiProductsMeta } from "@/features/products/utils/products-response.interface";
import type { IApiFilterOptions } from "@/types/filter-options.interface";
import type { IActiveFilters } from "@/features/category/pages/[slug]/utils/active-filters.interface";
import { CategoryFilterSidebar } from "@/features/category/pages/[slug]/components/category-filter-sidebar/category-filter-sidebar";

const FILTER_PARAM_KEYS = [
  "category_ids",
  "brand_ids",
  "season_ids",
  "min_price",
  "max_price",
  "has_discount",
  "is_original",
] as const;

function parseFiltersFromUrl(params: URLSearchParams): IActiveFilters {
  const getIds = (key: string): number[] =>
    params
      .get(key)
      ?.split(",")
      .map(Number)
      .filter((n) => n > 0) ?? [];

  return {
    categoryIds: getIds("category_ids"),
    brandIds: getIds("brand_ids"),
    seasonIds: getIds("season_ids"),
    minPrice:
      params.get("min_price") !== null ? Number(params.get("min_price")) : null,
    maxPrice:
      params.get("max_price") !== null ? Number(params.get("max_price")) : null,
    hasDiscount: params.get("has_discount") === "1",
    isOriginal: params.get("is_original") === "1",
  };
}

function hasActiveFilters(filters: IActiveFilters): boolean {
  return (
    filters.categoryIds.length > 0 ||
    filters.brandIds.length > 0 ||
    filters.seasonIds.length > 0 ||
    filters.minPrice !== null ||
    filters.maxPrice !== null ||
    filters.hasDiscount ||
    filters.isOriginal
  );
}

function mergeParamsWithFilters(
  base: Record<string, string>,
  filters: IActiveFilters,
): Record<string, string> {
  const result = { ...base };
  FILTER_PARAM_KEYS.forEach((key) => delete result[key]);

  if (filters.categoryIds.length > 0)
    result.category_ids = filters.categoryIds.join(",");
  if (filters.brandIds.length > 0)
    result.brand_ids = filters.brandIds.join(",");
  if (filters.seasonIds.length > 0)
    result.season_ids = filters.seasonIds.join(",");
  if (filters.minPrice !== null) result.min_price = String(filters.minPrice);
  if (filters.maxPrice !== null) result.max_price = String(filters.maxPrice);
  if (filters.hasDiscount) result.has_discount = "1";
  if (filters.isOriginal) result.is_original = "1";

  return result;
}

function makeCacheKey(params: Record<string, string>, page: number): string {
  const sorted = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&");
  return `${sorted}:${page}`;
}

interface ICacheEntry {
  products: IProduct[];
  meta: IApiProductsMeta;
}

const resultCache = new Map<string, ICacheEntry>();

const EMPTY_FILTERS: IActiveFilters = {
  categoryIds: [],
  brandIds: [],
  seasonIds: [],
  minPrice: null,
  maxPrice: null,
  hasDiscount: false,
  isOriginal: false,
};

interface IListingDict {
  tabs: { similar: string; deals: string };
  toolbar: {
    productFound: string;
    mostPopular: string;
    price: string;
    sortNewest: string;
    sortPriceLow: string;
    sortPriceHigh: string;
    sortRating: string;
  };
  filter: {
    title: string;
    quickFilters: string;
    category: string;
    size: string;
    sizeClothing: string;
    sizeShoes: string;
    color: string;
    priceRange: string;
    priceTo: string;
    brands: string;
    brandsSearch: string;
    style: string;
    material: string;
    seasons: string;
    apply: string;
  };
}

interface IProps {
  title: string;
  header: React.ReactNode;
  initialProducts: IProduct[];
  initialMeta: IApiProductsMeta;
  initialParams: Record<string, string>;
  filterOptions: IApiFilterOptions | null;
  dict: IListingDict;
  quickFiltersLabels: {
    onSale: string;
    freeDelivery: string;
    original: string;
    new: string;
  };
  fetchProducts?: (
    params: Record<string, string>,
    page: number,
  ) => Promise<{ products: IProduct[]; meta: IApiProductsMeta } | null>;
  renderFilterSidebar?: (
    onApply: (filters: IActiveFilters) => void,
    initialFilters: IActiveFilters,
  ) => React.ReactNode;
  onFiltersChange?: (params: Record<string, string>) => void;
}

export function ProductsInfinite({
  title,
  header,
  initialProducts,
  initialMeta,
  initialParams,
  filterOptions,
  dict,
  quickFiltersLabels,
  fetchProducts,
  renderFilterSidebar,
  onFiltersChange,
}: IProps) {
  const router = useRouter();
  const pathname = usePathname();
  const rawSearchParams = useSearchParams();

  const [baseParams, setBaseParams] = useState<Record<string, string>>(() => {
    const result = { ...initialParams };
    FILTER_PARAM_KEYS.forEach((key) => delete result[key]);
    return result;
  });

  const sortSignature = `${rawSearchParams?.get("sort_by") ?? ""}:${rawSearchParams?.get("sort_direction") ?? ""}`;
  const prevSortSignatureRef = useRef(sortSignature);

  useEffect(() => {
    if (sortSignature === prevSortSignatureRef.current) return;
    prevSortSignatureRef.current = sortSignature;
    setBaseParams((prev) => {
      const next = { ...prev };
      const sb = rawSearchParams?.get("sort_by");
      const sd = rawSearchParams?.get("sort_direction");
      if (sb) next.sort_by = sb;
      else delete next.sort_by;
      if (sd) next.sort_direction = sd;
      else delete next.sort_direction;
      return next;
    });
  }, [sortSignature, rawSearchParams]);

  const queryParam = rawSearchParams?.get("query") ?? "";
  const prevQueryParamRef = useRef(queryParam);

  useEffect(() => {
    if (queryParam === prevQueryParamRef.current) return;
    prevQueryParamRef.current = queryParam;
    setBaseParams((prev) => {
      const next = { ...prev };
      if (queryParam) next.query = queryParam;
      else delete next.query;
      return next;
    });
  }, [queryParam]);

  const [initialFilters] = useState<IActiveFilters>(() =>
    parseFiltersFromUrl(new URLSearchParams(rawSearchParams?.toString() ?? "")),
  );

  const startsWithFilters = useRef(hasActiveFilters(initialFilters));

  const [appliedFilters, setAppliedFilters] =
    useState<IActiveFilters>(initialFilters);
  const [products, setProducts] = useState<IProduct[]>(
    startsWithFilters.current ? [] : initialProducts,
  );
  const [meta, setMeta] = useState<IApiProductsMeta>(
    startsWithFilters.current
      ? { ...initialMeta, current_page: 0, last_page: 0 }
      : initialMeta,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);

  const sentinelRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const key = makeCacheKey(
      mergeParamsWithFilters(baseParams, EMPTY_FILTERS),
      1,
    );
    resultCache.set(key, { products: initialProducts, meta: initialMeta });
  }, []);

  const hasMore = meta.current_page < meta.last_page;

  const fetchPage = useCallback(
    async (page: number, filters: IActiveFilters) => {
      const mergedParams = mergeParamsWithFilters(baseParams, filters);
      const cacheKey = makeCacheKey(mergedParams, page);
      const cached = resultCache.get(cacheKey);

      if (cached) {
        setProducts((prev) =>
          page === 1 ? cached.products : [...prev, ...cached.products],
        );
        setMeta(cached.meta);
        return;
      }

      if (loadingRef.current) return;
      loadingRef.current = true;
      if (page === 1) setIsLoading(true);
      else setIsFetchingNextPage(true);
      try {
        let incoming: IProduct[];
        let newMeta: IApiProductsMeta;

        if (fetchProducts) {
          const res = await fetchProducts(mergedParams, page);
          if (!res) return;
          incoming = res.products;
          newMeta = res.meta;
        } else {
          const res = await productsApi.getProducts(mergedParams, page);
          if (!res.data) return;
          incoming = res.data;
          newMeta = res.meta;
        }

        resultCache.set(cacheKey, { products: incoming, meta: newMeta });
        setProducts((prev) => (page === 1 ? incoming : [...prev, ...incoming]));
        setMeta(newMeta);
      } finally {
        loadingRef.current = false;
        if (page === 1) setIsLoading(false);
        else setIsFetchingNextPage(false);
      }
    },
    [baseParams, fetchProducts],
  );

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      if (!startsWithFilters.current) return;
    }
    loadingRef.current = false;
    setProducts([]);
    setMeta((prev) => ({ ...prev, current_page: 0, last_page: 0 }));
    fetchPage(1, appliedFilters);
  }, [appliedFilters, fetchPage]);

  const handleApplyFilters = useCallback(
    (filters: IActiveFilters) => {
      setAppliedFilters(filters);
      const merged = mergeParamsWithFilters(baseParams, filters);
      onFiltersChange?.(merged);
      const params = new URLSearchParams(merged);
      const str = params.toString();
      router.replace(`${pathname}${str ? `?${str}` : ""}`, { scroll: false });
    },
    [router, pathname, baseParams, onFiltersChange],
  );

  const loadMore = useCallback(async () => {
    if (loadingRef.current || meta.current_page >= meta.last_page) return;
    await fetchPage(meta.current_page + 1, appliedFilters);
  }, [meta, appliedFilters, fetchPage]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) loadMore();
      },
      { rootMargin: "300px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore, hasMore]);

  const filterSidebarSlot = renderFilterSidebar ? (
    renderFilterSidebar(handleApplyFilters, initialFilters)
  ) : filterOptions ? (
    <CategoryFilterSidebar
      filterOptions={filterOptions}
      onApply={handleApplyFilters}
      initialFilters={initialFilters}
      dict={dict.filter}
      quickFiltersLabels={quickFiltersLabels}
    />
  ) : undefined;

  return (
    <>
      <ListingShell
        title={title}
        header={header}
        products={products}
        filterSidebarSlot={filterSidebarSlot}
        productCount={meta.total}
        isLoading={isLoading}
        dict={dict}
        quickFiltersLabels={quickFiltersLabels}
      />
      {!isLoading && hasMore && <div ref={sentinelRef} className="h-10" />}
      {isFetchingNextPage && (
        <div className="flex justify-center py-6">
          <div className="size-8 animate-spin rounded-full border-4 border-muted border-t-primary" />
        </div>
      )}
    </>
  );
}
