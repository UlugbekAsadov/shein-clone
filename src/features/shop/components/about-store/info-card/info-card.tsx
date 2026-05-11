import type { IAboutInfoCard } from "@/features/shop/interfaces/about-info.interface";
import { InfoCardItem } from "./info-card-item";

interface IProps {
  card: IAboutInfoCard;
}

export function InfoCard({ card }: IProps) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <h3 className="text-sm font-bold text-foreground">{card.title}</h3>
      <ul className="mt-4 space-y-4">
        {card.items.map((item) => (
          <InfoCardItem key={item.id} item={item} />
        ))}
      </ul>
    </section>
  );
}
