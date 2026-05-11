export interface ISellerStat {
  id: string;
  label: string;
  value: string;
}

export interface ISellerCard {
  id: string;
  name: string;
  tag: string;
  avatar: string;
  banner: string;
  rating: number;
  badgeLabel: string;
  stats: ISellerStat[];
}
