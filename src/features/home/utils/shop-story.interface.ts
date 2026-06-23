export interface IShopStory {
  id: number;
  username: string;
  name: string;
  display_name: string;
  avatar_url: string;
  is_verified: boolean;
  active_stories_count: number;
  viewed_stories_count: number;
  has_active_stories: boolean;
  has_unviewed_stories: boolean;
  all_stories_viewed: boolean;
  story_ring_state: "unviewed" | "viewed" | "none";
}
