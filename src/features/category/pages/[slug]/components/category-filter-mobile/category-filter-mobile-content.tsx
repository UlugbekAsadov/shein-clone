"use client";

import type { IApiFilterOptions } from "@/types/filter-options.interface";
import type { IActiveFilters } from "@/features/category/pages/[slug]/utils/active-filters.interface";
import { FilterMobileSection } from "@/shared/components/listing/filter-mobile/filter-mobile-section";
import { FilterPriceRange } from "@/features/category/pages/[slug]/components/category-filters/filter-price-range";
import { FilterBarQuickChips } from "../category-filter-bar/filter-bar-quick-chips";
import { FilterMobileChipList } from "./filter-mobile-chip-list";

interface IDict {
  quickFilters: string;
  priceRange: string;
  priceTo: string;
  brands: string;
  seasons: string;
}

interface IProps {
  filterOptions: IApiFilterOptions;
  pending: IActiveFilters;
  onChange: (next: IActiveFilters) => void;
  dict: IDict;
  quickFiltersLabels: {
    onSale: string;
    original: string;
    freeDelivery: string;
    new: string;
  };
}

export function CategoryFilterMobileContent({
  filterOptions,
  pending,
  onChange,
  dict,
  quickFiltersLabels,
}: IProps) {
  const priceRange: [number, number] = [
    pending.minPrice ?? filterOptions.price_range.min,
    pending.maxPrice ?? filterOptions.price_range.max,
  ];

  const availableQuickFilterKeys =
    filterOptions.quick_filters?.map((f) => f.key) ?? [];

  const setAttributeIds = (itemIds: number[], nextIds: number[]) =>
    onChange({
      ...pending,
      attributeItemIds: [
        ...pending.attributeItemIds.filter((id) => !itemIds.includes(id)),
        ...nextIds,
      ],
    });

  return (
    <div className="flex flex-col">
      {availableQuickFilterKeys.length > 0 && (
        <FilterMobileSection title={dict.quickFilters} className="border-t-0">
          <div className="flex flex-wrap gap-2">
            <FilterBarQuickChips
              labels={quickFiltersLabels}
              availableKeys={availableQuickFilterKeys}
              hasDiscount={pending.hasDiscount}
              isOriginal={pending.isOriginal}
              freeDelivery={pending.freeDelivery}
              isNew={pending.isNew}
              onToggle={(key, value) => onChange({ ...pending, [key]: value })}
            />
          </div>
        </FilterMobileSection>
      )}

      {filterOptions.attributes.map((attribute) => {
        const itemIds = attribute.items.map((i) => i.id);
        const selectedIds = pending.attributeItemIds.filter((id) =>
          itemIds.includes(id),
        );
        const items =
          attribute.slug === "color"
            ? attribute.items.map((i) => ({
                id: i.id,
                name: i.name,
                hex: i.hex,
              }))
            : attribute.items.map((i) => ({ id: i.id, name: i.name }));
        return (
          <FilterMobileSection key={attribute.id} title={attribute.name}>
            <FilterMobileChipList
              items={items}
              selectedIds={selectedIds}
              onChange={(nextIds) => setAttributeIds(itemIds, nextIds)}
            />
          </FilterMobileSection>
        );
      })}

      <FilterMobileSection title={dict.priceRange}>
        <FilterPriceRange
          toLabel={dict.priceTo}
          bounds={filterOptions.price_range}
          range={priceRange}
          onChange={([min, max]) =>
            onChange({ ...pending, minPrice: min, maxPrice: max })
          }
        />
      </FilterMobileSection>

      {filterOptions.brands.length > 0 && (
        <FilterMobileSection title={dict.brands}>
          <FilterMobileChipList
            items={filterOptions.brands.map((b) => ({
              id: b.id,
              name: b.name,
            }))}
            selectedIds={pending.brandIds}
            onChange={(ids) => onChange({ ...pending, brandIds: ids })}
          />
        </FilterMobileSection>
      )}

      {filterOptions.seasons.length > 0 && (
        <FilterMobileSection title={dict.seasons}>
          <FilterMobileChipList
            items={filterOptions.seasons.map((s) => ({
              id: s.id,
              name: s.name,
            }))}
            selectedIds={pending.seasonIds}
            onChange={(ids) => onChange({ ...pending, seasonIds: ids })}
          />
        </FilterMobileSection>
      )}
    </div>
  );
}
