"use client";

import { useState } from "react";
import { Input } from "@/shared/components/ui/input";
import { Checkbox } from "@/shared/components/ui/checkbox";
import type { IBrandFilter } from "@/types/filter.interface";
import { cn } from "@/lib/utils";
import { SearchIcon } from "../../icons/outline";

interface IProps {
  searchPlaceholder: string;
  brands: IBrandFilter[];
  selectedBrands?: number[];
  onToggle?: (id: number) => void;
}

export function BrandFilter({ searchPlaceholder, brands, selectedBrands, onToggle }: IProps) {
  const [query, setQuery] = useState("");

  const filtered = brands.filter((b) =>
    b.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-3">
      <div className="relative">
        <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={searchPlaceholder}
          className="h-9 pl-9 text-sm rounded-[12px] bg-secondary"
        />
      </div>

      <ul className="flex flex-col">
        {filtered.map((brand) => (
          <li
            key={brand.id}
            className="flex items-center justify-between py-1.5 text-sm font-medium"
          >
            <label className="flex flex-1 cursor-pointer items-center gap-2.5">
              <Checkbox
                checked={!!selectedBrands?.includes(Number(brand.id))}
                onCheckedChange={() => onToggle?.(Number(brand.id))}
              />

              <span className="font-medium">{brand.name}</span>
            </label>
            <span className="text-xs text-secondary-foreground">
              {brand.count}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
