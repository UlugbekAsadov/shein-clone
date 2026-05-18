import type { IAboutInfoCard } from "@/features/shop/interfaces/about-info.interface";
import { InfoCardItem } from "./info-card-item";
import { cn } from "@/lib/utils";

interface IProps {
  card: IAboutInfoCard;
}

export function InfoCard({ card }: IProps) {
  return (
    <section className={cn("rounded-md bg-secondary p-3", "md:p-5")}>
      <h3
        className={cn("font-semibold text-foreground text-sm", "md:text-base")}
      >
        {card.title}
      </h3>
      <ul className="mt-4 space-y-3">
        {card.items.map((item) => (
          <InfoCardItem key={item.id} item={item} />
        ))}
      </ul>
    </section>
  );
}
