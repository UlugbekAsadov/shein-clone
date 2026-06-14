"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { FilterSection } from "@/shared/components/listing/filter-sidebar/filter-section";
import type { IApiFilterOptions } from "@/types/filter-options.interface";
import type { IActiveFilters } from "@/features/category/pages/[slug]/utils/active-filters.interface";
import { FilterQuickFilters } from "./filter-quick-filters";
import { FilterCategoryTree } from "./filter-category-tree";
import { FilterSeasonChips } from "./filter-season-chips";
import { FilterPriceRange } from "./filter-price-range";
import { FilterBrandList } from "./filter-brand-list";

const DEBOUNCE_MS = 500;

interface IDict {
  title: string;
  quickFilters: string;
  category: string;
  priceRange: string;
  priceTo: string;
  brands: string;
  brandsSearch: string;
  seasons: string;
}

interface IProps {
  filterOptions: IApiFilterOptions;
  initialFilters: IActiveFilters;
  onApply: (filters: IActiveFilters) => void;
  dict: IDict;
  quickFiltersLabels: {
    onSale: string;
    original: string;
    freeDelivery: string;
    new: string;
  };
}

export function CategoryFilterSidebar({
  filterOptions,
  initialFilters,
  onApply,
  dict,
  quickFiltersLabels,
}: IProps) {
  const [pending, setPending] = useState<IActiveFilters>(initialFilters);
  const onApplyRef = useRef(onApply);
  const isFirstRender = useRef(true);

  useEffect(() => {
    onApplyRef.current = onApply;
  }, [onApply]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const timer = setTimeout(() => {
      onApplyRef.current(pending);
    }, DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [pending]);

  const priceRange: [number, number] = [
    pending.minPrice ?? filterOptions.price_range.min,
    pending.maxPrice ?? filterOptions.price_range.max,
  ];

  const availableQuickFilterKeys = filterOptions.quick_filters.map((f) => f.key);

  return (
    <aside className={cn("w-60 shrink-0 hidden", "md:block")}>
      <h2 className="pb-3 text-lg font-bold border-b">{dict.title}</h2>

      <FilterQuickFilters
        title={dict.quickFilters}
        labels={quickFiltersLabels}
        availableKeys={availableQuickFilterKeys}
        hasDiscount={pending.hasDiscount}
        isOriginal={pending.isOriginal}
        onToggle={(key, value) => setPending((prev) => ({ ...prev, [key]: value }))}
      />

      {filterOptions.categories.length > 0 && (
        <FilterSection title={dict.category}>
          <FilterCategoryTree
            nodes={filterOptions.categories}
            selectedIds={pending.categoryIds}
            onChange={(ids) => setPending((prev) => ({ ...prev, categoryIds: ids }))}
          />
        </FilterSection>
      )}

      {filterOptions.seasons.length > 0 && (
        <FilterSection title={dict.seasons}>
          <FilterSeasonChips
            seasons={filterOptions.seasons}
            selectedIds={pending.seasonIds}
            onChange={(ids) => setPending((prev) => ({ ...prev, seasonIds: ids }))}
          />
        </FilterSection>
      )}

      <FilterSection title={dict.priceRange}>
        <FilterPriceRange
          toLabel={dict.priceTo}
          bounds={filterOptions.price_range}
          range={priceRange}
          onChange={([min, max]) =>
            setPending((prev) => ({ ...prev, minPrice: min, maxPrice: max }))
          }
        />
      </FilterSection>

      {filterOptions.brands.length > 0 && (
        <FilterSection title={dict.brands}>
          <FilterBrandList
            brands={filterOptions.brands}
            selectedIds={pending.brandIds}
            onChange={(ids) => setPending((prev) => ({ ...prev, brandIds: ids }))}
            searchPlaceholder={dict.brandsSearch}
          />
        </FilterSection>
      )}
    </aside>
  );
}
