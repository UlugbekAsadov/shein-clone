import Link from "next/link";
import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import type { IOrderGroup } from "@/features/orders/utils/order-group.interface";
import { OrderGroupItem } from "./order-group-item";
import { OrderGroupStatusBadge } from "./order-group-status-badge";

interface IProps {
  lang: (typeof locales)[number];
  order: IOrderGroup;
  dict: IDictionary;
}

export function OrderGroupCard({ lang, order, dict }: IProps) {
  const t = dict.profile.orders;
  const statusLabel = t.status[order.status];
  const formattedTotal = order.totalPrice
    .toLocaleString("ru-RU")
    .replace(/,/g, " ");

  return (
    <Link
      href={`/${lang}/orders/${order.id}`}
      className="block rounded-[20px] bg-secondary p-3 transition-colors active:bg-secondary/80"
    >
      <header className="flex items-center justify-between gap-3 pb-3">
        <div className="flex flex-col gap-1">
          <p className="text-xs text-muted-foreground">
            {t.order}{" "}
            <span className="font-bold text-foreground">
              #{order.orderNumber}
            </span>
          </p>
          <p className="text-xs text-muted-foreground">
            {t.deliveryDate}:{" "}
            <span className="font-medium text-foreground">
              {order.deliveryDate}
            </span>
          </p>
        </div>

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

      <footer className="flex items-center justify-between pt-3">
        <span className="text-sm font-medium text-secondary-foreground">
          {t.totalPrice}:
        </span>
        <span className="text-xl font-bold text-foreground">
          {formattedTotal}{" "}
          <span className="text-lg font-semibold">
            {t.currency}
          </span>
        </span>
      </footer>
    </Link>
  );
}
