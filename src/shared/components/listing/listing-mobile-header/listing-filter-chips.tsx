import { PriceFilter } from "../filter-sidebar/price-filter";
import { FilterMobileSizeList } from "../filter-mobile/filter-mobile-size-list";
import { FilterMobileColorList } from "../filter-mobile/filter-mobile-color-list";
import { FilterMobileBrand } from "../filter-mobile/filter-mobile-brand";
import { FilterChipDrawer } from "./filter-chip-drawer";
import { ListingFilterChipTrigger } from "./listing-filter-chip-trigger";

interface IProps {
  priceLabel: string;
  applyLabel: string;
  dict: {
    size: string;
    color: string;
    priceRange: string;
    priceTo: string;
    brands: string;
  };
}

export function ListingFilterChips({
  priceLabel,
  applyLabel,
  dict,
}: IProps) {
  return (
    <div className="overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex w-max items-center gap-2">
        <FilterChipDrawer
          title={priceLabel}
          applyLabel={applyLabel}
          trigger={<ListingFilterChipTrigger label={priceLabel} />}
        >
          <PriceFilter toLabel={dict.priceTo} />
        </FilterChipDrawer>

        <FilterChipDrawer
          title={dict.size}
          applyLabel={applyLabel}
          trigger={<ListingFilterChipTrigger label={dict.size} />}
        >
          <FilterMobileSizeList />
        </FilterChipDrawer>

        <FilterChipDrawer
          title={dict.color}
          applyLabel={applyLabel}
          trigger={<ListingFilterChipTrigger label={dict.color} />}
        >
          <FilterMobileColorList />
        </FilterChipDrawer>

        <FilterChipDrawer
          title="Brand"
          applyLabel={applyLabel}
          trigger={<ListingFilterChipTrigger label={dict.brands} />}
        >
          <FilterMobileBrand />
        </FilterChipDrawer>
      </div>
    </div>
  );
}
