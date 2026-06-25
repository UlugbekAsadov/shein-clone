"use client";

import { useState } from "react";
import type { ISize } from "@/types/size.interface";
import { useDictionary } from "@/core/config/i18n/use-dictionary";
import { ProductSizeSelector } from "@/shared/components/product/product-preview/product-size-selector";
import { ProductMobileSizeGuideDrawer } from "./product-mobile-size-guide-drawer";

interface IProps {
  sizes: ISize[];
  value: string;
  recommended: string;
  error?: boolean;
  onChange: (id: string) => void;
}

export function ProductMobileSize({
  sizes,
  value,
  recommended,
  error,
  onChange,
}: IProps) {
  const dict = useDictionary();
  const [guideOpen, setGuideOpen] = useState(false);

  return (
    <div className="mt-3.5">
      <ProductSizeSelector
        variant="card"
        showHeader
        showRecommendation
        error={error}
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
            {dict.common.sizeGuide} &gt;
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
