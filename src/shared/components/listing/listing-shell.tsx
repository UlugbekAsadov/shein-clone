import type { IProduct } from "@/types/product.interface";
import { ListingMobileHeader } from "./listing-mobile-header/listing-mobile-header";
import { ListingProductGrid } from "./listing-product-grid";
import { ListingProductGridSkeleton } from "./listing-product-grid-skeleton";
import { ListingCount } from "./listing-count";
import { ListingViewToggle } from "./listing-view-toggle";

interface IProps {
  title: string;
  header: React.ReactNode;
  products: IProduct[];
  filterBarSlot?: React.ReactNode;
  bannerSlot?: React.ReactNode;
  mobileFilterSlot?: React.ReactNode;
  mobileQuickChipsSlot?: React.ReactNode;
  productCount?: number;
  isLoading?: boolean;
  categoryName?: string;
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
  filterBarSlot,
  bannerSlot,
  mobileFilterSlot,
  mobileQuickChipsSlot,
  productCount,
  isLoading,
  categoryName,
  dict,
}: IProps) {
  return (
    <div className="mx-auto max-w-360 px-4 pb-6 pt-2 md:px-6 md:pt-4">
      <ListingMobileHeader
        title={title}
        priceLabel={dict.toolbar.price}
        applyLabel={dict.filter.apply}
        dict={dict.filter}
        filterSlot={mobileFilterSlot}
        quickChipsSlot={mobileQuickChipsSlot}
      />

      {header && <div className="hidden md:mb-4 md:block">{header}</div>}

      <div className="hidden md:block">
        <ListingCount
          label={dict.toolbar.productFound}
          count={productCount}
          isLoading={isLoading}
          categoryName={categoryName}
        />

        {bannerSlot && <div className="mt-3">{bannerSlot}</div>}

        <div className="mt-4 mb-6 flex items-start gap-3">
          <div className="flex flex-1 flex-wrap items-center gap-2">
            {filterBarSlot}
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <ListingViewToggle />
          </div>
        </div>
      </div>

      {isLoading ? (
        <ListingProductGridSkeleton />
      ) : (
        <ListingProductGrid products={products} />
      )}
    </div>
  );
}
