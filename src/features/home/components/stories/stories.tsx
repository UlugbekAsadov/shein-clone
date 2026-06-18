import { getShopStories } from "@/features/home/services/shop-stories.service";
import { StoriesList } from "./stories-list";

export async function Stories() {
  const shops = await getShopStories();
  const activeShops = shops.filter((shop) => shop.has_active_stories);

  if (activeShops.length === 0) return null;

  return <StoriesList shops={activeShops} />;
}
