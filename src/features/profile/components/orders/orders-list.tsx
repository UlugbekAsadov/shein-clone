import type { IDictionary } from "@/core/config/i18n/dictionaries";
import type { IOrder } from "@/features/profile/interfaces/order.interface";
import { OrderCard } from "./order-card";

interface IProps {
  orders: IOrder[];
  dict: IDictionary;
}

export function OrdersList({ orders, dict }: IProps) {
  const t = dict.profile.orders;
  return (
    <div>
      <header className="mb-2">
        <h1 className="text-2xl font-bold">{t.title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{t.current}</p>
      </header>

      <ul className="divide-y divide-border">
        {orders.map((order) => (
          <li key={order.id}>
            <OrderCard order={order} dict={dict} />
          </li>
        ))}
      </ul>
    </div>
  );
}
