import type { IRatingBucket } from "@/features/product/pages/[slug]/pages/comments/utils/rating-distribution.interface";

export const ratingDistributionMock: IRatingBucket[] = [
  { id: "r-1", stars: 1, percent: 2 },
  { id: "r-2", stars: 2, percent: 4 },
  { id: "r-3", stars: 3, percent: 3 },
  { id: "r-4", stars: 4, percent: 10 },
  { id: "r-5", stars: 5, percent: 88 },
];
