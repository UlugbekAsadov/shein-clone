import type { IDictionary } from "@/core/config/i18n/dictionaries";
import type { IAboutContent } from "@/features/shop/pages/[slug]/utils/about-content.interface";
import { Card, ShieldCheck } from "@solar-icons/react/ssr";
import { TruckIconSolid } from "@/shared/components/icons/solid";
import { RefreshSolid } from "@/shared/components/icons/outline";
import { InfoCard } from "../about-store/info-card/info-card";
import { BrandsCarried } from "../about-store/brands-carried/brands-carried";
import { FeatureItem } from "@/shared/components/footer/feature-items/feature-item";

interface IProps {
  about: IAboutContent;
  dict: IDictionary;
}

export function ShopMobileAbout({ about, dict }: IProps) {
  const f = dict.footer;

  return (
    <div className="flex flex-col gap-4 px-4 [&_.feature-item]:p-0">
      {about.cards.map((card) => (
        <InfoCard key={card.id} card={card} />
      ))}

      <BrandsCarried
        title={dict.shop.about.brandsWeCarry}
        brands={about.brands}
      />

      <div className="grid grid-cols-1 gap-2">
        <FeatureItem
          icon={<ShieldCheck className="size-5" weight="Bold" />}
          title={f.buyerProtection}
          description={f.buyerProtectionDesc}
        />
        <FeatureItem
          icon={<Card className="size-5" weight="Bold" />}
          title={f.securePayment}
          description={f.securePaymentDesc}
        />
        <FeatureItem
          icon={<TruckIconSolid className="size-5" />}
          title={f.fastDelivery}
          description={f.fastDeliveryDesc}
        />
        <FeatureItem
          icon={<RefreshSolid className="size-5" />}
          title={f.easyReturns}
          description={f.easyReturnsDesc}
        />
      </div>
    </div>
  );
}
