export interface IProduct {
  id: string;
  slug?: string;
  title: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  rating: number;
  reviews: number;
  badge?: "Original" | "New" | "Sale";
  discountLabel?: string;
  delivery?: string;
}
