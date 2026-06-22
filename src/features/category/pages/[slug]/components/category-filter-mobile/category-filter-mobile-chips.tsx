"use client";

import type { IActiveFilters } from "@/features/category/pages/[slug]/utils/active-filters.interface";
import { FilterBarQuickChips } from "../category-filter-bar/filter-bar-quick-chips";

interface IProps {
  availableKeys: string[];
  appliedFilters: IActiveFilters;
  onApply: (filters: IActiveFilters) => void;
  labels: {
    onSale: string;
    original: string;
    freeDelivery: string;
    new: string;
  };
}

export function CategoryFilterMobileChips({
  availableKeys,
  appliedFilters,
  onApply,
  labels,
}: IProps) {
  if (availableKeys.length === 0) return null;

  return (
    <div className="overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex w-max items-center gap-2">
        <FilterBarQuickChips
          labels={labels}
          availableKeys={availableKeys}
          hasDiscount={appliedFilters.hasDiscount}
          isOriginal={appliedFilters.isOriginal}
          freeDelivery={appliedFilters.freeDelivery}
          isNew={appliedFilters.isNew}
          onToggle={(key, value) => onApply({ ...appliedFilters, [key]: value })}
        />
      </div>
    </div>
  );
}
