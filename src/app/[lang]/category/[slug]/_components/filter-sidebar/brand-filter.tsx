"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { brandFilters } from "../../_lib/category-page.mocks";
import { cn } from "@/lib/utils";

interface IProps {
  searchPlaceholder: string;
}

export function BrandFilter({ searchPlaceholder }: IProps) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  const filtered = brandFilters.filter((b) =>
    b.name.toLowerCase().includes(query.toLowerCase()),
  );

  const toggle = (id: string) =>
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="flex flex-col gap-3">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={searchPlaceholder}
          className="h-9 pl-9 text-sm"
        />
      </div>

      <ul className="flex flex-col">
        {filtered.map((brand) => (
          <li
            key={brand.id}
            className="flex items-center justify-between py-1.5 text-sm"
          >
            <label className="flex flex-1 cursor-pointer items-center gap-2.5">
              <Checkbox
                checked={!!selected[brand.id]}
                onCheckedChange={() => toggle(brand.id)}
              />
              <span
                aria-hidden
                className={cn(
                  "inline-block size-2.5 rounded-full border border-border",
                )}
                style={{ backgroundColor: brand.swatch }}
              />
              <span className="font-medium">{brand.name}</span>
            </label>
            <span className="text-xs text-muted-foreground">{brand.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
