"use client";

import type { IProduct } from "@/types/product.interface";
import { ProductCard } from "@/shared/components/product/product-card";
import { cn } from "@/lib/utils";
import { useListingView } from "./hooks/use-listing-view";

interface IProps {
  products: IProduct[];
  className?: string;
  mobileGridClassName?: string;
}

const desktopGridByView = {
  comfortable: "md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
  compact: "md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6",
} as const;

export function ListingProductGrid({
  products,
  className,
  mobileGridClassName = "grid-cols-2 sm:grid-cols-3",
}: IProps) {
  const { view } = useListingView();

  return (
    <div className={cn("mt-2 md:mt-6", className)}>
      <div className={cn("grid gap-3 md:hidden", mobileGridClassName)}>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <div className={cn("hidden gap-3 md:grid", desktopGridByView[view])}>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
