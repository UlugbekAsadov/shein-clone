export interface IStoryText {
  en: string;
  ru: string;
  uz: string;
}

export interface IStoryButtonStyle {
  color: string;
  background: string;
}

export interface IStory {
  id: number;
  shop_id: number;
  media_type: "image" | "video";
  media_url: string;
  audio_url: string | null;
  thumbnail_url: string | null;
  is_active: boolean;
  starts_at: string | null;
  expires_at: string | null;
  headline_text: IStoryText;
  tagline_text: IStoryText;
  call_action: boolean;
  call_button: IStoryText | null;
  action_url: string | null;
  call_action_button_style: IStoryButtonStyle | null;
  is_pinned: boolean;
  sort: number;
  duration: number;
  is_viewed: boolean;
  created_at: string;
  updated_at: string;
}
