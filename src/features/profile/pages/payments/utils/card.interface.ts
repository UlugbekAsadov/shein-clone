export type CardKind = "visa" | "mastercard" | "uzcard" | "humo";

export interface ICard {
  id: number;
  last_four: string;
  card_type: CardKind;
  is_default: boolean;
}

export interface ICardCreateRequest {
  card_number: string;
  expire_date: string;
}

export const CARD_KIND_LABELS: Record<CardKind, string> = {
  visa: "Visa",
  mastercard: "Mastercard",
  uzcard: "Uzcard",
  humo: "Humo",
};
