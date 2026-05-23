import {
  colorSwatches,
  galleryPool,
  sizes,
} from "@/shared/mocks/product-preview.mocks";
import type { IProductDetail } from "@/features/product/pages/[slug]/utils/product-detail.interface";

export const productDetailMock: IProductDetail = {
  id: "p-1",
  slug: "womens-casual-pullover-sweatshirt-orange-sports-car",
  title: "Sweatshirt",
  subtitle:
    "Women's Casual Pullover Sweatshirt With minimalist Orange Sports Car & Letter Print, Versatile For Daily",
  rating: 4.5,
  reviews: 311,
  sold: 1847,
  price: 18.4,
  originalPrice: 30.05,
  saveLabel: "Save $30",
  gallery: galleryPool,
  colors: colorSwatches,
  sizes: [
    { id: "XS", available: true },
    { id: "S", available: true },
    { id: "M", available: true },
    { id: "L", available: true },
    { id: "XL", available: false },
    { id: "3XL", available: true },
  ] satisfies typeof sizes,
  recommendedSize: "M",
  specs: [
    { id: "fit", label: "Fit", value: "Regular Fit" },
    { id: "style", label: "Style", value: "Wrap / Midi" },
    { id: "fabric", label: "Fabric", value: "Viscose Blend" },
    { id: "color", label: "Color", value: "Blush Pink" },
    { id: "season", label: "Season", value: "Spring / Summer" },
    { id: "occasion", label: "Occasion", value: "Casual, Party" },
    { id: "pattern", label: "Pattern", value: "Floral Print" },
    { id: "closure", label: "Closure", value: "Wrap Tie" },
  ],
  accordions: [
    {
      id: "size-fit",
      title: "Size Fit",
      body: "True to size. Model is 5'9\" wearing size M. Loose-fitting silhouette with relaxed shoulders and a generous body length.",
    },
    {
      id: "materials",
      title: "Materials & Care",
      body: "60% Cotton, 40% Polyester. Machine wash cold with similar colors. Do not bleach. Tumble dry low. Iron on reverse side.",
    },
    {
      id: "delivery",
      title: "Delivery & Returns",
      body: "Free standard shipping on orders over $20. Express delivery available at checkout. 30-day free returns on unworn items with original tags.",
    },
    {
      id: "shop-info",
      title: "Shop Info",
      body: "Sold by TY DIRECT Marketplace. Authorized seller with verified business credentials and 45.5K followers.",
    },
  ],
};
