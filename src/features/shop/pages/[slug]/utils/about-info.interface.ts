export interface IAboutInfoItem {
  id: string;
  icon:
    | "mapPin"
    | "truck"
    | "store"
    | "shieldCheck"
    | "thumbsUp"
    | "messageSquare"
    | "clock";
  title: string;
  subtitle: string;
}

export interface IAboutInfoCard {
  id: string;
  title: string;
  items: IAboutInfoItem[];
}
