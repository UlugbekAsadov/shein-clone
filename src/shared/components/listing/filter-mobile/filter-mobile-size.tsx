"use client";

import { useState } from "react";
import { ProductSizeSelector } from "@/shared/components/product/product-preview/product-size-selector";
import { mobileFilterClothingSizes } from "@/shared/mocks";

const RECOMMENDED_SIZE = "M";

export function FilterMobileSize() {
  const [value, setValue] = useState<string>(RECOMMENDED_SIZE);

  return (
    <ProductSizeSelector
      variant="card"
      showHeader
      className="mt-0"
      sizes={mobileFilterClothingSizes}
      value={value}
      recommended={RECOMMENDED_SIZE}
      onChange={setValue}
    />
  );
}
