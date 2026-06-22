"use client";

import { useState } from "react";
import type { IApiFilterOptions } from "@/types/filter-options.interface";
import type { IActiveFilters } from "@/features/category/pages/[slug]/utils/active-filters.interface";
import { XIcon } from "@/shared/components/icons/outline";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/components/ui/drawer";
import { Button } from "@/shared/components/ui/button";
import { CategoryFilterMobileContent } from "./category-filter-mobile-content";

const EMPTY_FILTERS: IActiveFilters = {
  categoryIds: [],
  brandIds: [],
  seasonIds: [],
  attributeItemIds: [],
  minPrice: null,
  maxPrice: null,
  hasDiscount: false,
  isOriginal: false,
  freeDelivery: false,
  isNew: false,
};

interface IDict {
  title: string;
  quickFilters: string;
  category: string;
  priceRange: string;
  priceTo: string;
  brands: string;
  brandsSearch: string;
  seasons: string;
  apply: string;
  reset: string;
}

interface IProps {
  filterOptions: IApiFilterOptions;
  appliedFilters: IActiveFilters;
  onApply: (filters: IActiveFilters) => void;
  trigger: React.ReactNode;
  dict: IDict;
  quickFiltersLabels: {
    onSale: string;
    original: string;
    freeDelivery: string;
    new: string;
  };
}

export function CategoryFilterMobile({
  filterOptions,
  appliedFilters,
  onApply,
  trigger,
  dict,
  quickFiltersLabels,
}: IProps) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState<IActiveFilters>(appliedFilters);

  const handleOpenChange = (next: boolean) => {
    if (next) setPending(appliedFilters);
    setOpen(next);
  };

  const handleApply = () => {
    onApply(pending);
    setOpen(false);
  };

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className="z-100 max-h-[92vh]">
        <DrawerHeader className="sticky top-0 z-10 flex shrink-0 items-center justify-between border-b bg-popover px-4 py-3">
          <DrawerTitle className="text-lg font-bold text-foreground">
            {dict.title}
          </DrawerTitle>
          <DrawerClose
            aria-label="Close filter"
            className="grid size-8 place-items-center rounded-full bg-secondary text-foreground"
          >
            <XIcon className="size-4" />
          </DrawerClose>
        </DrawerHeader>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-4">
          <CategoryFilterMobileContent
            filterOptions={filterOptions}
            pending={pending}
            onChange={setPending}
            dict={dict}
            quickFiltersLabels={quickFiltersLabels}
          />
        </div>

        <div className="sticky bottom-0 z-10 flex shrink-0 items-center gap-3 border-t bg-popover p-4">
          <Button
            type="button"
            variant="secondary"
            size="lg"
            onClick={() => setPending(EMPTY_FILTERS)}
            className="h-13 flex-1 rounded-[14px] text-base font-bold"
          >
            {dict.reset}
          </Button>
          <Button
            type="button"
            size="lg"
            onClick={handleApply}
            className="h-13 flex-[2] rounded-[14px] text-base font-bold"
          >
            {dict.apply}
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
