import type { ICard } from "@/features/profile/pages/payments/utils/card.interface";

export const cardMocks: ICard[] = [
  {
    id: 1,
    card_type: "uzcard",
    last_four: "1256",
    is_default: true,
  },
  {
    id: 2,
    card_type: "visa",
    last_four: "9234",
    is_default: false,
  },
  {
    id: 3,
    card_type: "mastercard",
    last_four: "3539",
    is_default: false,
  },
  {
    id: 4,
    card_type: "humo",
    last_four: "9834",
    is_default: false,
  },
];
