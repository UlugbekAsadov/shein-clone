import type { IDictionary } from "@/core/config/i18n/dictionaries";
import type { IOrderDetail } from "@/features/orders/utils/order-detail.interface";
import { OrderGroupItem } from "@/features/orders/components/orders-mobile/order-group-item";
import { OrderGroupStatusBadge } from "@/features/orders/components/orders-mobile/order-group-status-badge";
import { groupDigits } from "@/shared/utils/format-price";
import { OrderDetailPayment } from "./order-detail-payment";

interface IProps {
  order: IOrderDetail;
  dict: IDictionary;
}

export function OrderDetailCard({ order, dict }: IProps) {
  const t = dict.profile.orders;
  const td = t.detail;
  const statusLabel = t.status[order.status];
  const formattedTotal = groupDigits(order.totalPrice);

  return (
    <article className="rounded-[20px] bg-secondary p-3">
      <header className="flex items-start justify-between gap-3 pb-3">
        <p className="text-sm text-muted-foreground">
          {t.order}{" "}
          <span className="font-bold text-foreground">#{order.orderNumber}</span>
        </p>
        <OrderGroupStatusBadge status={order.status} label={statusLabel} />
      </header>

      <div className="border-t border-dashed border-secondary-foreground/50" />

      <ul className="divide-y divide-dashed divide-border">
        {order.items.map((item) => (
          <li key={item.id}>
            <OrderGroupItem item={item} dict={dict} />
          </li>
        ))}
      </ul>

      <div className="border-t border-dashed border-secondary-foreground/50" />

      <div className="flex items-center justify-between pt-3 pb-2">
        <span className="text-sm text-muted-foreground">
          {td.paymentMethod}:
        </span>
        <OrderDetailPayment payment={order.paymentMethod} />
      </div>

      <div className="flex items-center justify-between pb-1">
        <span className="text-sm text-muted-foreground">{t.totalPrice}:</span>
        <span className="text-xl font-bold text-foreground">
          {formattedTotal}{" "}
          <span className="font-semibold">
            {t.currency}
          </span>
        </span>
      </div>
    </article>
  );
}
