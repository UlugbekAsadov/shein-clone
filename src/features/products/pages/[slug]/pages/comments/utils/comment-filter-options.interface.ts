export interface ICommentQuickFilter {
  key: string;
  label: string;
  available: boolean;
  comments_count: number;
}

export interface ICommentRatingFilter {
  key: string;
  label: string;
  available: boolean;
  comments_count: number;
}

export interface ICommentAttributeFilter {
  id: number;
  name: string;
  value: string;
  hex: string;
  available: boolean;
  comments_count: number;
}

export interface ICommentFilterOptions {
  quick_filters: ICommentQuickFilter[];
  ratings: ICommentRatingFilter[];
  colors: ICommentAttributeFilter[];
  sizes: ICommentAttributeFilter[];
}
