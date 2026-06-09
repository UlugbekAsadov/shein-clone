import { getShopStories } from "@/features/home/services/shop-stories.service";
import { StoriesList } from "./stories-list";

export async function Stories() {
  const shops = await getShopStories();

  if (shops.length === 0) return null;

  return <StoriesList shops={shops} />;
}
