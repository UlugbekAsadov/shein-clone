export interface ICategory {
  id: string;
  name: string;
  slug: string;
  image?: string;
  badge?: string;
}

export interface ICategoryGroup {
  id: string;
  name: string;
  items: ICategory[];
}
