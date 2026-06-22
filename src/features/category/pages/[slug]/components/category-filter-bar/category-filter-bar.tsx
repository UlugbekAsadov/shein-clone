"use client";

import { useEffect, useRef, useState } from "react";
import type { IApiFilterOptions } from "@/types/filter-options.interface";
import type { IActiveFilters } from "@/features/category/pages/[slug]/utils/active-filters.interface";
import { FilterBarDropdown } from "@/shared/components/listing/filter-bar/filter-bar-dropdown";
import { FilterCategoryDrill } from "@/features/category/pages/[slug]/components/category-filters/filter-category-drill";
import { FilterPriceRange } from "@/features/category/pages/[slug]/components/category-filters/filter-price-range";
import { FilterBrandList } from "@/features/category/pages/[slug]/components/category-filters/filter-brand-list";
import { FilterSeasonChips } from "@/features/category/pages/[slug]/components/category-filters/filter-season-chips";
import { FilterBarAttribute } from "./filter-bar-attribute";
import { FilterBarQuickChips } from "./filter-bar-quick-chips";

const DEBOUNCE_MS = 500;

interface IDict {
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

export function CategoryFilterBar({
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

  const priceActive =
    pending.minPrice !== null || pending.maxPrice !== null ? 1 : 0;

  const availableQuickFilterKeys =
    filterOptions.quick_filters?.map((f) => f.key) ?? [];

  const setAttributeIds = (itemIds: number[], nextIds: number[]) =>
    setPending((prev) => ({
      ...prev,
      attributeItemIds: [
        ...prev.attributeItemIds.filter((id) => !itemIds.includes(id)),
        ...nextIds,
      ],
    }));

  return (
    <div className="flex flex-wrap items-center gap-2">
      {filterOptions.categories.length > 0 && (
        <FilterBarDropdown
          label={dict.category}
          count={pending.categoryIds.length}
        >
          <FilterCategoryDrill
            nodes={filterOptions.categories}
            selectedIds={pending.categoryIds}
            onChange={(ids) =>
              setPending((prev) => ({ ...prev, categoryIds: ids }))
            }
            rootLabel={dict.category}
          />
        </FilterBarDropdown>
      )}

      {filterOptions.attributes.map((attribute) => {
        const itemIds = attribute.items.map((i) => i.id);
        const selectedIds = pending.attributeItemIds.filter((id) =>
          itemIds.includes(id),
        );
        return (
          <FilterBarDropdown
            key={attribute.id}
            label={attribute.name}
            count={selectedIds.length}
          >
            <FilterBarAttribute
              items={attribute.items}
              selectedIds={selectedIds}
              onChange={(nextIds) => setAttributeIds(itemIds, nextIds)}
            />
          </FilterBarDropdown>
        );
      })}

      <FilterBarDropdown label={dict.priceRange} count={priceActive}>
        <FilterPriceRange
          toLabel={dict.priceTo}
          bounds={filterOptions.price_range}
          range={priceRange}
          onChange={([min, max]) =>
            setPending((prev) => ({ ...prev, minPrice: min, maxPrice: max }))
          }
        />
      </FilterBarDropdown>

      {filterOptions.brands.length > 0 && (
        <FilterBarDropdown label={dict.brands} count={pending.brandIds.length}>
          <FilterBrandList
            brands={filterOptions.brands}
            selectedIds={pending.brandIds}
            onChange={(ids) =>
              setPending((prev) => ({ ...prev, brandIds: ids }))
            }
            searchPlaceholder={dict.brandsSearch}
          />
        </FilterBarDropdown>
      )}

      {filterOptions.seasons.length > 0 && (
        <FilterBarDropdown label={dict.seasons} count={pending.seasonIds.length}>
          <FilterSeasonChips
            seasons={filterOptions.seasons}
            selectedIds={pending.seasonIds}
            onChange={(ids) =>
              setPending((prev) => ({ ...prev, seasonIds: ids }))
            }
          />
        </FilterBarDropdown>
      )}

      <FilterBarQuickChips
        labels={quickFiltersLabels}
        availableKeys={availableQuickFilterKeys}
        hasDiscount={pending.hasDiscount}
        isOriginal={pending.isOriginal}
        onToggle={(key, value) =>
          setPending((prev) => ({ ...prev, [key]: value }))
        }
      />
    </div>
  );
}
