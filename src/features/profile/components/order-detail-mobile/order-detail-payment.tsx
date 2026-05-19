import type { IPaymentMethod } from "@/features/profile/interfaces/order-detail.interface";

interface IProps {
  payment: IPaymentMethod;
}

export function OrderDetailPayment({ payment }: IProps) {
  return (
    <span className="grid h-6 min-w-12 place-items-center rounded-sm bg-background px-2 text-[13px] font-extrabold italic tracking-tight text-[#1A1F71]">
      {payment.label}
    </span>
  );
}
