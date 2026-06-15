"use client";

import { cn } from "@/lib/utils";
import { useListingView } from "./hooks/use-listing-view";
import { ProductCardSkeleton } from "@/shared/components/product/product-card-skeleton";
import { ProductListItemSkeleton } from "@/shared/components/product/product-list-item-skeleton";

const desktopGridByView = {
  comfortable: "md:grid-cols-3",
  compact: "md:grid-cols-4",
  list: "md:grid-cols-1",
} as const;

const desktopCountByView = {
  comfortable: 9,
  compact: 12,
  list: 5,
} as const;

export function ListingProductGridSkeleton() {
  const { view } = useListingView();

  return (
    <div className="mt-2 md:mt-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>

      {view === "list" ? (
        <div className="hidden flex-col gap-3 md:flex">
          {Array.from({ length: desktopCountByView.list }).map((_, i) => (
            <ProductListItemSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className={cn("hidden gap-3 md:grid", desktopGridByView[view])}>
          {Array.from({ length: desktopCountByView[view] }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      )}
    </div>
  );
}
