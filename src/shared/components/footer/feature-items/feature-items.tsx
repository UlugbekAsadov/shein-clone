import { IDictionary } from "@/core/config/i18n/dictionaries";
import { TruckIconSolid } from "../../icons/solid";
import { FeatureItem } from "./feature-item";
import { Card, ShieldCheck } from "@solar-icons/react/ssr";
import { RefreshSolid } from "../../icons/outline";

interface IProps {
  f: IDictionary["footer"];
}

export const FeatureItems = ({ f }: IProps) => {
  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
      <FeatureItem
        icon={<ShieldCheck className="size-8" weight="Bold" />}
        title={f.buyerProtection}
        description={f.buyerProtectionDesc}
      />
      <FeatureItem
        icon={<Card className="size-8" weight="Bold" />}
        title={f.securePayment}
        description={f.securePaymentDesc}
      />
      <FeatureItem
        icon={<TruckIconSolid className="size-8" />}
        title={f.fastDelivery}
        description={f.fastDeliveryDesc}
      />
      <FeatureItem
        icon={<RefreshSolid className="size-8" />}
        title={f.easyReturns}
        description={f.easyReturnsDesc}
      />
    </div>
  );
};
