"use client";

import { Checkbox } from "@/shared/components/ui/checkbox";
import type { IApiFilterSeason } from "@/types/filter-options.interface";

interface IProps {
  seasons: IApiFilterSeason[];
  selectedIds: number[];
  onChange: (ids: number[]) => void;
}

export function FilterSeasonList({ seasons, selectedIds, onChange }: IProps) {
  const toggle = (id: number) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((i) => i !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };

  return (
    <ul className="flex max-h-72 flex-col pr-1.5">
      {seasons.map((season) => (
        <li key={season.id} className="py-2.5">
          <label className="flex items-center justify-between cursor-pointer gap-2.5 text-sm font-semibold">
            <span>{season.name}</span>
            <Checkbox
              checked={selectedIds.includes(season.id)}
              onCheckedChange={() => toggle(season.id)}
              className="size-6"
            />
          </label>
        </li>
      ))}
    </ul>
  );
}
