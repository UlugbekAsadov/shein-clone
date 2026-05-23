import type { IProductSpec } from "@/features/product/interfaces/product-detail.interface";
import { ProductSpecTag } from "./product-spec-tag";

interface IProps {
  specs: IProductSpec[];
}

export function ProductSpecTags({ specs }: IProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {specs.map((spec) => (
        <ProductSpecTag key={spec.id} spec={spec} />
      ))}
    </div>
  );
}
