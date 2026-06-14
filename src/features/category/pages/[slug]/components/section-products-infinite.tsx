"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ListingShell } from "@/shared/components/listing/listing-shell";
import { categoryApi } from "@/features/category/api/category.api";
import type { IProduct } from "@/types/product.interface";
import type {
  IApiCategorySectionMeta,
  IApiCategorySectionProduct,
} from "@/features/category/pages/[slug]/utils/category-section.interface";
import type { IApiFilterOptions } from "@/types/filter-options.interface";
import type { IActiveFilters } from "@/features/category/pages/[slug]/utils/active-filters.interface";
import { CategoryFilterSidebar } from "./category-filter-sidebar/category-filter-sidebar";

interface ICacheEntry {
  products: IProduct[];
  meta: IApiCategorySectionMeta;
}

const filterResultCache = new Map<string, ICacheEntry>();

const EMPTY_FILTERS: IActiveFilters = {
  categoryIds: [],
  brandIds: [],
  seasonIds: [],
  minPrice: null,
  maxPrice: null,
  hasDiscount: false,
  isOriginal: false,
};

function parseFiltersFromUrl(params: URLSearchParams): IActiveFilters {
  return {
    categoryIds: params
      .getAll("category_ids[]")
      .map(Number)
      .filter((n) => n > 0),
    brandIds: params
      .getAll("brand_ids[]")
      .map(Number)
      .filter((n) => n > 0),
    seasonIds: params
      .getAll("season_ids[]")
      .map(Number)
      .filter((n) => n > 0),
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

function buildFilterQuery(filters: IActiveFilters): string {
  const params = new URLSearchParams();
  filters.categoryIds.forEach((id) =>
    params.append("category_ids[]", String(id)),
  );
  filters.brandIds.forEach((id) => params.append("brand_ids[]", String(id)));
  filters.seasonIds.forEach((id) => params.append("season_ids[]", String(id)));
  if (filters.minPrice !== null)
    params.set("min_price", String(filters.minPrice));
  if (filters.maxPrice !== null)
    params.set("max_price", String(filters.maxPrice));
  if (filters.hasDiscount) params.set("has_discount", "1");
  if (filters.isOriginal) params.set("is_original", "1");
  const str = params.toString();
  return str ? `?${str}` : "";
}

function makeCacheKey(
  slug: string,
  filters: IActiveFilters,
  page: number,
): string {
  return `${slug}${buildFilterQuery(filters)}:${page}`;
}

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
  slug: string;
  title: string;
  header: React.ReactNode;
  dict: IListingDict;
  quickFiltersLabels: {
    onSale: string;
    freeDelivery: string;
    original: string;
    new: string;
  };
  initialProducts: IProduct[];
  initialMeta: IApiCategorySectionMeta;
  filterOptions: IApiFilterOptions | null;
}

function mapProduct(p: IApiCategorySectionProduct): IProduct {
  return {
    id: String(p.id),
    slug: p.slug,
    title: p.title,
    subtitle: "",
    price: 0,
    image: p.image_url,
    rating: p.rating,
    reviews: 0,
    badge: p.is_original ? "Original" : undefined,
    discountLabel:
      p.discount_type === "percent" && p.discount > 0
        ? `${p.discount}%`
        : undefined,
    delivery: p.delivery_date_text,
  };
}

export function SectionProductsInfinite({
  slug,
  title,
  header,
  dict,
  quickFiltersLabels,
  initialProducts,
  initialMeta,
  filterOptions,
}: IProps) {
  const router = useRouter();
  const pathname = usePathname();
  const rawSearchParams = useSearchParams();

  const [initialFilters] = useState<IActiveFilters>(() =>
    parseFiltersFromUrl(new URLSearchParams(rawSearchParams?.toString() ?? "")),
  );

  const startsWithFilters = useRef(hasActiveFilters(initialFilters));

  const [appliedFilters, setAppliedFilters] =
    useState<IActiveFilters>(initialFilters);
  const [products, setProducts] = useState<IProduct[]>(
    startsWithFilters.current ? [] : initialProducts,
  );
  const [meta, setMeta] = useState<IApiCategorySectionMeta>(
    startsWithFilters.current
      ? { ...initialMeta, current_page: 0, last_page: 0 }
      : initialMeta,
  );
  const [loading, setLoading] = useState(false);

  const sentinelRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    filterResultCache.set(makeCacheKey(slug, EMPTY_FILTERS, 1), {
      products: initialProducts,
      meta: initialMeta,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasMore = meta.current_page < meta.last_page;

  const fetchPage = useCallback(
    async (page: number, filters: IActiveFilters) => {
      const cacheKey = makeCacheKey(slug, filters, page);
      const cached = filterResultCache.get(cacheKey);

      if (cached) {
        setProducts((prev) =>
          page === 1 ? cached.products : [...prev, ...cached.products],
        );
        setMeta(cached.meta);
        return;
      }

      if (loadingRef.current) return;
      loadingRef.current = true;
      setLoading(true);
      try {
        const res = await categoryApi.getSection(slug, page, filters);
        if (!res.data) return;
        const incoming = res.data.products.map(mapProduct);
        filterResultCache.set(cacheKey, {
          products: incoming,
          meta: res.data.meta,
        });
        setProducts((prev) => (page === 1 ? incoming : [...prev, ...incoming]));
        setMeta(res.data.meta);
      } finally {
        loadingRef.current = false;
        setLoading(false);
      }
    },
    [slug],
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
      router.replace(`${pathname}${buildFilterQuery(filters)}`, {
        scroll: false,
      });
    },
    [router, pathname],
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

  const filterSidebarSlot = filterOptions ? (
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
        dict={dict}
        quickFiltersLabels={quickFiltersLabels}
      />
      {hasMore && <div ref={sentinelRef} className="h-10" />}
      {loading && (
        <div className="flex justify-center py-6">
          <div className="size-8 animate-spin rounded-full border-4 border-muted border-t-primary" />
        </div>
      )}
    </>
  );
}
