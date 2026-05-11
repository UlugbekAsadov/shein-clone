"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  viewModes,
  productCountMock,
} from "@/lib/constants/listing.constants";
import { cn } from "@/lib/utils";

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
}

export function ListingToolbar({
  productFoundLabel,
  mostPopularLabel,
  priceLabel,
  sortLabels,
}: IProps) {
  const [view, setView] = useState<(typeof viewModes)[number]["id"]>(
    "comfortable",
  );

  return (
    <div className="flex flex-wrap items-center gap-4">
      <p className="text-sm">
        <span className="text-muted-foreground">{productFoundLabel}:</span>{" "}
        <span className="font-semibold">{productCountMock}</span>
      </p>

      <Select defaultValue="popular">
        <SelectTrigger className="h-9 min-w-40 text-sm">
          <SelectValue placeholder={mostPopularLabel} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="popular">{mostPopularLabel}</SelectItem>
          <SelectItem value="newest">{sortLabels.newest}</SelectItem>
          <SelectItem value="rating">{sortLabels.rating}</SelectItem>
        </SelectContent>
      </Select>

      <Select defaultValue="price-low">
        <SelectTrigger className="h-9 min-w-32 text-sm">
          <SelectValue placeholder={priceLabel} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="price-low">{sortLabels.priceLow}</SelectItem>
          <SelectItem value="price-high">{sortLabels.priceHigh}</SelectItem>
        </SelectContent>
      </Select>

      <div className="ml-auto flex items-center gap-1">
        {viewModes.map(({ id, icon: Icon }) => {
          const active = view === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setView(id)}
              aria-label={`View ${id}`}
              className={cn(
                "grid size-9 place-items-center rounded-md transition-colors",
                active
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:bg-muted",
              )}
            >
              <Icon className="size-4" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
