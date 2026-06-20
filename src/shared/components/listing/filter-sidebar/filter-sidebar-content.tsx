import type { IApiShopFilterCategory, IApiShopFilterOptions } from "@/features/shop/utils/shop-response.interface";
import type { ICategoryNode, IBrandFilter, IFilterState } from "@/types/filter.interface";
import { FilterSection } from "./filter-section";
import { QuickFilters } from "./quick-filters";
import { CategoryTree } from "./category-tree";
import { PriceFilter } from "./price-filter";
import { BrandFilter } from "./brand-filter";

interface IProps {
  dict: {
    quickFilters: string;
    category: string;
    priceRange: string;
    priceTo: string;
    brands: string;
    brandsSearch: string;
  };
  filterOptions?: IApiShopFilterOptions | null;
  quickFiltersLabels?: {
    onSale: string;
    freeDelivery: string;
    original: string;
    new: string;
  };
  filterState?: IFilterState;
  onToggleQuickFilter?: (key: string) => void;
  onToggleBrand?: (id: number) => void;
  onSelectCategory?: (id: number | undefined) => void;
  onApplyPrice?: (range: [number, number]) => void;
}

function toNode(c: IApiShopFilterCategory): ICategoryNode {
  return {
    id: String(c.id),
    name: c.name,
    count: c.products_count,
    children: c.children.map(toNode),
  };
}

const QUICK_FILTER_FALLBACK_KEYS = [
  { key: "has_discount", labelKey: "onSale" },
  { key: "free_delivery", labelKey: "freeDelivery" },
  { key: "is_original", labelKey: "original" },
  { key: "is_new", labelKey: "new" },
] as const;

export function FilterSidebarContent({
  dict,
  filterOptions,
  quickFiltersLabels,
  filterState,
  onToggleQuickFilter,
  onToggleBrand,
  onSelectCategory,
  onApplyPrice,
}: IProps) {
  const quickFilters = filterOptions
    ? filterOptions.quick_filters.filter((f) => f.available)
    : quickFiltersLabels
      ? QUICK_FILTER_FALLBACK_KEYS.map((f) => ({
          key: f.key,
          label: quickFiltersLabels[f.labelKey],
        }))
      : [];
  const categoryNodes: ICategoryNode[] = filterOptions?.categories.map(toNode) ?? [];
  const brands: IBrandFilter[] = filterOptions?.brands.map((b) => ({
    id: String(b.id),
    name: b.name,
    count: b.products_count,
  })) ?? [];
  const priceRange = filterOptions?.price_range ?? null;

  return (
    <>
      <QuickFilters
        title={dict.quickFilters}
        filters={quickFilters}
        selectedFilters={filterState?.quickFilters}
        onToggle={onToggleQuickFilter}
      />

      {categoryNodes.length > 0 && (
        <FilterSection title={dict.category}>
          <CategoryTree
            nodes={categoryNodes}
            selectedId={filterState?.categoryId !== undefined ? String(filterState.categoryId) : undefined}
            onSelect={(id) => onSelectCategory?.(id !== undefined ? Number(id) : undefined)}
          />
        </FilterSection>
      )}

      {priceRange && (
        <FilterSection title={dict.priceRange}>
          <PriceFilter
            toLabel={dict.priceTo}
            min={priceRange.min}
            max={priceRange.max}
            onApply={onApplyPrice}
          />
        </FilterSection>
      )}

      {brands.length > 0 && (
        <FilterSection title={dict.brands}>
          <BrandFilter
            searchPlaceholder={dict.brandsSearch}
            brands={brands}
            selectedBrands={filterState?.brandIds}
            onToggle={onToggleBrand}
          />
        </FilterSection>
      )}
    </>
  );
}
