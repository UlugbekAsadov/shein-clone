"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import type { ICountedOption } from "../../_lib/interface/comments-filter.interface";

interface IProps {
  options: ICountedOption[];
  defaultSelected?: string[];
}

export function CountedCheckboxList({ options, defaultSelected = [] }: IProps) {
  const [selected, setSelected] = useState<string[]>(defaultSelected);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

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
              onCheckedChange={() => toggle(option.id)}
            />
            <span className="text-foreground">{option.label}</span>
          </span>
          <span className="text-muted-foreground text-xs">{option.count}</span>
        </label>
      ))}
    </div>
  );
}
