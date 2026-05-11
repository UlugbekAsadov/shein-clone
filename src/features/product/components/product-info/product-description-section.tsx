import { Info, Layers, Ruler, Scissors, Truck } from "lucide-react";
import type { IProductDetail } from "@/features/product/types";
import { ProductInfoAccordion } from "./product-info-accordion";
import { ProductSpecTags } from "./product-spec-tags";

const accordionIcons = {
  "size-fit": Ruler,
  materials: Scissors,
  delivery: Truck,
  "shop-info": Info,
} as const;

interface IProps {
  product: IProductDetail;
}

export function ProductDescriptionSection({ product }: IProps) {
  return (
    <div className="flex flex-col border rounded-lg overflow-hidden">
      <ProductInfoAccordion title="Description" icon={Layers} defaultOpen>
        <p className="mb-4 text-foreground">{product.subtitle}</p>
        <ProductSpecTags specs={product.specs} />
      </ProductInfoAccordion>

      {product.accordions.map((item) => {
        const Icon = accordionIcons[item.id as keyof typeof accordionIcons];
        return (
          <ProductInfoAccordion key={item.id} title={item.title} icon={Icon}>
            {item.body}
          </ProductInfoAccordion>
        );
      })}
    </div>
  );
}
