import type { ICategory as IApiCategory } from "@/features/category/utils/category-group.interface";
import type { ICategory } from "@/types/category.interface";

export const mapApiCategory = (c: IApiCategory): ICategory => ({
  id: String(c.id),
  name: c.title,
  slug: c.slug,
  image: c.image_url,
});
