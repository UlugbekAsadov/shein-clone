"use client";

import { useState } from "react";
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
  const [priceApplied, setPriceApplied] = useState(false);
  const [priceKey, setPriceKey] = useState(0);

  const [sizeApplied, setSizeApplied] = useState(false);
  const [sizeKey, setSizeKey] = useState(0);

  const [colorApplied, setColorApplied] = useState(false);
  const [colorKey, setColorKey] = useState(0);

  const [brandsApplied, setBrandsApplied] = useState(false);
  const [brandsKey, setBrandsKey] = useState(0);

  return (
    <div className="overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex w-max items-center gap-2">
        <FilterChipDrawer
          title={priceLabel}
          applyLabel={applyLabel}
          onApply={() => setPriceApplied(true)}
          trigger={
            <ListingFilterChipTrigger
              label={priceLabel}
              applied={priceApplied}
              onClear={() => {
                setPriceApplied(false);
                setPriceKey((k) => k + 1);
              }}
            />
          }
        >
          <PriceFilter key={priceKey} toLabel={dict.priceTo} />
        </FilterChipDrawer>

        <FilterChipDrawer
          title={dict.size}
          applyLabel={applyLabel}
          onApply={() => setSizeApplied(true)}
          trigger={
            <ListingFilterChipTrigger
              label={dict.size}
              applied={sizeApplied}
              onClear={() => {
                setSizeApplied(false);
                setSizeKey((k) => k + 1);
              }}
            />
          }
        >
          <FilterMobileSizeList key={sizeKey} />
        </FilterChipDrawer>

        <FilterChipDrawer
          title={dict.color}
          applyLabel={applyLabel}
          onApply={() => setColorApplied(true)}
          trigger={
            <ListingFilterChipTrigger
              label={dict.color}
              applied={colorApplied}
              onClear={() => {
                setColorApplied(false);
                setColorKey((k) => k + 1);
              }}
            />
          }
        >
          <FilterMobileColorList key={colorKey} />
        </FilterChipDrawer>

        <FilterChipDrawer
          title="Brand"
          applyLabel={applyLabel}
          onApply={() => setBrandsApplied(true)}
          trigger={
            <ListingFilterChipTrigger
              label={dict.brands}
              applied={brandsApplied}
              onClear={() => {
                setBrandsApplied(false);
                setBrandsKey((k) => k + 1);
              }}
            />
          }
        >
          <FilterMobileBrand key={brandsKey} />
        </FilterChipDrawer>
      </div>
    </div>
  );
}
