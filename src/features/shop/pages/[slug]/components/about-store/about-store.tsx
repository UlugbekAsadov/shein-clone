import type { IDictionary } from "@/core/config/i18n/dictionaries";
import type { IApiShop, IApiShopAbout } from "@/features/shop/utils/shop-response.interface";
import type { IAboutInfoCard } from "@/features/shop/pages/[slug]/utils/about-info.interface";
import type { IApiFeaturedShop } from "@/features/home/utils/featured-shop.interface";
import { FeaturedShops } from "@/features/home/components/featured-shops/featured-shops";
import { AboutStoreIntro } from "./about-store-intro";
import { InfoCard } from "./info-card/info-card";
import { BrandsCarried } from "./brands-carried/brands-carried";

interface IProps {
  shop: IApiShop;
  about: IApiShopAbout | null;
  dict: IDictionary;
  lang: string;
}

const EMPTY_SHOPS: IApiFeaturedShop[] = [];

export function AboutStore({ shop, about, dict, lang }: IProps) {
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
    <>
      <div className="mx-auto max-w-360 space-y-6 px-6 [&_.feature-item]:p-0">
        <AboutStoreIntro
          title={`${a.aboutTitle} ${shop.display_name}`}
          description={about.description}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {cards.map((card) => (
            <InfoCard key={card.id} card={card} />
          ))}
        </div>

        {about.brands.length > 0 && (
          <BrandsCarried
            title={a.brandsWeCarry}
            brands={about.brands}
          />
        )}
      </div>

      <FeaturedShops
        title={a.similarStores}
        subtitle={a.verifiedSellersRealProducts}
        viewAllLabel={dict.sections.viewAll}
        followLabel={dict.shop.follow}
        followingLabel={dict.shop.following}
        shops={EMPTY_SHOPS}
        lang={lang}
      />
    </>
  );
}
