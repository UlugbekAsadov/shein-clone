"use client";

import { useState } from "react";
import { VerifiedCheck } from "@solar-icons/react";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { mobileFilterClothingSizes } from "@/shared/mocks";

const RECOMMENDED_SIZE = "M";

interface IProps {
  initialSelected?: string[];
}

export function FilterMobileSizeList({
  initialSelected = ["M", "L"],
}: IProps) {
  const [selected, setSelected] = useState<string[]>(initialSelected);

  const toggle = (id: string) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );

  return (
    <ul className="flex flex-col">
      {mobileFilterClothingSizes.map((size) => (
        <li key={size.id}>
          <label className="flex w-full cursor-pointer items-center justify-between py-3.5">
            <span className="flex items-center gap-2">
              <span className="text-base font-bold text-foreground">
                {size.id}
              </span>
              {size.id === RECOMMENDED_SIZE && (
                <VerifiedCheck className="size-5 fill-emerald-500 text-white" />
              )}
            </span>
            <Checkbox
              className="size-6 rounded-[6px]"
              checked={selected.includes(size.id)}
              onCheckedChange={() => toggle(size.id)}
            />
          </label>
        </li>
      ))}
    </ul>
  );
}
