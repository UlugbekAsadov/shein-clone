export interface IMobileCategorySubgroup {
  id: string;
  name: string;
  slug: string;
  count: number;
}

export interface IMobileCategoryGroup {
  id: string;
  name: string;
  slug: string;
  image: string;
  children?: IMobileCategorySubgroup[];
}
