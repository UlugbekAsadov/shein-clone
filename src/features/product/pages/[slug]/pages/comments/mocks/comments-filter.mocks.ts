import type { ICountedOption } from "@/features/product/pages/[slug]/pages/comments/utils/comments-filter.interface";

export const ratingFilterOptions: ICountedOption[] = [
  { id: "5", label: "5 star", count: 1300 },
  { id: "4", label: "4 star", count: 200 },
  { id: "3", label: "3 star", count: 24 },
  { id: "2", label: "2 star", count: 12 },
  { id: "1", label: "1 star", count: 6 },
];

export const contentTypeFilterOptions: ICountedOption[] = [
  { id: "image", label: "Image", count: 342 },
  { id: "video", label: "Video", count: 342 },
  { id: "text", label: "Text", count: 342 },
];
