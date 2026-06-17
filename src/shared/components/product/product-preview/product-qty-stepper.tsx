"use client";

import { PlusIcon } from "@/shared/components/icons/outline";
import { MinusIcon } from "../../icons/outline/minus-icon";

interface IProps {
  value: number;
  onChange: (value: number) => void;
}

export function ProductQtyStepper({ value, onChange }: IProps) {
  return (
    <div className="">
      <div className="mb-2 font-bold">Qty:</div>
      <div className="flex items-center gap-2 border w-fit rounded-md">
        <button
          type="button"
          onClick={() => onChange(Math.max(1, value - 1))}
          aria-label="Decrease quantity"
          className="grid size-11 cursor-pointer place-items-center rounded-md bg-secondary text-foreground transition hover:bg-muted"
        >
          <MinusIcon className="size-4" />
        </button>
        <div className="grid h-11 min-w-12 place-items-center px-3 text-base font-semibold">
          {value}
        </div>
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          aria-label="Increase quantity"
          className="grid size-11 cursor-pointer place-items-center rounded-md bg-secondary text-foreground transition hover:bg-muted"
        >
          <PlusIcon className="size-4" />
        </button>
      </div>
    </div>
  );
}
