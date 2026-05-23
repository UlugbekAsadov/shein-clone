import Image from "next/image";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import type { IOrderGroupItem } from "@/features/profile/interfaces/order-group.interface";

interface IProps {
  item: IOrderGroupItem;
  dict: IDictionary;
}

export function OrderGroupItem({ item, dict }: IProps) {
  const t = dict.profile.orders;
  const formattedPrice = item.price.toLocaleString("ru-RU").replace(/,/g, " ");

  return (
    <div className="flex gap-3 py-3">
      <div className="relative size-20 shrink-0 overflow-hidden rounded-sm bg-muted">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
          sizes="80px"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-semibold leading-tight text-foreground">
            {item.title}
          </h3>
          <p className="text-xs text-muted-foreground">
            {t.qty}:{" "}
            <span className="font-semibold text-foreground">{item.qty}</span>
          </p>
          <p className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
            <span>
              {t.color}:{" "}
              <span className="font-semibold text-foreground">
                {item.color}
              </span>
            </span>
            <span
              aria-hidden
              className="inline-block size-3 rounded-[3px]"
              style={{ backgroundColor: item.colorSwatch }}
            />
            <span aria-hidden className="text-muted-foreground">
              ·
            </span>
            <span>
              {t.size}:{" "}
              <span className="font-semibold text-foreground">{item.size}</span>
            </span>
          </p>
        </div>

        <p className="mt-1 text-base font-bold text-foreground">
          {formattedPrice}{" "}
          <span className="text-sm font-semibold">{t.currency}</span>
        </p>
      </div>
    </div>
  );
}
