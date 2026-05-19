import { ClockCircle, MapPointWave, Phone, User } from "@solar-icons/react/ssr";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import type { IOrderDetail } from "@/features/profile/interfaces/order-detail.interface";
import { OrderDetailDeliveryRow } from "./order-detail-delivery-row";

interface IProps {
  order: IOrderDetail;
  dict: IDictionary;
}

export function OrderDetailDelivery({ order, dict }: IProps) {
  const td = dict.profile.orders.detail;

  return (
    <section className="rounded-md bg-secondary px-4 py-4">
      <h2 className="mb-4 text-xl font-bold text-foreground">
        {td.deliveryDetails}
      </h2>

      <OrderDetailDeliveryRow
        icon={MapPointWave}
        label={td.deliveryAddress}
        value={order.deliveryAddress}
      />
      <OrderDetailDeliveryRow
        icon={ClockCircle}
        label={td.deliveryTime}
        value={order.deliveryTime}
      />
      <OrderDetailDeliveryRow
        icon={User}
        label={td.recipientDetails}
        value={order.recipientName}
      />
      <OrderDetailDeliveryRow
        icon={Phone}
        label={td.phoneNumber}
        value={order.recipientPhone}
        isLast
      />
    </section>
  );
}
