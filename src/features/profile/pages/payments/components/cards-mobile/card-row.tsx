"use client";

import { useState, useTransition } from "react";
import { TrashBinTrash } from "@solar-icons/react";
import { toast } from "sonner";
import type { ICard } from "@/features/profile/pages/payments/utils/card.interface";
import { CARD_KIND_LABELS } from "@/features/profile/pages/payments/utils/card.interface";
import {
  deleteCardAction,
  setDefaultCardAction,
} from "@/features/profile/pages/payments/services/card.actions";
import { CardBrandIcon } from "./card-brand-icon";
import { CardDeleteDrawer } from "./card-delete-drawer";
import { cn } from "@/lib/utils";
import { CheckIcon } from "@/shared/components/icons/outline";
import { useDictionary } from "@/core/config/i18n/use-dictionary";

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
  const dict = useDictionary();
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
      className={cn(
        "flex items-center gap-3 rounded-[18px] bg-secondary p-3 transition-opacity border border-transparent relative",
        isPending && "opacity-50 ",
        card.is_default && "border-foreground",
      )}
    >
      {card.is_default && (
        <span className="absolute -top-2 -left-2 size-5 rounded-full bg-foreground grid place-items-center">
          <CheckIcon className="size-3 text-background" />
        </span>
      )}
      <button
        type="button"
        role="radio"
        aria-checked={card.is_default}
        aria-label={label}
        onClick={handleSetDefault}
        disabled={isPending}
        className="flex flex-1 items-center gap-3 text-left cursor-pointer disabled:cursor-default"
      >
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
            aria-label={dict.common.delete}
            className="grid size-9 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
          >
            <TrashBinTrash className="size-6" />
          </button>
        }
      />
    </div>
  );
}
