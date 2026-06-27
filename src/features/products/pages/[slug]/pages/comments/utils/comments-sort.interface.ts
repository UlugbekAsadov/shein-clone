export interface ICommentsSortOption {
  id: string;
  label: string;
}

export interface ICommentsSortControl {
  value: string;
  options: ICommentsSortOption[];
  onChange: (id: string) => void;
}
