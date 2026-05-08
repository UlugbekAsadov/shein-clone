import {
  Mail,
  MapPin,
  Phone,
  Shield,
  ShieldCheck,
  Truck,
  Undo2,
} from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries";

type Props = {
  dict: Dictionary;
};

export function Footer({ dict }: Props) {
  const f = dict.footer;
  const i = f.items;

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-[1440px] px-6 py-10">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          <FeatureItem
            icon={<Shield className="size-5" />}
            title={f.buyerProtection}
            description={f.buyerProtectionDesc}
          />
          <FeatureItem
            icon={<ShieldCheck className="size-5" />}
            title={f.securePayment}
            description={f.securePaymentDesc}
          />
          <FeatureItem
            icon={<Truck className="size-5" />}
            title={f.fastDelivery}
            description={f.fastDeliveryDesc}
          />
          <FeatureItem
            icon={<Undo2 className="size-5" />}
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
          <p className="text-sm text-muted-foreground">
            {f.downloadApp}
          </p>
        </div>
      </div>
    </footer>
  );
}

function FeatureItem({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid size-10 place-items-center rounded-full bg-muted text-foreground">
        {icon}
      </span>
      <div>
        <h4 className="text-sm font-semibold">{title}</h4>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div>
      <h4 className="mb-3 text-xs font-semibold tracking-wider text-foreground">
        {title}
      </h4>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item}>
            <a
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContactItem({
  icon,
  primary,
  secondary,
}: {
  icon: React.ReactNode;
  primary: string;
  secondary: string;
}) {
  return (
    <li className="flex items-start gap-2">
      <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-muted text-foreground">
        {icon}
      </span>
      <span className="flex flex-col">
        <span className="text-sm font-medium text-foreground">{primary}</span>
        <span className="text-xs text-muted-foreground">{secondary}</span>
      </span>
    </li>
  );
}
