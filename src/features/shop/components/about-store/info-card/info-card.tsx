import type { IAboutInfoCard } from "@/features/shop/interfaces/about-info.interface";
import { InfoCardItem } from "./info-card-item";

interface IProps {
  card: IAboutInfoCard;
}

export function InfoCard({ card }: IProps) {
  return (
    <section className="rounded-md bg-secondary p-5">
      <h3 className="font-semibold text-foreground">{card.title}</h3>
      <ul className="mt-4 space-y-3">
        {card.items.map((item) => (
          <InfoCardItem key={item.id} item={item} />
        ))}
      </ul>
    </section>
  );
}
