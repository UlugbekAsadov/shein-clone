"use client";

import { Checkbox } from "@/shared/components/ui/checkbox";
import type { ICountedOption } from "@/features/products/pages/[slug]/pages/comments/utils/comments-filter.interface";

interface IProps {
  options: ICountedOption[];
  selected: string[];
  onToggle: (id: string) => void;
}

export function CountedCheckboxList({ options, selected, onToggle }: IProps) {
  return (
    <div className="flex flex-col gap-2.5">
      {options.map((option) => (
        <label
          key={option.id}
          className="flex cursor-pointer items-center justify-between text-sm"
        >
          <span className="flex items-center gap-2.5">
            <Checkbox
              checked={selected.includes(option.id)}
              onCheckedChange={() => onToggle(option.id)}
            />
            <span className="text-foreground">{option.label}</span>
          </span>
          <span className="text-muted-foreground text-xs">{option.count}</span>
        </label>
      ))}
    </div>
  );
}
