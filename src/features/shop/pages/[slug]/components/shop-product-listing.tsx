import type { IDictionary } from "@/core/config/i18n/dictionaries";
import type { IProduct } from "@/types/product.interface";
import type { IFilterState } from "@/types/filter.interface";
import type { IApiShopFilterOptions } from "@/features/shop/utils/shop-response.interface";
import { FilterSidebar } from "@/shared/components/listing/filter-sidebar/filter-sidebar";
import { ListingProductGrid } from "@/shared/components/listing/listing-product-grid";
import { ListingToolbar } from "@/shared/components/listing/listing-toolbar";

interface IProps {
  products: IProduct[];
  productCount: number;
  filterOptions: IApiShopFilterOptions | null;
  isLoading?: boolean;
  filterState: IFilterState;
  onToggleQuickFilter: (key: string) => void;
  onToggleBrand: (id: number) => void;
  onSelectCategory: (id: number | undefined) => void;
  onApplyPrice: (range: [number, number]) => void;
  dict: IDictionary;
}

export function ShopProductListing({
  products,
  productCount,
  filterOptions,
  isLoading,
  filterState,
  onToggleQuickFilter,
  onToggleBrand,
  onSelectCategory,
  onApplyPrice,
  dict,
}: IProps) {
  return (
    <div className="flex gap-8">
      <FilterSidebar
        dict={dict.listing.filter}
        filterOptions={filterOptions}
        filterState={filterState}
        onToggleQuickFilter={onToggleQuickFilter}
        onToggleBrand={onToggleBrand}
        onSelectCategory={onSelectCategory}
        onApplyPrice={onApplyPrice}
      />

      <div className="flex-1">
        <ListingToolbar
          productFoundLabel={dict.listing.toolbar.productFound}
          mostPopularLabel={dict.listing.toolbar.mostPopular}
          priceLabel={dict.listing.toolbar.price}
          sortLabels={{
            newest: dict.listing.toolbar.sortNewest,
            priceLow: dict.listing.toolbar.sortPriceLow,
            priceHigh: dict.listing.toolbar.sortPriceHigh,
            rating: dict.listing.toolbar.sortRating,
          }}
          productCount={productCount}
          isLoading={isLoading}
        />
        <ListingProductGrid products={products} />
      </div>
    </div>
  );
}
