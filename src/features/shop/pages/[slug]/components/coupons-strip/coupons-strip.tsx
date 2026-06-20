import type { IApiShopPromoCode } from "@/features/shop/utils/shop-response.interface";
import { CouponCard } from "./coupon-card";

interface IProps {
  coupons: IApiShopPromoCode[];
  couponLabel: string;
  daysLeftLabel: string;
  copyLabel: string;
  copiedLabel: string;
  minOrderLabel: string;
}

export function CouponsStrip({
  coupons,
  couponLabel,
  daysLeftLabel,
  copyLabel,
  copiedLabel,
  minOrderLabel,
}: IProps) {
  return (
    <div className="grid grid-cols-3 gap-4 overflow-x-scroll scrollbar-hidden">
      {coupons.slice(0, 3).map((c) => (
        <div key={c.id} className="min-w-76 flex-1">
          <CouponCard
            coupon={c}
            couponLabel={couponLabel}
            daysLeftLabel={daysLeftLabel}
            copyLabel={copyLabel}
            copiedLabel={copiedLabel}
            minOrderLabel={minOrderLabel}
          />
        </div>
      ))}
    </div>
  );
}
