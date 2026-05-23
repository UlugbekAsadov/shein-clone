"use client";

import { useState } from "react";
import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import type { ICard } from "@/features/profile/interfaces/card.interface";
import { CardsMobileHeader } from "./cards-mobile-header";
import { CardsMobileList } from "./cards-mobile-list";
import { CardsMobileEmpty } from "./cards-mobile-empty";
import { CardsMobileAddButton } from "./cards-mobile-add-button";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
  initialCards: ICard[];
}

export function CardsMobilePage({ lang, dict, initialCards }: IProps) {
  const t = dict.profile.payments;
  const [cards, setCards] = useState<ICard[]>(initialCards);

  const handleDelete = (id: string) => {
    setCards((prev) => prev.filter((card) => card.id !== id));
  };

  const isEmpty = cards.length === 0;

  return (
    <div className="flex min-h-screen flex-col md:hidden">
      <CardsMobileHeader title={t.title} />

      <div className="flex flex-1 flex-col pt-4">
        {isEmpty ? (
          <CardsMobileEmpty
            title={t.empty.title}
            description={t.empty.description}
          />
        ) : (
          <CardsMobileList cards={cards} dict={dict} onDelete={handleDelete} />
        )}
      </div>

      <CardsMobileAddButton
        href={`/${lang}/profile/payments/add`}
        label={t.addCard}
      />
    </div>
  );
}
