import Image from "next/image";
import type { IPaymentMethod } from "@/features/orders/utils/order-detail.interface";

interface IProps {
  payment: IPaymentMethod;
}

const paymentIconMap: Record<IPaymentMethod["kind"], string | null> = {
  visa: "/icons/visa.svg",
  mastercard: null,
  uzcard: null,
  humo: null,
};

export function OrderDetailPayment({ payment }: IProps) {
  const iconSrc = paymentIconMap[payment.kind];

  if (iconSrc) {
    return (
      <Image
        src={iconSrc}
        alt={payment.label}
        width={52}
        height={16}
        className="h-4 w-auto"
      />
    );
  }

  return (
    <span className="text-sm font-semibold text-foreground">
      {payment.label}
    </span>
  );
}
