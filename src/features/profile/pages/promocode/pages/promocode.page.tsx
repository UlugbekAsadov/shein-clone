import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { Header } from "@/shared/components/header/header";
import { Footer } from "@/shared/components/footer/footer";
import { ProfileShell } from "@/features/profile/components/profile-shell";
import { PromocodeMobilePage } from "@/features/profile/pages/promocode/components/promocode-mobile/promocode-mobile-page";
import { PromocodeDesktopPage } from "@/features/profile/pages/promocode/components/promocode-desktop/promocode-desktop-page";
import { shopCoupons } from "@/features/shop/pages/[slug]/mocks/coupon.mocks";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
}

export function PromocodePage({ lang, dict }: IProps) {
  return (
    <>
      <Header lang={lang} dict={dict} />

      <main className="flex-1">
        <PromocodeMobilePage dict={dict} coupons={shopCoupons} />

        <div className="hidden md:block">
          <ProfileShell lang={lang} dict={dict} activeId="promocode">
            <PromocodeDesktopPage dict={dict} coupons={shopCoupons} />
          </ProfileShell>
        </div>
      </main>

      <Footer dict={dict} />
    </>
  );
}
