export interface IBrand {
  id: string;
  slug: string;
  name: string;
  image: string;
  brandBg?: string;
  storyViewed?: boolean;
  contents: string[];
}
