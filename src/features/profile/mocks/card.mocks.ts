import type { ICard } from "@/features/profile/interfaces/card.interface";

export const cardMocks: ICard[] = [
  {
    id: "card-uzcard",
    kind: "uzcard",
    label: "Uzcard",
    lastFour: "1256",
  },
  {
    id: "card-visa",
    kind: "visa",
    label: "Visa",
    lastFour: "9234",
  },
  {
    id: "card-mastercard",
    kind: "mastercard",
    label: "Mastercard",
    lastFour: "3539",
  },
  {
    id: "card-humo",
    kind: "humo",
    label: "Humo",
    lastFour: "9834",
  },
];
