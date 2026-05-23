"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
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
  const [removeId, setRemoveId] = useState<string | null>(null);

  const handleRemove = () => {
    if (!removeId) return;
    setCards((prev) => prev.filter((card) => card.id !== removeId));
    setRemoveId(null);
  };

  const handleAdd = () => {
    const id = `card-new-${Date.now()}`;
    setCards((prev) => [
      ...prev,
      {
        id,
        kind: "visa",
        label: "Visa",
        lastFour: "1012",
      },
    ]);
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
          <Plus className="size-5" />
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
                maskedNumber={t.maskedNumber.replace("{last4}", card.lastFour)}
                onDeleteClick={() => setRemoveId(card.id)}
              />
            </li>
          ))}
        </ul>
      )}

      <CardAddDialog
        open={addOpen}
        onOpenChange={setAddOpen}
        dict={dict}
        onSubmit={handleAdd}
      />

      <CardRemoveDialog
        open={removeId !== null}
        onOpenChange={(open) => {
          if (!open) setRemoveId(null);
        }}
        title={t.delete.title}
        description={t.delete.description}
        confirmLabel={t.delete.confirm}
        cancelLabel={t.delete.cancel}
        onConfirm={handleRemove}
      />
    </div>
  );
}
