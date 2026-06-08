import Image from "next/image";
import type { CardKind } from "@/features/profile/pages/payments/utils/card.interface";

interface IProps {
  kind: CardKind;
  label: string;
}

const iconSrcMap: Record<CardKind, string> = {
  visa: "/icons/visa.svg",
  mastercard: "/icons/mastercard.svg",
  uzcard: "/icons/uzcard.svg",
  humo: "/icons/humo.svg",
};

export function CardBrandIcon({ kind, label }: IProps) {
  return (
    <div className="grid size-10 md:size-14.5 shrink-0 place-items-center rounded-sm bg-secondary">
      <Image
        src={iconSrcMap[kind]}
        alt={label}
        width={24}
        height={24}
        className="h-auto w-8 object-contain"
      />
    </div>
  );
}
