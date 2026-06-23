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

export function CartHeaderBar({
  count,
  allSelected,
  clearing,
  dict,
  onToggleAll,
  onClear,
}: IProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <Checkbox
          checked={allSelected}
          onCheckedChange={onToggleAll}
          aria-label={dict.selectAll}
        />
        <h1 className="text-lg font-bold">
          {count} {dict.itemsInCart}
        </h1>
      </div>
      <button
        type="button"
        onClick={onClear}
        disabled={clearing}
        className="inline-flex items-center gap-1.5 rounded-md bg-rose-50 px-3 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-100 disabled:opacity-50"
      >
        {dict.clearCart}
        <TrashBinMinimalistic className="size-4" weight="Outline" />
      </button>
    </div>
  );
}
