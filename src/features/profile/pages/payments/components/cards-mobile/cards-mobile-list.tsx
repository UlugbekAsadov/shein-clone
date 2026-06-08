import type { IDictionary } from "@/core/config/i18n/dictionaries";
import type { ICard } from "@/features/profile/pages/payments/utils/card.interface";
import { CardRow } from "./card-row";

interface IProps {
  cards: ICard[];
  dict: IDictionary;
  onDelete: (id: number) => void;
  onSetDefault: (id: number) => void;
}

export function CardsMobileList({ cards, dict, onDelete, onSetDefault }: IProps) {
  const t = dict.profile.payments;

  return (
    <div className="flex flex-col gap-3 px-4">
      {cards.map((card) => (
        <CardRow
          key={card.id}
          card={card}
          maskedNumber={t.maskedNumber.replace("{last4}", card.last_four)}
          deleteLabels={{
            title: t.delete.title,
            description: t.delete.description,
            confirm: t.delete.confirm,
            cancel: t.delete.cancel,
          }}
          onDelete={onDelete}
          onSetDefault={onSetDefault}
        />
      ))}
    </div>
  );
}
