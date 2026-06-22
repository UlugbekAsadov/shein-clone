"use client";

import { Checkbox } from "@/shared/components/ui/checkbox";
import type { IApiFilterAttributeItem } from "@/types/filter-options.interface";

interface IProps {
  items: IApiFilterAttributeItem[];
  selectedIds: number[];
  onChange: (ids: number[]) => void;
}

export function FilterBarColor({ items, selectedIds, onChange }: IProps) {
  const toggle = (id: number) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((i) => i !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };

  return (
    <ul className="scrollbar-slim flex max-h-[70vh] flex-col overflow-y-auto pr-1.5">
      {items.map((item) => (
        <li key={item.id} className="py-2.5">
          <label className="flex cursor-pointer items-center gap-2.5 text-sm font-semibold text-primary transition-colors hover:text-primary">
            <span
              className="size-5 shrink-0 rounded-full border border-border"
              style={{ backgroundColor: item.hex || "transparent" }}
            />
            <span className="flex-1">{item.name}</span>
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
