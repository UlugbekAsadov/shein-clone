import Image from "next/image";
import type { IBrandChip } from "@/features/shop/interfaces/brand-chip.interface";

interface IProps {
  brand: IBrandChip;
}

export function BrandChipItem({ brand }: IProps) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground">
      <span className="relative size-5 overflow-hidden rounded-full bg-background">
        <Image src={brand.logo} alt={brand.name} fill sizes="20px" />
      </span>
      {brand.name}
    </span>
  );
}
