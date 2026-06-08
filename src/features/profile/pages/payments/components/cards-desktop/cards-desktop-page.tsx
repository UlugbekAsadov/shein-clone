"use client";

import { useState } from "react";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { PlusIcon } from "@/shared/components/icons/outline";
import type { ICard } from "@/features/profile/pages/payments/utils/card.interface";
import { Button } from "@/shared/components/ui/button";
import { CardDesktopRow } from "./card-desktop-row";
import { CardsDesktopEmpty } from "./cards-desktop-empty";
import { CardRemoveDialog } from "./card-remove-dialog";
import { CardAddDialog } from "./card-add-dialog";
import { Separator } from "@/shared/components/ui/separator";

interface IProps {
  dict: IDictionary;
  initialCards: ICard[];
}

export function CardsDesktopPage({ dict, initialCards }: IProps) {
  const t = dict.profile.payments;
  const [cards, setCards] = useState<ICard[]>(initialCards);
  const [addOpen, setAddOpen] = useState(false);
  const [removeId, setRemoveId] = useState<number | null>(null);

  const handleRemove = (id: number) => {
    setCards((prev) => prev.filter((card) => card.id !== id));
    setRemoveId(null);
  };

  const handleAdd = (card: ICard) => {
    setCards((prev) => [...prev, card]);
  };

  const handleSetDefault = (id: number) => {
    setCards((prev) =>
      prev.map((card) => ({ ...card, is_default: card.id === id })),
    );
  };

  const isEmpty = cards.length === 0;

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-[22px] font-bold">{t.title}</h1>
        <Button
          type="button"
          size="lg"
          onClick={() => setAddOpen(true)}
          className="rounded-sm px-5 text-base h-10.5"
        >
          {t.addCard}
          <PlusIcon className="size-5" />
        </Button>
      </div>

      <Separator className="my-5" />

      {isEmpty ? (
        <CardsDesktopEmpty
          title={t.empty.title}
          description={t.empty.description}
        />
      ) : (
        <ul className="flex flex-col">
          {cards.map((card) => (
            <li key={card.id}>
              <CardDesktopRow
                card={card}
                maskedNumber={t.maskedNumber.replace("{last4}", card.last_four)}
                onDeleteClick={() => setRemoveId(card.id)}
                onSetDefault={handleSetDefault}
              />
            </li>
          ))}
        </ul>
      )}

      <CardAddDialog
        open={addOpen}
        onOpenChange={setAddOpen}
        dict={dict}
        onAdd={handleAdd}
      />

      <CardRemoveDialog
        open={removeId !== null}
        onOpenChange={(open) => {
          if (!open) setRemoveId(null);
        }}
        cardId={removeId}
        title={t.delete.title}
        description={t.delete.description}
        confirmLabel={t.delete.confirm}
        cancelLabel={t.delete.cancel}
        onRemove={handleRemove}
      />
    </div>
  );
}
