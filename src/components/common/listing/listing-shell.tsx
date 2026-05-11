import type { IProduct } from "@/lib/interfaces/product.interface";
import { ProductGrid } from "@/components/common/product/product-grid";
import { FilterSidebar } from "./filter-sidebar/filter-sidebar";
import { ListingTabs } from "./listing-tabs";
import { ListingToolbar } from "./listing-toolbar";

interface IProps {
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
  header,
  products,
  dict,
  quickFiltersLabels,
}: IProps) {
  return (
    <div className="mx-auto max-w-[1440px] px-6 py-6">
      {header}

      <div className="mt-4">
        <ListingTabs
          similarLabel={dict.tabs.similar}
          dealsLabel={dict.tabs.deals}
        />
      </div>

      <div className="mt-6 flex gap-8">
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
            className="mt-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
          />
        </div>
      </div>
    </div>
  );
}
