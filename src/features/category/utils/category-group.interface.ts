export interface ICategory {
  id: number;
  title: string;
  slug: string;
  image_url: string;
  mobile_image_url: string;
  children: ICategory[];
}
