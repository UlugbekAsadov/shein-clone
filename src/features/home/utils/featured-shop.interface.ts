interface IApiBadgeTextStyle {
  color: string;
  fontWeight: string;
}

interface IApiBadgeWrapperStyle {
  padding: string;
  clipPath: string;
  background: string;
  borderRadius: string;
}

interface IApiBadgeStyle {
  text: IApiBadgeTextStyle;
  wrapper: IApiBadgeWrapperStyle;
}

export interface IApiBadge {
  id: number;
  slug: string;
  name: string;
  position: string;
  style: IApiBadgeStyle;
  icon: string;
}

export interface IApiFeaturedShop {
  id: number;
  username: string;
  name: string;
  display_name: string;
  avatar_url: string;
  banner_url: string;
  seller_type: string;
  is_verified: boolean;
  rating: number;
  sales_count: number;
  seller_years: number;
  is_followed: boolean;
  badges: IApiBadge[];
}

export interface IApiFeaturedShopsPage {
  data: IApiFeaturedShop[];
}
