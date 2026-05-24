export interface IBanner {
  id: number;
  title: string;
  image_url: string;
  target_type: "web" | "category" | "product" | "shop";
  target_id: string;
}
