export interface IColorSwatch {
  id: string;
  name: string;
  hex: string;
  ring?: boolean;
}

export interface ISizeOption {
  id: string;
  label: string;
}

export interface IBrandFilter {
  id: string;
  name: string;
  count: number;
  swatch?: string;
}

export interface IStyleOption {
  id: string;
  label: string;
}

export interface IMaterialOption {
  id: string;
  label: string;
}

export interface IPricePreset {
  id: string;
  label: string;
}

export interface ICategoryNode {
  id: string;
  name: string;
  count: number;
  children?: ICategoryNode[];
}

export interface ISortOption {
  id: string;
  label: string;
}
