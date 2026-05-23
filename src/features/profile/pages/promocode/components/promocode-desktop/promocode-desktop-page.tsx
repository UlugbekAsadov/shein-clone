import type { IDictionary } from "@/core/config/i18n/dictionaries";
import type { ICoupon } from "@/features/shop/pages/[slug]/utils/coupon.interface";
import { PromocodeDesktopList } from "./promocode-desktop-list";
import { PromocodeDesktopEmpty } from "./promocode-desktop-empty";

interface IProps {
  dict: IDictionary;
  coupons: ICoupon[];
}

export function PromocodeDesktopPage({ dict, coupons }: IProps) {
  const t = dict.profile.promocode;
  const isEmpty = coupons.length === 0;

  return (
    <div>
      <h1 className="text-xl font-bold text-foreground">{t.title}</h1>
      <div className="my-5 border-t border-border" />

      {isEmpty ? (
        <PromocodeDesktopEmpty
          title={t.empty.title}
          description={t.empty.description}
        />
      ) : (
        <PromocodeDesktopList coupons={coupons} dict={dict} />
      )}
    </div>
  );
}
