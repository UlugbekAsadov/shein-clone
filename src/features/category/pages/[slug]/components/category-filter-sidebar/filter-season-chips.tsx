"use client";

import { cn } from "@/lib/utils";
import type { IApiFilterSeason } from "@/types/filter-options.interface";

interface IProps {
  seasons: IApiFilterSeason[];
  selectedIds: number[];
  onChange: (ids: number[]) => void;
}

export function FilterSeasonChips({ seasons, selectedIds, onChange }: IProps) {
  const toggle = (id: number) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((i) => i !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {seasons.map((season) => {
        const active = selectedIds.includes(season.id);
        return (
          <button
            key={season.id}
            type="button"
            onClick={() => toggle(season.id)}
            className={cn(
              "rounded-[8px] border px-3 py-1 text-xs font-medium transition-colors cursor-pointer",
              active
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-secondary text-foreground hover:text-foreground",
            )}
          >
            {season.name}
          </button>
        );
      })}
    </div>
  );
}
