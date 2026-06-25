"use client";

import { PlusIcon } from "@/shared/components/icons/outline";
import { MinusIcon } from "@/shared/components/icons/outline/minus-icon";
import { useDictionary } from "@/core/config/i18n/use-dictionary";

interface IProps {
  value: number;
  onChange: (value: number) => void;
}

export function CartItemQtyStepper({ value, onChange }: IProps) {
  const dict = useDictionary();
  return (
    <div className="inline-flex items-center gap-1.5 rounded-3xl bg-white border border-border">
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        aria-label={dict.cart.decreaseQuantity}
        className="grid size-8 md:size-11 cursor-pointer place-items-center rounded-[8px] md:rounded-sm bg-[#ECECF2] text-foreground transition hover:bg-[#ececf2d4]"
      >
        <MinusIcon className="size-5" />
      </button>
      <div className="grid h-8 md:h-11  place-items-center rounded-[8px] md:rounded-2xl bg-white px-2 md:px-3 text-sm md:text-lg font-bold tabular-nums">
        {value}
      </div>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        aria-label={dict.cart.increaseQuantity}
        className="grid size-8 md:size-11 cursor-pointer place-items-center rounded-[8px] md:rounded-sm bg-[#ECECF2] text-foreground transition hover:bg-[#ececf2d4]"
      >
        <PlusIcon className="size-5" />
      </button>
    </div>
  );
}
