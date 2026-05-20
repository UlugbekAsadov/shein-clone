"use client";

import { TrashBinTrash } from "@solar-icons/react";
import type { ICard } from "@/features/profile/interfaces/card.interface";
import { CardBrandIcon } from "@/features/profile/components/cards-mobile/card-brand-icon";

interface IProps {
  card: ICard;
  maskedNumber: string;
  onDeleteClick: () => void;
}

export function CardDesktopRow({ card, maskedNumber, onDeleteClick }: IProps) {
  return (
    <div className="flex items-center gap-4 py-3">
      <CardBrandIcon kind={card.kind} label={card.label} />

      <div className="min-w-0 flex-1">
        <p className="text-base font-bold text-foreground">{card.label}</p>
        <p className="text-sm text-muted-foreground">{maskedNumber}</p>
      </div>

      <button
        type="button"
        onClick={onDeleteClick}
        aria-label="Delete card"
        className="grid size-11.5 shrink-0 place-items-center rounded-sm cursor-pointer border border-border text-foreground transition-colors hover:bg-secondary"
      >
        <TrashBinTrash className="size-6" />
      </button>
    </div>
  );
}
