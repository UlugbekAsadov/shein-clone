export interface ICoupon {
  id: string;
  expiresAt: string;
  daysLeft: number;
  discount: string;
  title: string;
  minOrderAmount: number;
  code: string;
}
