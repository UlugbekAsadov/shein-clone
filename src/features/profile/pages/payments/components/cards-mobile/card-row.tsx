"use client";

import { useState, useTransition } from "react";
import { TrashBinTrash } from "@solar-icons/react";
import { toast } from "sonner";
import type { ICard } from "@/features/profile/pages/payments/utils/card.interface";
import { CARD_KIND_LABELS } from "@/features/profile/pages/payments/utils/card.interface";
import { deleteCardAction, setDefaultCardAction } from "@/features/profile/pages/payments/services/card.actions";
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
  onDelete: (id: number) => void;
  onSetDefault: (id: number) => void;
}

export function CardRow({
  card,
  maskedNumber,
  deleteLabels,
  onDelete,
  onSetDefault,
}: IProps) {
  const label = CARD_KIND_LABELS[card.card_type];
  const [isPending, startTransition] = useTransition();
  const [isDeletePending, startDeleteTransition] = useTransition();
  const [drawerOpen, setDrawerOpen] = useState(false);

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

  const handleDelete = () => {
    startDeleteTransition(async () => {
      const result = await deleteCardAction(card.id);
      if (result.ok) {
        setDrawerOpen(false);
        onDelete(card.id);
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <div
      className={`flex items-center gap-3 rounded-[18px] bg-secondary p-3 transition-opacity ${isPending ? "opacity-50" : ""}`}
    >
      <button
        type="button"
        role="radio"
        aria-checked={card.is_default}
        aria-label={label}
        onClick={handleSetDefault}
        disabled={isPending}
        className="flex flex-1 items-center gap-3 text-left cursor-pointer disabled:cursor-default"
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

      <CardDeleteDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        title={deleteLabels.title}
        description={deleteLabels.description}
        confirmLabel={deleteLabels.confirm}
        cancelLabel={deleteLabels.cancel}
        isPending={isDeletePending}
        onConfirm={handleDelete}
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
