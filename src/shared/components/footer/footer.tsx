import {
  Mail,
  MapPin,
  Phone,
  Shield,
  ShieldCheck,
  Truck,
  Undo2,
} from "lucide-react";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { ContactItem } from "./contact-item";
import { FeatureItem } from "./feature-item";
import { FooterColumn } from "./footer-column";

interface IProps {
  dict: IDictionary;
}

export function Footer({ dict }: IProps) {
  const f = dict.footer;
  const i = f.items;

  return (
    <footer className="border-t border-border bg-secondary">
      <div className="mx-auto max-w-[1440px] px-6 py-10">
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

      <div className="border-t border-border">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-8 px-6 py-12 md:grid-cols-5">
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
            <h4 className="mb-3 text-xs font-semibold tracking-wider text-foreground">
              {f.contactUs}
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <ContactItem
                icon={<Phone className="size-4" />}
                primary={i.support}
                secondary={i.supportLabel}
              />
              <ContactItem
                icon={<Mail className="size-4" />}
                primary={i.email}
                secondary={i.emailLabel}
              />
              <ContactItem
                icon={<MapPin className="size-4" />}
                primary={i.address}
                secondary={i.addressLabel}
              />
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-4 px-6 py-6 md:flex-row">
          <p className="text-sm text-muted-foreground">{f.rights}</p>
          <p className="text-sm text-muted-foreground">{f.downloadApp}</p>
        </div>
      </div>
    </footer>
  );
}
