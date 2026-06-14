"use client";

import { useState } from "react";
import { Input } from "@/shared/components/ui/input";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { SearchIcon } from "@/shared/components/icons/outline";
import type { IApiFilterBrand } from "@/types/filter-options.interface";

interface IProps {
  brands: IApiFilterBrand[];
  selectedIds: number[];
  onChange: (ids: number[]) => void;
  searchPlaceholder: string;
}

export function FilterBrandList({
  brands,
  selectedIds,
  onChange,
  searchPlaceholder,
}: IProps) {
  const [query, setQuery] = useState("");

  const filtered = brands.filter((b) =>
    b.name.toLowerCase().includes(query.toLowerCase()),
  );

  const toggle = (id: number) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((i) => i !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };

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
                checked={selectedIds.includes(brand.id)}
                onCheckedChange={() => toggle(brand.id)}
              />
              <span className="font-medium">{brand.name}</span>
            </label>
            <span className="text-xs text-secondary-foreground">
              {brand.products_count}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
