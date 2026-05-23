"use client";

import { TrashBinTrash } from "@solar-icons/react";
import type { ICard } from "@/features/profile/pages/payments/utils/card.interface";
import { CardBrandIcon } from "./card-brand-icon";
import { CardDeleteDrawer } from "./card-delete-drawer";

interface IProps {
  card: ICard;
  maskedNumber: string;
  deleteLabels: {
    title: string;
    description: string;
    confirm: string;
    cancel: string;
  };
  onDelete: (id: string) => void;
}

export function CardRow({ card, maskedNumber, deleteLabels, onDelete }: IProps) {
  return (
    <div className="flex items-center gap-3 rounded-[18px] bg-secondary p-3">
      <CardBrandIcon kind={card.kind} label={card.label} />

      <div className="min-w-0 flex-1">
        <p className="text-base font-bold text-foreground">{card.label}</p>
        <p className="text-sm text-muted-foreground">{maskedNumber}</p>
      </div>

      <CardDeleteDrawer
        title={deleteLabels.title}
        description={deleteLabels.description}
        confirmLabel={deleteLabels.confirm}
        cancelLabel={deleteLabels.cancel}
        onConfirm={() => onDelete(card.id)}
        trigger={
          <button
            type="button"
            aria-label="Delete"
            className="grid size-9 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
          >
            <TrashBinTrash className="size-6" />
          </button>
        }
      />
    </div>
  );
}
