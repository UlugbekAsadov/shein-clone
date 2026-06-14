"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { viewModes } from "@/shared/constants/listing.constants";
import { cn } from "@/lib/utils";
import { Box } from "@solar-icons/react";
import { useListingView } from "./hooks/use-listing-view";

interface IProps {
  productFoundLabel: string;
  mostPopularLabel: string;
  priceLabel: string;
  sortLabels: {
    newest: string;
    priceLow: string;
    priceHigh: string;
    rating: string;
  };
  productCount?: number;
}

export function ListingToolbar({
  productFoundLabel,
  mostPopularLabel,
  priceLabel,
  sortLabels,
  productCount,
}: IProps) {
  const { view, setView } = useListingView();

  return (
    <div className={cn("flex-wrap items-center gap-4 hidden", "md:flex")}>
      <p className="text-sm text-secondary-foreground flex items-center gap-1">
        <Box weight="Bold" className="size-4.5" />
        <span className="text-muted-foreground">{productFoundLabel}:</span>{" "}
        <span className="font-semibold text-foreground">
          {productCount ?? 0}
        </span>
      </p>

      <Select defaultValue="popular">
        <SelectTrigger className="h-9.5! text-sm font-bold bg-secondary rounded-[10px] border-0 cursor-pointer">
          <SelectValue placeholder={mostPopularLabel} />
        </SelectTrigger>
        <SelectContent align="start" position="popper">
          <SelectItem value="popular">{mostPopularLabel}</SelectItem>
          <SelectItem value="newest">{sortLabels.newest}</SelectItem>
          <SelectItem value="rating">{sortLabels.rating}</SelectItem>
        </SelectContent>
      </Select>

      <Select defaultValue="price-low">
        <SelectTrigger className="h-9.5! text-sm font-bold bg-secondary rounded-[10px] border-0 cursor-pointer">
          <SelectValue placeholder={priceLabel} />
        </SelectTrigger>
        <SelectContent align="start" position="popper">
          <SelectItem value="price-low">{sortLabels.priceLow}</SelectItem>
          <SelectItem value="price-high">{sortLabels.priceHigh}</SelectItem>
        </SelectContent>
      </Select>

      <div className="ml-auto bg-secondary flex items-center gap-1 p-1 rounded-[12px]">
        {viewModes.map(({ id, icon: Icon }) => {
          const active = view === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setView(id)}
              aria-label={`View ${id}`}
              className={cn(
                "grid size-7.5 place-items-center rounded-[8px] transition-colors cursor-pointer",
                active
                  ? "fill-white text-foreground"
                  : "fill-black text-muted-foreground hover:bg-muted",
              )}
            >
              <Icon
                className={cn(
                  "size-5.5",
                  active ? "fill-black" : "fill-[#A8A8AE]",
                )}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
