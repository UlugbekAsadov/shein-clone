import type { IDictionary } from "@/core/config/i18n/dictionaries";
import type { IProduct } from "@/types/product.interface";
import { FilterSidebar } from "@/shared/components/listing/filter-sidebar/filter-sidebar";
import { ListingProductGrid } from "@/shared/components/listing/listing-product-grid";
import { ListingToolbar } from "@/shared/components/listing/listing-toolbar";

interface IProps {
  products: IProduct[];
  dict: IDictionary;
}

export function ShopProductListing({ products, dict }: IProps) {
  return (
    <div className="flex gap-8">
      <FilterSidebar
        dict={dict.listing.filter}
        quickFiltersLabels={dict.nav.filters}
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
        />
        <ListingProductGrid products={products} />
      </div>
    </div>
  );
}
