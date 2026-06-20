import { cn } from "@/lib/utils";
import type { IApiShopFilterOptions } from "@/features/shop/utils/shop-response.interface";
import type { IFilterState } from "@/types/filter.interface";
import { FilterSidebarContent } from "./filter-sidebar-content";

interface IProps {
  dict: {
    title: string;
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

export function FilterSidebar({
  dict,
  filterOptions,
  quickFiltersLabels,
  filterState,
  onToggleQuickFilter,
  onToggleBrand,
  onSelectCategory,
  onApplyPrice,
}: IProps) {
  return (
    <aside className={cn("w-60 shrink-0 hidden", "md:block")}>
      <h2 className="pb-3 text-lg font-bold border-b">{dict.title}</h2>

      <FilterSidebarContent
        dict={dict}
        filterOptions={filterOptions}
        quickFiltersLabels={quickFiltersLabels}
        filterState={filterState}
        onToggleQuickFilter={onToggleQuickFilter}
        onToggleBrand={onToggleBrand}
        onSelectCategory={onSelectCategory}
        onApplyPrice={onApplyPrice}
      />
    </aside>
  );
}
