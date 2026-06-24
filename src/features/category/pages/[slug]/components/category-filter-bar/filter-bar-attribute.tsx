"use client";

import { Checkbox } from "@/shared/components/ui/checkbox";
import type { IApiFilterAttributeItem } from "@/types/filter-options.interface";

interface IProps {
  items: IApiFilterAttributeItem[];
  selectedIds: number[];
  onChange: (ids: number[]) => void;
}

export function FilterBarAttribute({ items, selectedIds, onChange }: IProps) {
  const toggle = (id: number) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((i) => i !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };

  return (
    <ul className="scrollbar-slim overflow-y-auto overflow-x-hidden flex max-h-72 flex-col pr-1.5">
      {items.map((item) => (
        <li key={item.id} className="py-2.5">
          <label className="flex items-center justify-between cursor-pointer gap-2.5 text-sm font-semibold">
            <span>{item.name}</span>
            <Checkbox
              checked={selectedIds.includes(item.id)}
              onCheckedChange={() => toggle(item.id)}
              className="size-6"
            />
          </label>
        </li>
      ))}
    </ul>
  );
}
