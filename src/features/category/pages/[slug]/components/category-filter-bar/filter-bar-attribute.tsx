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
    <ul className="flex max-h-72 flex-col overflow-y-auto">
      {items.map((item) => (
        <li key={item.id} className="py-1.5">
          <label className="flex cursor-pointer items-center gap-2.5 text-sm font-medium">
            <Checkbox
              checked={selectedIds.includes(item.id)}
              onCheckedChange={() => toggle(item.id)}
            />
            <span>{item.name}</span>
          </label>
        </li>
      ))}
    </ul>
  );
}
