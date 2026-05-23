import { Truck } from "lucide-react";
import type { IProductDetail } from "@/features/product/interfaces/product-detail.interface";
import { ProductInfoAccordion } from "./product-info-accordion";
import { ProductSpecTags } from "./product-spec-tags";
import {
  InfoCircle,
  LayersMinimalistic,
  Ruler,
  Scissors,
} from "@solar-icons/react/ssr";

const accordionIcons = {
  "size-fit": Ruler,
  materials: Scissors,
  delivery: Truck,
  "shop-info": InfoCircle,
} as const;

interface IProps {
  product: IProductDetail;
}

export function ProductDescriptionSection({ product }: IProps) {
  return (
    <div className="flex flex-col border rounded-lg overflow-hidden">
      <ProductInfoAccordion
        title="Description"
        icon={LayersMinimalistic}
        defaultOpen
      >
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
