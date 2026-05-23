import { notFound } from "next/navigation";
import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { OrderDetailMobilePage } from "@/features/orders/components/order-detail-mobile/order-detail-mobile-page";
import { getOrderDetailById } from "@/features/orders/mocks/order-detail.mocks";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
  id: string;
}

export function OrderDetailPage({ dict, id }: IProps) {
  const order = getOrderDetailById(id);
  if (!order) notFound();

  return (
    <main className="flex-1">
      <OrderDetailMobilePage order={order} dict={dict} />
    </main>
  );
}
