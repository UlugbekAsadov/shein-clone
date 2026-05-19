import type { IDictionary } from "@/core/config/i18n/dictionaries";
import type { ICoupon } from "@/features/shop/interfaces/coupon.interface";
import { PromocodeMobileHeader } from "./promocode-mobile-header";
import { PromocodeMobileList } from "./promocode-mobile-list";
import { PromocodeMobileEmpty } from "./promocode-mobile-empty";

interface IProps {
  dict: IDictionary;
  coupons: ICoupon[];
}

export function PromocodeMobilePage({ dict, coupons }: IProps) {
  const t = dict.profile.promocode;
  const isEmpty = coupons.length === 0;

  return (
    <div className="flex min-h-screen flex-col md:hidden">
      <PromocodeMobileHeader title={t.title} />

      {isEmpty ? (
        <PromocodeMobileEmpty
          title={t.empty.title}
          description={t.empty.description}
        />
      ) : (
        <div className="pt-2 pb-4">
          <PromocodeMobileList coupons={coupons} dict={dict} />
        </div>
      )}
    </div>
  );
}
