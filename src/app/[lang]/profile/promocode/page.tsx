import { notFound } from "next/navigation";
import { hasLocale } from "@/core/config/i18n/i18n-config";
import { getDictionary } from "@/core/config/i18n/dictionaries";
import { Header } from "@/shared/components/header/header";
import { Footer } from "@/shared/components/footer/footer";
import { ProfileShell } from "@/features/profile/components/profile-shell";
import { PromocodeMobilePage } from "@/features/profile/components/promocode-mobile/promocode-mobile-page";
import { PromocodeDesktopPage } from "@/features/profile/components/promocode-desktop/promocode-desktop-page";
import { shopCoupons } from "@/features/shop/mocks/coupon.mocks";

export default async function PromocodePage({
  params,
}: PageProps<"/[lang]/profile/promocode">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

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
