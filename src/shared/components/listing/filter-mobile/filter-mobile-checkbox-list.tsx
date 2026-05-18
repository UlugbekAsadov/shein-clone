"use client";

import { useState } from "react";
import { Checkbox } from "@/shared/components/ui/checkbox";

interface IOption {
  id: string;
  label: string;
}

interface IProps {
  options: IOption[];
  initialSelected?: string[];
}

export function FilterMobileCheckboxList({
  options,
  initialSelected = [],
}: IProps) {
  const [selected, setSelected] = useState<string[]>(initialSelected);

  const toggle = (id: string) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );

  return (
    <ul className="flex flex-col">
      {options.map((option) => (
        <li key={option.id}>
          <label className="flex w-full cursor-pointer items-center justify-between py-3">
            <span className="text-sm text-foreground">{option.label}</span>
            <Checkbox
              className="size-5 rounded-[6px]"
              checked={selected.includes(option.id)}
              onCheckedChange={() => toggle(option.id)}
            />
          </label>
        </li>
      ))}
    </ul>
  );
}
