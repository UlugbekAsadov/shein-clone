"use client";

import { TrashBinMinimalistic } from "@solar-icons/react";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { Checkbox } from "@/shared/components/ui/checkbox";

interface IProps {
  count: number;
  allSelected: boolean;
  clearing: boolean;
  dict: IDictionary["cart"];
  onToggleAll: () => void;
  onClear: () => void;
}

export function CartHeaderBar({ count, clearing, dict, onClear }: IProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-bold">
          {count} {dict.itemsInCart}
        </h1>
      </div>
      <button
        type="button"
        onClick={onClear}
        disabled={clearing}
        className="inline-flex items-center gap-1.5 rounded-[8px] bg-[#E837371F] px-3 py-2.5 text-sm font-semibold text-[#E83737] transition hover:bg-[#e8373732] cursor-pointer disabled:opacity-50"
      >
        {dict.clearCart}
        <TrashBinMinimalistic className="size-4.5" weight="Outline" />
      </button>
    </div>
  );
}
