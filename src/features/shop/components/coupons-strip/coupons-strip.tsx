import type { ICoupon } from "@/features/shop/interfaces/coupon.interface";
import { CouponCard } from "./coupon-card";

interface IProps {
  coupons: ICoupon[];
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
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {coupons.slice(0, 3).map((c) => (
        <CouponCard
          key={c.id}
          coupon={c}
          couponLabel={couponLabel}
          daysLeftLabel={daysLeftLabel}
          copyLabel={copyLabel}
          copiedLabel={copiedLabel}
          minOrderLabel={minOrderLabel}
        />
      ))}
    </div>
  );
}
