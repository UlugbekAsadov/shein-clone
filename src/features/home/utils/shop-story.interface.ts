export interface IShop {
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

export interface IShopStoriesPage {
  data: IShop[];
  links: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number | null;
    last_page: number;
    path: string;
    per_page: number;
    to: number | null;
    total: number;
  };
}
