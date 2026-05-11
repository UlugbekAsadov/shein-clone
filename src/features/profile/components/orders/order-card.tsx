import Image from "next/image";
import Link from "next/link";
import { Store, ChevronRight, Trash2 } from "lucide-react";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import type { IOrder } from "@/features/profile/interfaces/order.interface";
import { OrderBrandBadge } from "./order-brand-badge";
import { OrderProgress } from "./order-progress";
import { OrderStatusBadge } from "./order-status-badge";

interface IProps {
  order: IOrder;
  dict: IDictionary;
}

export function OrderCard({ order, dict }: IProps) {
  const t = dict.profile.orders;
  return (
    <div className="flex gap-5 py-6">
      <Link
        href="#"
        className="relative size-32 shrink-0 overflow-hidden rounded-lg bg-muted"
      >
        <Image
          src={order.productImage}
          alt={order.productTitle}
          fill
          className="object-cover"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-sm font-medium leading-snug">
            {order.productTitle}
          </h3>
          <button
            type="button"
            aria-label="Remove"
            className="grid size-8 shrink-0 place-items-center rounded-md border border-rose-200 text-rose-500 hover:bg-rose-50"
          >
            <Trash2 className="size-4" />
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1 text-foreground">
            <Store className="size-3.5" />
            <Link href={order.sellerHref} className="underline">
              {t.soldBy} {order.sellerName}
            </Link>
          </span>
          <OrderBrandBadge brand={order.brand} />
          <span>{order.soldCount}</span>
          <span aria-hidden>·</span>
          <span>{order.stockLeft}</span>
          <ChevronRight className="size-3.5" />
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span>
            {t.color}:{" "}
            <span
              className="ml-1 inline-block size-3.5 translate-y-0.5 rounded-sm"
              style={{ backgroundColor: order.colorSwatch }}
            />
          </span>
          <span>
            {t.size}:{" "}
            <span className="font-medium text-foreground">{order.size}</span>
          </span>
          <span>
            {t.qty}:{" "}
            <span className="font-medium text-foreground">{order.qty}</span>
          </span>
        </div>

        <div className="text-xs text-muted-foreground">
          {t.location}:{" "}
          <Link href="#" className="text-foreground underline">
            {order.location}
          </Link>
        </div>

        <div className="mt-2 flex items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground line-through">
              {order.originalPrice}$
            </span>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold">{order.price}$</span>
              <span className="text-xs font-medium text-emerald-600">
                {t.save} {order.saveAmount}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {order.progress && <OrderProgress steps={order.progress} />}
            <OrderStatusBadge
              status={order.status}
              unpaidLabel={t.status.unpaid}
              returnLabel={t.status.return}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
