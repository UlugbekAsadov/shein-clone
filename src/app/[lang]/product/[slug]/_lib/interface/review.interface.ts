export interface IReviewMeta {
  id: string;
  label: string;
  value: string;
}

export interface ISellerResponse {
  shopName: string;
  date: string;
  text: string;
}

export interface IReview {
  id: string;
  user: string;
  date: string;
  rating: number;
  meta: IReviewMeta[];
  text: string;
  images?: string[];
  countryFlag: string;
  countryLabel: string;
  helpful: number;
  sellerResponse?: ISellerResponse;
}

export interface IFitStat {
  id: string;
  label: string;
  percent: number;
}
