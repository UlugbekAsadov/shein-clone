"use client";

import { PlusIcon } from "@/shared/components/icons/outline";
import { MinusIcon } from "@/shared/components/icons/outline/minus-icon";

interface IProps {
  value: number;
  onChange: (value: number) => void;
}

export function CartItemQtyStepper({ value, onChange }: IProps) {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-3xl bg-indigo-50 p-1.5">
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        aria-label="Decrease quantity"
        className="grid size-11 cursor-pointer place-items-center rounded-2xl bg-indigo-100/60 text-foreground transition hover:bg-indigo-100"
      >
        <MinusIcon className="size-5" />
      </button>
      <div className="grid h-11 min-w-14 place-items-center rounded-2xl bg-white px-4 text-lg font-bold">
        {value}
      </div>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        aria-label="Increase quantity"
        className="grid size-11 cursor-pointer place-items-center rounded-2xl bg-indigo-100/60 text-foreground transition hover:bg-indigo-100"
      >
        <PlusIcon className="size-5" />
      </button>
    </div>
  );
}
