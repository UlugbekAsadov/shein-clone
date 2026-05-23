import type { IDictionary } from "@/core/config/i18n/dictionaries";
import type { IOrderDetail } from "@/features/profile/interfaces/order-detail.interface";
import { OrderDetailMobileHeader } from "./order-detail-mobile-header";
import { OrderDetailCard } from "./order-detail-card";
import { OrderDetailDelivery } from "./order-detail-delivery";

interface IProps {
  order: IOrderDetail;
  dict: IDictionary;
}

export function OrderDetailMobilePage({ order, dict }: IProps) {
  const t = dict.profile.orders;

  return (
    <div>
      <OrderDetailMobileHeader title={t.title} />

      <div className="flex flex-col gap-4 px-4 pt-1">
        <OrderDetailCard order={order} dict={dict} />
        <OrderDetailDelivery order={order} dict={dict} />
      </div>
    </div>
  );
}
