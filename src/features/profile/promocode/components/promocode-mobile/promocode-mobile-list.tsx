import type { IDictionary } from "@/core/config/i18n/dictionaries";
import type { ICoupon } from "@/features/shop/interfaces/coupon.interface";
import { CouponCard } from "@/features/shop/components/coupons-strip/coupon-card";

interface IProps {
  coupons: ICoupon[];
  dict: IDictionary;
}

export function PromocodeMobileList({ coupons, dict }: IProps) {
  const c = dict.shop.coupons;

  return (
    <div className="flex flex-col gap-4 px-4">
      {coupons.map((coupon) => (
        <CouponCard
          key={coupon.id}
          coupon={coupon}
          couponLabel={c.label}
          daysLeftLabel={c.daysLeft}
          copyLabel={c.copy}
          copiedLabel={c.copied}
          minOrderLabel={c.minOrder}
        />
      ))}
    </div>
  );
}
