import { galleryPool } from "@/lib/mock-data";

export const commentsMediaMock: string[] = Array.from(
  { length: 14 },
  (_, i) => galleryPool[i % galleryPool.length],
);

export const commentsVideoIndex = 7;
