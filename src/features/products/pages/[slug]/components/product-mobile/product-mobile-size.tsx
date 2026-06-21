"use client";

import { useState } from "react";
import type { ISize } from "@/types/size.interface";
import { ProductSizeSelector } from "@/shared/components/product/product-preview/product-size-selector";
import { ProductMobileSizeGuideDrawer } from "./product-mobile-size-guide-drawer";

interface IProps {
  sizes: ISize[];
  value: string;
  recommended: string;
  onChange: (id: string) => void;
}

export function ProductMobileSize({
  sizes,
  value,
  recommended,
  onChange,
}: IProps) {
  const [guideOpen, setGuideOpen] = useState(false);

  return (
    <div className="mt-3.5">
      <ProductSizeSelector
        variant="card"
        showHeader
        showRecommendation
        className="mt-0"
        sizes={sizes}
        value={value}
        recommended={recommended}
        onChange={onChange}
        headerAction={
          <button
            type="button"
            onClick={() => setGuideOpen(true)}
            className="text-sm font-medium text-sky-500"
          >
            Size Guide &gt;
          </button>
        }
      />

      <ProductMobileSizeGuideDrawer
        open={guideOpen}
        onOpenChange={setGuideOpen}
        selectedSize={value}
      />
    </div>
  );
}
