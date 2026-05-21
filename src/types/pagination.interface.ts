export interface IPaginationMeta {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

export interface IPaginatedResponse<TItem> {
  items: TItem[];
  meta: IPaginationMeta;
}

export interface IPaginationParams {
  page?: number;
  perPage?: number;
}
