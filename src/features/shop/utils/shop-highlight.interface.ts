import type { IStory, IStoryText } from "@/features/home/utils/story.interface";

export interface IApiShopHighlight {
  id: number;
  shop_id: number;
  name: IStoryText;
  display_name: string;
  thumbnail_url: string;
  is_active: boolean;
  sort: number;
  stories: IStory[];
  created_at: string;
  updated_at: string;
}

export interface IApiShopHighlightsPage {
  data: IApiShopHighlight[];
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
    per_page: number;
    to: number | null;
    total: number;
  };
}
