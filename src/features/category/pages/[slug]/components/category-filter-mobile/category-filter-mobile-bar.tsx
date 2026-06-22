"use client";

import type { IApiFilterOptions } from "@/types/filter-options.interface";
import type { IActiveFilters } from "@/features/category/pages/[slug]/utils/active-filters.interface";
import { FilterCategoryDrill } from "@/features/category/pages/[slug]/components/category-filters/filter-category-drill";
import { FilterPriceRange } from "@/features/category/pages/[slug]/components/category-filters/filter-price-range";
import { FilterBrandList } from "@/features/category/pages/[slug]/components/category-filters/filter-brand-list";
import { FilterSeasonList } from "@/features/category/pages/[slug]/components/category-filters/filter-season-list";
import { FilterBarAttribute } from "../category-filter-bar/filter-bar-attribute";
import { FilterBarColor } from "../category-filter-bar/filter-bar-color";
import { FilterBarQuickChips } from "../category-filter-bar/filter-bar-quick-chips";
import { MobileFilterChipDrawer } from "./mobile-filter-chip-drawer";

interface IPriceValue {
  min: number | null;
  max: number | null;
}

interface IDict {
  category: string;
  priceRange: string;
  priceTo: string;
  brands: string;
  seasons: string;
  apply: string;
}

interface IProps {
  filterOptions: IApiFilterOptions;
  appliedFilters: IActiveFilters;
  onApply: (filters: IActiveFilters) => void;
  dict: IDict;
  quickFiltersLabels: {
    onSale: string;
    original: string;
    freeDelivery: string;
    new: string;
  };
}

export function CategoryFilterMobileBar({
  filterOptions,
  appliedFilters,
  onApply,
  dict,
  quickFiltersLabels,
}: IProps) {
  const availableQuickFilterKeys =
    filterOptions.quick_filters?.map((f) => f.key) ?? [];

  return (
    <div className="overflow-x-auto px-4 pb-1 scrollbar-none [&::-webkit-scrollbar]:hidden">
      <div className="flex w-max items-center gap-2">
        {filterOptions.attributes.map((attribute) => {
          const itemIds = attribute.items.map((i) => i.id);
          const selectedIds = appliedFilters.attributeItemIds.filter((id) =>
            itemIds.includes(id),
          );
          return (
            <MobileFilterChipDrawer
              key={attribute.id}
              label={attribute.name}
              title={attribute.name}
              applyLabel={dict.apply}
              count={selectedIds.length}
              appliedValue={selectedIds}
              emptyValue={[]}
              onApply={(nextIds) =>
                onApply({
                  ...appliedFilters,
                  attributeItemIds: [
                    ...appliedFilters.attributeItemIds.filter(
                      (id) => !itemIds.includes(id),
                    ),
                    ...nextIds,
                  ],
                })
              }
            >
              {(value, setValue) =>
                attribute.slug === "color" ? (
                  <FilterBarColor
                    items={attribute.items}
                    selectedIds={value}
                    onChange={setValue}
                  />
                ) : (
                  <FilterBarAttribute
                    items={attribute.items}
                    selectedIds={value}
                    onChange={setValue}
                  />
                )
              }
            </MobileFilterChipDrawer>
          );
        })}

        <MobileFilterChipDrawer<IPriceValue>
          label={dict.priceRange}
          title={dict.priceRange}
          applyLabel={dict.apply}
          count={
            appliedFilters.minPrice !== null || appliedFilters.maxPrice !== null
              ? 1
              : 0
          }
          appliedValue={{
            min: appliedFilters.minPrice,
            max: appliedFilters.maxPrice,
          }}
          emptyValue={{ min: null, max: null }}
          onApply={(value) =>
            onApply({
              ...appliedFilters,
              minPrice: value.min,
              maxPrice: value.max,
            })
          }
        >
          {(value, setValue) => (
            <FilterPriceRange
              toLabel={dict.priceTo}
              bounds={filterOptions.price_range}
              range={[
                value.min ?? filterOptions.price_range.min,
                value.max ?? filterOptions.price_range.max,
              ]}
              onChange={([min, max]) => setValue({ min, max })}
            />
          )}
        </MobileFilterChipDrawer>

        {filterOptions.brands.length > 0 && (
          <MobileFilterChipDrawer
            label={dict.brands}
            title={dict.brands}
            applyLabel={dict.apply}
            count={appliedFilters.brandIds.length}
            appliedValue={appliedFilters.brandIds}
            emptyValue={[]}
            onApply={(ids) => onApply({ ...appliedFilters, brandIds: ids })}
          >
            {(value, setValue) => (
              <FilterBrandList
                brands={filterOptions.brands}
                selectedIds={value}
                onChange={setValue}
                showSearch={false}
              />
            )}
          </MobileFilterChipDrawer>
        )}

        {filterOptions.seasons.length > 0 && (
          <MobileFilterChipDrawer
            label={dict.seasons}
            title={dict.seasons}
            applyLabel={dict.apply}
            count={appliedFilters.seasonIds.length}
            appliedValue={appliedFilters.seasonIds}
            emptyValue={[]}
            onApply={(ids) => onApply({ ...appliedFilters, seasonIds: ids })}
          >
            {(value, setValue) => (
              <FilterSeasonList
                seasons={filterOptions.seasons}
                selectedIds={value}
                onChange={setValue}
              />
            )}
          </MobileFilterChipDrawer>
        )}

        <FilterBarQuickChips
          labels={quickFiltersLabels}
          availableKeys={availableQuickFilterKeys}
          hasDiscount={appliedFilters.hasDiscount}
          isOriginal={appliedFilters.isOriginal}
          freeDelivery={appliedFilters.freeDelivery}
          isNew={appliedFilters.isNew}
          onToggle={(key, value) =>
            onApply({ ...appliedFilters, [key]: value })
          }
        />
      </div>
    </div>
  );
}
