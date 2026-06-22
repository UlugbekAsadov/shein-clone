"use client";

import { cn } from "@/lib/utils";
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
      {items.map((item) => {
        const isSelected = selectedIds.includes(item.id);
        return (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => toggle(item.id)}
              className={cn(
                "flex w-full items-center gap-2.5 rounded-[8px] py-2.5 text-left text-sm transition-colors cursor-pointer hover:text-primary font-semibold text-primary",
              )}
            >
              <span
                className="size-5 shrink-0 rounded-full border border-border"
                style={{ backgroundColor: item.hex || "transparent" }}
              />
              <span className="flex-1">{item.name}</span>
              <Checkbox checked={isSelected} className="size-6" />
            </button>
          </li>
        );
      })}
    </ul>
  );
}
