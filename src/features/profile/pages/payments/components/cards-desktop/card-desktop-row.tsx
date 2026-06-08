"use client";

import { useTransition } from "react";
import { TrashBinTrash } from "@solar-icons/react";
import { toast } from "sonner";
import type { ICard } from "@/features/profile/pages/payments/utils/card.interface";
import { CARD_KIND_LABELS } from "@/features/profile/pages/payments/utils/card.interface";
import { setDefaultCardAction } from "@/features/profile/pages/payments/services/card.actions";
import { CardBrandIcon } from "@/features/profile/pages/payments/components/cards-mobile/card-brand-icon";

interface IProps {
  card: ICard;
  maskedNumber: string;
  onDeleteClick: () => void;
  onSetDefault: (id: number) => void;
}

export function CardDesktopRow({
  card,
  maskedNumber,
  onDeleteClick,
  onSetDefault,
}: IProps) {
  const label = CARD_KIND_LABELS[card.card_type];
  const [isPending, startTransition] = useTransition();

  const handleSetDefault = () => {
    if (card.is_default || isPending) return;
    startTransition(async () => {
      const result = await setDefaultCardAction(card.id);
      if (result.ok) {
        onSetDefault(card.id);
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <div className={`flex w-full items-center gap-4 py-3 transition-opacity ${isPending ? "opacity-50" : ""}`}>
      <button
        type="button"
        role="radio"
        aria-checked={card.is_default}
        aria-label={label}
        onClick={handleSetDefault}
        disabled={isPending}
        className="flex flex-1 items-center gap-4 text-left cursor-pointer disabled:cursor-default"
      >
        <span
          className={`relative grid size-5 shrink-0 place-items-center rounded-full transition-colors ${
            card.is_default ? "bg-foreground" : "border-2 border-muted-foreground/40"
          }`}
        >
          {card.is_default && (
            <span className="size-2 rounded-full border-2 bg-white" aria-hidden />
          )}
        </span>

        <CardBrandIcon kind={card.card_type} label={label} />

        <div className="min-w-0 flex-1">
          <p className="text-base font-bold text-foreground">{label}</p>
          <p className="text-sm text-muted-foreground">{maskedNumber}</p>
        </div>
      </button>

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
