export interface IShippingStep {
  id: number;
  segment: string;
  min_days: number;
  max_days: number;
  price: number;
  currency: string;
  is_active: boolean;
  note: string | null;
}
