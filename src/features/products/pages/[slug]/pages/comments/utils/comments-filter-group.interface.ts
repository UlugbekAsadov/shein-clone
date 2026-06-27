import type { ICountedOption } from "@/features/products/pages/[slug]/pages/comments/utils/comments-filter.interface";

export interface ICommentsFilterGroup {
  key: string;
  label: string;
  options: ICountedOption[];
  selected: string[];
  onToggle: (id: string) => void;
  onClear: () => void;
}
