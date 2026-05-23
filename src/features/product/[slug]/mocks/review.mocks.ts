import { galleryPool } from "@/shared/mocks";
import type {
  IFitStat,
  IReview,
} from "@/features/product/interfaces/review.interface";

export const fitStatsMock: IFitStat[] = [
  { id: "small", label: "Small", percent: 18 },
  { id: "true-1", label: "True to Size", percent: 12 },
  { id: "true-2", label: "True to Size", percent: 70 },
];

export const reviewMediaMock: string[] = [
  galleryPool[0],
  galleryPool[1],
  galleryPool[2],
  galleryPool[3],
  galleryPool[4],
  galleryPool[0],
];

const standardMeta = [
  { id: "fit", label: "Overall Fit", value: "True to size" },
  { id: "color", label: "Color", value: "Black" },
  { id: "size", label: "Size", value: "M" },
  { id: "qty", label: "Qty", value: "4" },
];

export const reviewsMock: IReview[] = [
  {
    id: "r-1",
    user: "Bekzod",
    date: "7 Apr, 2026",
    rating: 4,
    meta: standardMeta,
    text: "Really love this sweatshirt! The material feels premium and it's super comfortable. Fits perfectly.",
    countryFlag: "🇺🇿",
    countryLabel: "From Uzbekistan",
    helpful: 4,
  },
  {
    id: "r-2",
    user: "Amer",
    date: "12 Apr, 2026",
    rating: 4,
    meta: standardMeta,
    text: "Honestly didn't expect this quality for the price. The fabric is soft, warm, and the fit is just right. I've already worn it multiple times!",
    images: [galleryPool[0], galleryPool[1], galleryPool[2]],
    countryFlag: "🇹🇷",
    countryLabel: "Turkey",
    helpful: 2,
  },
  {
    id: "r-3",
    user: "Axel",
    date: "12 Apr, 2026",
    rating: 5,
    meta: standardMeta,
    text: "This sweatshirt exceeded my expectations. Great quality, clean design, and very comfortable to wear all day.",
    countryFlag: "🇩🇪",
    countryLabel: "Germany",
    helpful: 8,
  },
];
