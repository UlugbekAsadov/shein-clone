"use client";

import { PlusIcon } from "@/shared/components/icons/outline";
import { MinusIcon } from "@/shared/components/icons/outline/minus-icon";

interface IProps {
  value: number;
  disabled?: boolean;
  onChange: (value: number) => void;
}

export function CartItemQtyStepper({ value, disabled, onChange }: IProps) {
  return (
    <div className="flex items-center rounded-md border border-border">
      <button
        type="button"
        disabled={disabled || value <= 1}
        onClick={() => onChange(value - 1)}
        aria-label="Decrease quantity"
        className="grid size-9 cursor-pointer place-items-center rounded-l-md text-foreground transition hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-40"
      >
        <MinusIcon className="size-4" />
      </button>
      <div className="grid h-9 min-w-10 place-items-center px-2 text-sm font-semibold">
        {value}
      </div>
      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange(value + 1)}
        aria-label="Increase quantity"
        className="grid size-9 cursor-pointer place-items-center rounded-r-md text-foreground transition hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-40"
      >
        <PlusIcon className="size-4" />
      </button>
    </div>
  );
}
