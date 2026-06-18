import type { IDictionary } from "@/core/config/i18n/dictionaries";
import type { IApiShopAbout } from "@/features/shop/utils/shop-response.interface";
import type { IAboutContent } from "./about-content.interface";

export function mapApiShopAboutToContent(
  about: IApiShopAbout,
  dict: IDictionary,
): IAboutContent {
  const a = dict.shop.about;

  return {
    intro: about.description,
    cards: [
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
    ],
    brands: [],
  };
}
