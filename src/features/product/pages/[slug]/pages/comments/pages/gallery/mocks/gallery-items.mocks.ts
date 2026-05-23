import { galleryPool } from "@/shared/mocks";
import type { IReview } from "@/features/product/pages/[slug]/utils/review.interface";
import type { IGalleryItem } from "@/features/product/pages/[slug]/pages/comments/pages/gallery/utils/gallery-item.interface";

const anvarReview: IReview = {
  id: "anvar-gallery",
  user: "Anvar",
  date: "12 Apr, 2026",
  rating: 4,
  meta: [
    { id: "fit", label: "Overall Fit", value: "Ture to size" },
    { id: "color", label: "Colar", value: "Black" },
    { id: "size", label: "Size", value: "M" },
    { id: "qty", label: "Qty", value: "4" },
  ],
  text: "Honestly didn't expect this quality for the price. The fabric is soft, warm, and the fit is just right. I've already worn it multiple times!",
  images: [galleryPool[0], galleryPool[2], galleryPool[1]],
  countryFlag: "🇹🇷",
  countryLabel: "Turkey",
  helpful: 2,
  sellerResponse: {
    shopName: "Shop",
    date: "12 Apr, 2026",
    text: "Thank you so much for your kind words! We're thrilled to hear that the quality and comfort exceeded your expectations. Enjoy wearing it, and we hope to see you again soon!",
  },
};

const VIDEO_INDEX = 9;

export const galleryItemsMock: IGalleryItem[] = Array.from(
  { length: 10 },
  (_, i) => ({
    id: `gi-${i}`,
    type: i === VIDEO_INDEX ? "video" : "image",
    src: galleryPool[i % galleryPool.length],
    review: { ...anvarReview, id: `anvar-gallery-${i}` },
  }),
);
