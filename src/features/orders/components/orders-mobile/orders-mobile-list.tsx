import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import type { IOrderGroup } from "@/features/orders/utils/order-group.interface";
import { OrderGroupCard } from "./order-group-card";

interface IProps {
  lang: (typeof locales)[number];
  orders: IOrderGroup[];
  dict: IDictionary;
}

export function OrdersMobileList({ lang, orders, dict }: IProps) {
  return (
    <div className="flex flex-col gap-4 px-4 pb-4">
      {orders.map((order) => (
        <OrderGroupCard
          key={order.id}
          lang={lang}
          order={order}
          dict={dict}
        />
      ))}
    </div>
  );
}
