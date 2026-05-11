import { Shield, ShieldCheck, Truck, Undo2 } from "lucide-react";
import { FeatureItem } from "@/shared/components/footer/feature-item";
import type { IDictionary } from "@/core/config/i18n/dictionaries";

interface IProps {
  dict: IDictionary["footer"];
}

export function InlineBenefits({ dict }: IProps) {
  return (
    <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <FeatureItem
        icon={<Shield className="size-5" />}
        title={dict.buyerProtection}
        description={dict.buyerProtectionDesc}
      />
      <FeatureItem
        icon={<ShieldCheck className="size-5" />}
        title={dict.securePayment}
        description={dict.securePaymentDesc}
      />
      <FeatureItem
        icon={<Truck className="size-5" />}
        title={dict.fastDelivery}
        description={dict.fastDeliveryDesc}
      />
      <FeatureItem
        icon={<Undo2 className="size-5" />}
        title={dict.easyReturns}
        description={dict.easyReturnsDesc}
      />
    </section>
  );
}
