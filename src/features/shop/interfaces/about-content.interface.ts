import type { IAboutInfoCard } from "./about-info.interface";
import type { IBrandChip } from "./brand-chip.interface";

export interface IAboutContent {
  intro: string;
  cards: IAboutInfoCard[];
  brands: IBrandChip[];
}
