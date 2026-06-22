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
  searchPlaceholder?: string;
  showSearch?: boolean;
}

export function FilterBrandList({
  brands,
  selectedIds,
  onChange,
  searchPlaceholder,
  showSearch = true,
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
      {showSearch && (
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="h-9 pl-9 text-sm rounded-[12px] bg-secondary"
          />
        </div>
      )}
      <ul className="flex max-h-72 flex-col  pr-1.5">
        {filtered.map((brand) => (
          <li
            key={brand.id}
            className="text-sm font-medium py-2.5"
          >
            <label className="flex items-center justify-between flex-1 cursor-pointer gap-2.5">
              <span className="font-semibold">{brand.name}</span>

              <Checkbox
                checked={selectedIds.includes(brand.id)}
                onCheckedChange={() => toggle(brand.id)}
                className="size-6"
              />
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
