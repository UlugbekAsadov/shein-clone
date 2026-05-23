import type { IDictionary } from "@/core/config/i18n/dictionaries";
import type { ICoupon } from "@/features/shop/pages/[slug]/utils/coupon.interface";
import { CouponCard } from "@/features/shop/pages/[slug]/components/coupons-strip/coupon-card";

interface IProps {
  coupons: ICoupon[];
  dict: IDictionary;
}

export function PromocodeDesktopList({ coupons, dict }: IProps) {
  const c = dict.shop.coupons;

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
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
