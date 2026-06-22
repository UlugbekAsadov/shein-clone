"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Tuning2 } from "@solar-icons/react";
import { ListingFilterDrawer } from "./listing-filter-drawer";
import { ListingFilterChips } from "./listing-filter-chips";

interface IProps {
  title: string;
  priceLabel: string;
  applyLabel: string;
  dict: {
    title: string;
    size: string;
    color: string;
    priceRange: string;
    priceTo: string;
    brands: string;
    style: string;
    material: string;
  };
  filterSlot?: React.ReactNode;
  quickChipsSlot?: React.ReactNode;
}

export function ListingMobileHeader({
  title,
  priceLabel,
  applyLabel,
  dict,
  filterSlot,
  quickChipsSlot,
}: IProps) {
  const router = useRouter();

  return (
    <div className="sticky top-0 z-30 -mx-4 bg-background px-4 md:hidden">
      <div className="flex items-center gap-3 py-3">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Go back"
          className="grid size-9 shrink-0 place-items-center rounded-full bg-secondary text-foreground"
        >
          <ArrowLeft className="size-6" />
        </button>

        <h1 className="flex-1 text-center font-bold text-foreground">
          {title}
        </h1>

        {filterSlot ?? (
          <ListingFilterDrawer
            dict={dict}
            trigger={
              <button
                type="button"
                aria-label={dict.title}
                className="grid size-9 shrink-0 place-items-center rounded-full bg-secondary text-foreground"
              >
                <Tuning2 className="size-6 rotate-90" />
              </button>
            }
          />
        )}
      </div>

      <div className="-mx-4 pb-3">
        {quickChipsSlot ?? (
          <ListingFilterChips
            priceLabel={priceLabel}
            applyLabel={applyLabel}
            dict={dict}
          />
        )}
      </div>
    </div>
  );
}
