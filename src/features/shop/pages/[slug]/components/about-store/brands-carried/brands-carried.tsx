import type { IApiShopAboutBrand } from "@/features/shop/utils/shop-response.interface";
import { BrandChipItem } from "./brand-chip-item";
import { cn } from "@/lib/utils";

interface IProps {
  title: string;
  brands: IApiShopAboutBrand[];
}

export function BrandsCarried({ title, brands }: IProps) {
  return (
    <section className={cn("rounded-md bg-secondary p-3", "md:p-5")}>
      <h3 className={cn("text-sm font-bold text-foreground", "md:text-xl")}>
        {title}
      </h3>
      <div
        className={cn(
          "mt-3.5 flex flex-nowrap overflow-scroll gap-2 scrollbar-hidden",
          "md:flex-wrap md:overflow-auto md:mt-4",
        )}
      >
        {brands.map((b) => (
          <BrandChipItem key={b.id} brand={b} />
        ))}
      </div>
    </section>
  );
}
