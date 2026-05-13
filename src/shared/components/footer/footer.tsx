import { Shield, ShieldCheck, Truck, Undo2 } from "lucide-react";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { ContactItem } from "./contact-item";
import { FeatureItem } from "./feature-item";
import { FooterBottom } from "./footer-bottom";
import { FooterColumn } from "./footer-column";
import { MobileAppSection } from "./mobile-app/mobile-app-section";
import { Letter, MapPointWave, PhoneRounded } from "@solar-icons/react/ssr";

interface IProps {
  dict: IDictionary;
}

export function Footer({ dict }: IProps) {
  const f = dict.footer;
  const i = f.items;

  return (
    <footer className="hidden bg-secondary md:block">
      <div className="mx-auto max-w-360 px-6 py-10">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          <FeatureItem
            icon={<Shield className="size-8" />}
            title={f.buyerProtection}
            description={f.buyerProtectionDesc}
          />
          <FeatureItem
            icon={<ShieldCheck className="size-8" />}
            title={f.securePayment}
            description={f.securePaymentDesc}
          />
          <FeatureItem
            icon={<Truck className="size-8" />}
            title={f.fastDelivery}
            description={f.fastDeliveryDesc}
          />
          <FeatureItem
            icon={<Undo2 className="size-8" />}
            title={f.easyReturns}
            description={f.easyReturnsDesc}
          />
        </div>
      </div>

      <div className="border-t border-[#DEDEE4]">
        <div className="mx-auto grid max-w-360 grid-cols-2 gap-8 px-6 py-12 md:grid-cols-[1fr_1fr_1fr_1fr_1.3fr_1.5fr]">
          <FooterColumn
            title={f.forShoppers}
            items={[
              i.howToBuy,
              i.paymentMethods,
              i.shipping,
              i.returnsExchanges,
              i.buyerProtection,
            ]}
          />
          <FooterColumn
            title={f.forSellers}
            items={[
              i.startSelling,
              i.sellerCenter,
              i.commissionRates,
              i.advertising,
              i.sellerGuarantees,
            ]}
          />
          <FooterColumn
            title={f.helpSupport}
            items={[i.helpCenter, i.contactUs, i.reportAnIssue, i.faq]}
          />
          <FooterColumn
            title={f.legal}
            items={[
              i.termsOfService,
              i.privacyPolicy,
              i.cookiePolicy,
              i.copyrightPolicy,
            ]}
          />

          <div>
            <h4 className="mb-3 text-sm font-bold tracking-wider text-foreground">
              {f.contactUs}
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <ContactItem
                icon={<PhoneRounded className="size-6" weight="Bold" />}
                primary={i.support}
                secondary={i.supportLabel}
              />
              <ContactItem
                icon={<Letter className="size-6" weight="Bold" />}
                primary={i.email}
                secondary={i.emailLabel}
              />
              <ContactItem
                icon={<MapPointWave className="size-6" weight="Bold" />}
                primary={i.address}
                secondary={i.addressLabel}
              />
            </ul>
          </div>

          <MobileAppSection dict={dict} />
        </div>
      </div>

      <FooterBottom dict={dict} />
    </footer>
  );
}
