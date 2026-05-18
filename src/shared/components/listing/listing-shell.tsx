import type { IProduct } from "@/types/product.interface";
import { ProductGrid } from "@/shared/components/product/product-grid";
import { FilterSidebar } from "./filter-sidebar/filter-sidebar";
import { ListingMobileHeader } from "./listing-mobile-header/listing-mobile-header";
import { ListingTabs } from "./listing-tabs";
import { ListingToolbar } from "./listing-toolbar";
import { cn } from "@/lib/utils";

interface IProps {
  title: string;
  header: React.ReactNode;
  products: IProduct[];
  dict: {
    tabs: { similar: string; deals: string };
    toolbar: {
      productFound: string;
      mostPopular: string;
      price: string;
      sortNewest: string;
      sortPriceLow: string;
      sortPriceHigh: string;
      sortRating: string;
    };
    filter: {
      title: string;
      quickFilters: string;
      category: string;
      size: string;
      sizeClothing: string;
      sizeShoes: string;
      color: string;
      priceRange: string;
      priceTo: string;
      brands: string;
      brandsSearch: string;
      style: string;
      material: string;
      apply: string;
    };
  };
  quickFiltersLabels: {
    onSale: string;
    freeDelivery: string;
    original: string;
    new: string;
  };
}

export function ListingShell({
  title,
  header,
  products,
  dict,
  quickFiltersLabels,
}: IProps) {
  return (
    <div className="mx-auto max-w-360 px-4 pb-6 pt-2 md:px-6 md:pt-4">
      <ListingMobileHeader
        title={title}
        priceLabel={dict.toolbar.price}
        applyLabel={dict.filter.apply}
        dict={dict.filter}
      />

      <div className={cn("hidden", "md:block")}>
        {header}
        <div className="mt-4">
          <ListingTabs
            similarLabel={dict.tabs.similar}
            dealsLabel={dict.tabs.deals}
          />
        </div>
      </div>

      <div className="md:mt-6 md:flex md:gap-8">
        <FilterSidebar
          dict={dict.filter}
          quickFiltersLabels={quickFiltersLabels}
        />

        <div className="flex-1">
          <ListingToolbar
            productFoundLabel={dict.toolbar.productFound}
            mostPopularLabel={dict.toolbar.mostPopular}
            priceLabel={dict.toolbar.price}
            sortLabels={{
              newest: dict.toolbar.sortNewest,
              priceLow: dict.toolbar.sortPriceLow,
              priceHigh: dict.toolbar.sortPriceHigh,
              rating: dict.toolbar.sortRating,
            }}
          />
          <ProductGrid
            products={products}
            className="mt-2 grid-cols-2 sm:grid-cols-3 md:mt-6 md:grid-cols-4"
          />
        </div>
      </div>
    </div>
  );
}
