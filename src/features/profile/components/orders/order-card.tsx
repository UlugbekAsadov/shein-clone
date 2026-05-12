import Image from "next/image";
import Link from "next/link";
import { Store, ChevronRight, Trash2 } from "lucide-react";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import type { IOrder } from "@/features/profile/interfaces/order.interface";
import { OrderBrandBadge } from "./order-brand-badge";
import { OrderProgress } from "./order-progress";
import { OrderStatusBadge } from "./order-status-badge";
import { Button } from "@/shared/components/ui/button";

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
        className="relative size-[197px] shrink-0 overflow-hidden rounded-lg bg-muted"
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
          <h3 className="font-semibold leading-snug">{order.productTitle}</h3>
          <Button
            size="icon"
            type="button"
            variant="destructive"
            className="rounded-[4px]"
          >
            <Trash2 className="size-4" />
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs text-secondary-foreground">
          <span className="inline-flex items-center gap-1 text-foreground">
            <Store className="size-5" />
            <Link href={order.sellerHref} className="underline text-sm">
              {t.soldBy} {order.sellerName}
            </Link>
          </span>
          <OrderBrandBadge brand={order.brand} />
          <span>{order.soldCount}</span>
          <span aria-hidden>·</span>
          <span>{order.stockLeft}</span>
          <ChevronRight className="size-5 text-foreground" />
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-secondary-foreground">
          <span>
            {t.color}:{" "}
            <span className="bg-secondary p-1 rounded-[4px] ml-1">
              <span
                className="inline-block size-3.5 translate-y-0.5 rounded-sm"
                style={{ backgroundColor: order.colorSwatch }}
              />
            </span>
          </span>
          <span>
            {t.size}:{" "}
            <span className="bg-secondary p-1 rounded-[4px] ml-1">
              <span className="font-medium text-foreground">{order.size}</span>
            </span>
          </span>
          <span>
            {t.qty}:{" "}
            <span className="bg-secondary p-1 rounded-[4px] ml-1">
              <span className="font-medium text-foreground">{order.qty}</span>
            </span>
          </span>
        </div>

        <div className="text-xs text-secondary-foreground">
          {t.location}:{" "}
          <Link href="#" className="text-foreground underline font-medium">
            {order.location}
          </Link>
        </div>

        <div className="mt-2 flex items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-[13px] font-medium text-secondary-foreground line-through">
              {order.originalPrice}$
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[22px] font-extrabold">{order.price}$</span>
              <span className="text-sm font-bold text-green-600">
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
