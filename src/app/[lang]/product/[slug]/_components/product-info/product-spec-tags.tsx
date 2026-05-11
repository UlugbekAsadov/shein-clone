import type { IProductSpec } from "../../_lib/interface/product-detail.interface";
import { ProductSpecTag } from "./product-spec-tag";

interface IProps {
  specs: IProductSpec[];
}

export function ProductSpecTags({ specs }: IProps) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {specs.map((spec) => (
        <ProductSpecTag key={spec.id} spec={spec} />
      ))}
    </div>
  );
}
