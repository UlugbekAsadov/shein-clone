import type { ISellerCard } from "@/features/product/pages/[slug]/utils/seller-card.interface";

export const sellerCardMock: ISellerCard = {
  id: "ryvang",
  slug: "fashionrepublic",
  name: "PowerFit",
  tag: "Sport Fashion",
  avatar: "/mocks/images/brand-strip/image%20761-1.png",
  banner: "/mocks/images/banner/image%2013.png",
  rating: 4.5,
  badgeLabel: "Fast shipping",
  stats: [
    { id: "sold", label: "sold", value: "300+" },
    { id: "tenure", label: "year seller", value: "2" },
    { id: "followers", label: "followers", value: "45.5K" },
    { id: "response", label: "response", value: "35%" },
  ],
};
