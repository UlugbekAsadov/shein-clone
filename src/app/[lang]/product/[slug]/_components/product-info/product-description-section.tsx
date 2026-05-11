import { Ruler, Shirt, Store, Truck } from "lucide-react";
import type { IProductDetail } from "../../_lib/interface/product-detail.interface";
import { ProductInfoAccordion } from "./product-info-accordion";
import { ProductSpecTags } from "./product-spec-tags";

const accordionIcons = {
  "size-fit": Ruler,
  materials: Shirt,
  delivery: Truck,
  "shop-info": Store,
} as const;

interface IProps {
  product: IProductDetail;
}

export function ProductDescriptionSection({ product }: IProps) {
  return (
    <div className="flex flex-col gap-3">
      <ProductInfoAccordion title="Description" defaultOpen>
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
