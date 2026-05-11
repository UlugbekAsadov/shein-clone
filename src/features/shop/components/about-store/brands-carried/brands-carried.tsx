import type { IBrandChip } from "@/features/shop/interfaces/brand-chip.interface";
import { BrandChipItem } from "./brand-chip-item";

interface IProps {
  title: string;
  brands: IBrandChip[];
}

export function BrandsCarried({ title, brands }: IProps) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <h3 className="text-sm font-bold text-foreground">{title}</h3>
      <div className="mt-4 flex flex-wrap gap-2">
        {brands.map((b) => (
          <BrandChipItem key={b.id} brand={b} />
        ))}
      </div>
    </section>
  );
}
