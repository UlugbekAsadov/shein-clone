"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { CloseCircle } from "@solar-icons/react";

interface IProps {
  priceLabel: string;
  sortLabels: {
    priceLow: string;
    priceHigh: string;
  };
}

export function ListingSort({ priceLabel, sortLabels }: IProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlPriceSortValue =
    searchParams?.get("sort_by") === "price" &&
    searchParams?.get("sort_direction") === "asc"
      ? "price-low"
      : searchParams?.get("sort_by") === "price" &&
          searchParams?.get("sort_direction") === "desc"
        ? "price-high"
        : "";

  const [priceSortValue, setPriceSortValue] = useState(urlPriceSortValue);

  useEffect(() => {
    setPriceSortValue(urlPriceSortValue);
  }, [urlPriceSortValue]);

  const applyPriceSort = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams?.toString() ?? "");
      if (value === "price-low") {
        params.set("sort_by", "price");
        params.set("sort_direction", "asc");
      } else if (value === "price-high") {
        params.set("sort_by", "price");
        params.set("sort_direction", "desc");
      } else {
        params.delete("sort_by");
        params.delete("sort_direction");
      }
      const str = params.toString();
      router.replace(`${pathname}${str ? `?${str}` : ""}`, { scroll: false });
    },
    [router, pathname, searchParams],
  );

  const handlePriceSortChange = useCallback(
    (value: string) => {
      setPriceSortValue(value);
      applyPriceSort(value);
    },
    [applyPriceSort],
  );

  const handleClearSort = useCallback(() => {
    setPriceSortValue("");
    applyPriceSort("");
  }, [applyPriceSort]);

  return (
    <div className="flex items-center gap-1">
      <Select value={priceSortValue} onValueChange={handlePriceSortChange}>
        <SelectTrigger className="h-9.5! text-sm font-bold bg-secondary rounded-[10px] border-0 cursor-pointer">
          <SelectValue placeholder={priceLabel} />
        </SelectTrigger>
        <SelectContent align="start" position="popper">
          <SelectItem value="price-low">{sortLabels.priceLow}</SelectItem>
          <SelectItem value="price-high">{sortLabels.priceHigh}</SelectItem>
        </SelectContent>
      </Select>
      {priceSortValue && (
        <button
          type="button"
          onClick={handleClearSort}
          aria-label="Clear sort"
          className="grid size-7 place-items-center rounded-full text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          <CloseCircle className="size-4.5" weight="Bold" />
        </button>
      )}
    </div>
  );
}
