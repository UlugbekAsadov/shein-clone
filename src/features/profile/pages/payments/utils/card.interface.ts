export type CardKind = "visa" | "mastercard" | "uzcard" | "humo";

export interface ICard {
  id: string;
  kind: CardKind;
  label: string;
  lastFour: string;
}
