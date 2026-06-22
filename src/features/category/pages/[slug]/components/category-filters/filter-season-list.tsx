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
    <ul className="scrollbar-slim flex max-h-72 flex-col overflow-y-auto pr-1.5">
      {seasons.map((season) => (
        <li key={season.id} className="py-1.5">
          <label className="flex cursor-pointer items-center gap-2.5 text-sm font-medium">
            <Checkbox
              checked={selectedIds.includes(season.id)}
              onCheckedChange={() => toggle(season.id)}
            />
            <span>{season.name}</span>
          </label>
        </li>
      ))}
    </ul>
  );
}
