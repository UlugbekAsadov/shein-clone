import type { IDictionary } from "@/core/config/i18n/dictionaries";
import type { IApiShopPromoCode } from "@/features/shop/utils/shop-response.interface";
import { CouponCard } from "@/features/shop/pages/[slug]/components/coupons-strip/coupon-card";

interface IProps {
  coupons: IApiShopPromoCode[];
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
