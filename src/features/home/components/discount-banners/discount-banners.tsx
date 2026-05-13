import { discountTiles } from "@/shared/mocks";
import { DiscountBannerCard } from "./discount-banner-card";

interface IProps {
  discountLabel: string;
}

export function DiscountBanners({ discountLabel }: IProps) {
  return (
    <section className="mx-auto max-w-360 px-4 py-2 md:px-6 md:py-3 md:pb-18.5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
        {discountTiles.map((tile) => (
          <DiscountBannerCard
            key={tile.id}
            tile={tile}
            discountLabel={discountLabel}
          />
        ))}
      </div>
    </section>
  );
}
