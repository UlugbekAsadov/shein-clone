import Image from "next/image";
import type { IApiShopAboutBrand } from "@/features/shop/utils/shop-response.interface";

interface IProps {
  brand: IApiShopAboutBrand;
}

export function BrandChipItem({ brand }: IProps) {
  return (
    <span className="inline-flex items-center gap-2 rounded-[12px] bg-white px-[18px] py-3 text-sm font-medium text-foreground">
      <span className="relative size-5 overflow-hidden rounded-full bg-background">
        <Image src={brand.image_url} alt={brand.name} fill sizes="20px" />
      </span>
      {brand.name}
    </span>
  );
}
