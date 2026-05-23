import Image from "next/image";
import { Card2 } from "@solar-icons/react/ssr";
import type { CardKind } from "@/features/profile/pages/payments/utils/card.interface";

interface IProps {
  kind: CardKind | null;
}

const iconSrcMap: Record<CardKind, string> = {
  visa: "/icons/visa.svg",
  mastercard: "/icons/mastercard.svg",
  uzcard: "/icons/uzcard.svg",
  humo: "/icons/humo.svg",
};

export function AddCardBrandIcon({ kind }: IProps) {
  if (!kind) {
    return <Card2 className="size-6 text-muted-foreground" />;
  }

  return (
    <Image
      src={iconSrcMap[kind]}
      alt=""
      width={40}
      height={16}
      className="h-4 w-auto"
    />
  );
}
