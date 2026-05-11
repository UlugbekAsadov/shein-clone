import type { IAboutContent } from "@/features/shop/interfaces/about-content.interface";

export const shopAboutContent: IAboutContent = {
  intro:
    "Fashion Republic is a premium multi-brand store offering authentic products from global and local brands. We specialize in modern fashion, accessories, and lifestyle products. Fast shipping across North America and worldwide.",
  cards: [
    {
      id: "location",
      title: "Location & Shipping",
      items: [
        {
          id: "store-location",
          icon: "mapPin",
          title: "United States",
          subtitle: "Store Location",
        },
        {
          id: "shipping-origin",
          icon: "truck",
          title: "Ships from Los Angeles, CA",
          subtitle: "Shipping Origin",
        },
        {
          id: "seller-type",
          icon: "store",
          title: "Multi-brand retailer",
          subtitle: "Seller Type",
        },
      ],
    },
    {
      id: "trust",
      title: "Trust & Verification",
      items: [
        {
          id: "verified-seller",
          icon: "shieldCheck",
          title: "Verified Seller",
          subtitle: "Identity confirmed",
        },
        {
          id: "positive-feedback",
          icon: "thumbsUp",
          title: "94% Positive Feedback",
          subtitle: "Based on customer reviews",
        },
        {
          id: "response-time",
          icon: "messageSquare",
          title: "15 minutes Response Time",
          subtitle: "Average reply time",
        },
        {
          id: "member-since",
          icon: "clock",
          title: "Member since 2019",
          subtitle: "Established seller",
        },
      ],
    },
  ],
  brands: [
    { id: "nike", name: "Nike", logo: "/placeholders/brand.svg" },
    { id: "adidas", name: "Adidas", logo: "/placeholders/brand.svg" },
    { id: "zara", name: "Zara", logo: "/placeholders/brand.svg" },
    { id: "gucci", name: "Gucci", logo: "/placeholders/brand.svg" },
  ],
};
