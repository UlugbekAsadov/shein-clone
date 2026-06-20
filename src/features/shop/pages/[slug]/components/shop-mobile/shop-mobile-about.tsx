import type { IDictionary } from "@/core/config/i18n/dictionaries";
import type { IApiShopAbout } from "@/features/shop/utils/shop-response.interface";
import type { IAboutInfoCard } from "@/features/shop/pages/[slug]/utils/about-info.interface";
import { Card, ShieldCheck } from "@solar-icons/react/ssr";
import { TruckIconSolid } from "@/shared/components/icons/solid";
import { RefreshSolid } from "@/shared/components/icons/outline";
import { InfoCard } from "../about-store/info-card/info-card";
import { BrandsCarried } from "../about-store/brands-carried/brands-carried";
import { FeatureItem } from "@/shared/components/footer/feature-items/feature-item";

interface IProps {
  about: IApiShopAbout | null;
  dict: IDictionary;
}

export function ShopMobileAbout({ about, dict }: IProps) {
  const f = dict.footer;

  if (!about) return null;

  const a = dict.shop.about;

  const cards: IAboutInfoCard[] = [
    {
      id: "location",
      title: a.locationAndShipping,
      items: [
        {
          id: "store-location",
          icon: "mapPin",
          title: about.location_shipping.store_location,
          subtitle: a.storeLocationLabel,
        },
        {
          id: "shipping-origin",
          icon: "truck",
          title: about.location_shipping.shipping_origin,
          subtitle: a.shippingOriginLabel,
        },
        {
          id: "seller-type",
          icon: "store",
          title: about.location_shipping.seller_type,
          subtitle: a.sellerTypeLabel,
        },
      ],
    },
    {
      id: "trust",
      title: a.trustAndVerification,
      items: [
        {
          id: "verified-seller",
          icon: "shieldCheck",
          title: about.trust_verification.verified_seller
            ? a.verifiedSeller
            : a.notVerifiedSeller,
          subtitle: a.identityConfirmed,
        },
        {
          id: "positive-feedback",
          icon: "thumbsUp",
          title: `${about.trust_verification.positive_feedback} ${a.positiveFeedbackLabel}`,
          subtitle: a.basedOnCustomerReviews,
        },
        {
          id: "response-time",
          icon: "messageSquare",
          title: `${about.trust_verification.response_time} ${a.responseTimeSuffix}`,
          subtitle: a.averageReplyTime,
        },
        {
          id: "member-since",
          icon: "clock",
          title: `${a.memberSincePrefix} ${about.trust_verification.member_since}`,
          subtitle: a.establishedSeller,
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-4 px-4 [&_.feature-item]:p-0">
      {cards.map((card) => (
        <InfoCard key={card.id} card={card} />
      ))}

      <BrandsCarried
        title={a.brandsWeCarry}
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
