"use client";

import { useState } from "react";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { filterColorSwatches } from "@/shared/mocks";
import { cn } from "@/lib/utils";

interface IProps {
  initialSelected?: string[];
}

export function FilterMobileColorList({
  initialSelected = ["white", "pink"],
}: IProps) {
  const [selected, setSelected] = useState<string[]>(initialSelected);

  const toggle = (id: string) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );

  return (
    <ul className="flex flex-col">
      {filterColorSwatches.map((color) => (
        <li key={color.id}>
          <label className="flex w-full cursor-pointer items-center justify-between py-3">
            <span className="flex items-center gap-3">
              <span
                className={cn(
                  "size-8 shrink-0 rounded-full",
                  color.ring && "border border-border",
                )}
                style={{ backgroundColor: color.hex }}
              />
              <span className="text-base font-bold text-foreground">
                {color.name}
              </span>
            </span>
            <Checkbox
              className="size-6 rounded-[6px]"
              checked={selected.includes(color.id)}
              onCheckedChange={() => toggle(color.id)}
            />
          </label>
        </li>
      ))}
    </ul>
  );
}
