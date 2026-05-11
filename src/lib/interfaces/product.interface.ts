export interface IProduct {
  id: string;
  slug?: string;
  title: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  badge?: "Original" | "New" | "Sale";
  saveLabel?: string;
  discountLabel?: string;
  delivery?: string;
}
