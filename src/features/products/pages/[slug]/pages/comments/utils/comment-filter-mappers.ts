import type { ICommentFilterOptions } from "@/features/products/pages/[slug]/pages/comments/utils/comment-filter-options.interface";
import type { ICountedOption } from "@/features/products/pages/[slug]/pages/comments/utils/comments-filter.interface";
import type { IRatingBucket } from "@/features/products/pages/[slug]/pages/comments/utils/rating-distribution.interface";

export function toRatingOptions(
  options: ICommentFilterOptions | null | undefined,
): ICountedOption[] {
  if (!options) return [];
  return options.ratings.map((rating) => ({
    id: rating.key,
    label: rating.label,
    count: rating.comments_count,
    available: rating.available,
  }));
}

export function toContentTypeOptions(
  options: ICommentFilterOptions | null | undefined,
): ICountedOption[] {
  if (!options) return [];
  return options.quick_filters
    .filter((quick) => quick.key !== "all")
    .map((quick) => ({
      id: quick.key,
      label: quick.label,
      count: quick.comments_count,
      available: quick.available,
    }));
}

function toAttributeOptions(
  attributes: ICommentFilterOptions["colors"],
): ICountedOption[] {
  return attributes.map((attribute) => ({
    id: String(attribute.id),
    label: attribute.name,
    count: attribute.comments_count,
    available: attribute.available,
  }));
}

export function toColorOptions(
  options: ICommentFilterOptions | null | undefined,
): ICountedOption[] {
  if (!options) return [];
  return toAttributeOptions(options.colors);
}

export function toSizeOptions(
  options: ICommentFilterOptions | null | undefined,
): ICountedOption[] {
  if (!options) return [];
  return toAttributeOptions(options.sizes);
}

export function toRatingBuckets(
  options: ICommentFilterOptions | null | undefined,
): IRatingBucket[] {
  if (!options) return [];
  const total = options.ratings.reduce(
    (sum, rating) => sum + rating.comments_count,
    0,
  );
  return options.ratings.map((rating) => ({
    id: rating.key,
    stars: Number(rating.key),
    percent: total > 0 ? Math.round((rating.comments_count / total) * 100) : 0,
  }));
}
