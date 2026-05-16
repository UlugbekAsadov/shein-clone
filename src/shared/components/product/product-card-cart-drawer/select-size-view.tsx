"use client";

import { ProductSizeSelector } from "@/shared/components/product/product-preview/product-size-selector";
import { sizes } from "@/shared/mocks/product-preview.mocks";
import { RECOMMENDED_SIZE } from "@/shared/constants/product-preview.constants";

interface IProps {
  selectedSize: string;
  onSizeChange: (id: string) => void;
  onShowGuide: () => void;
}

export function SelectSizeView({
  selectedSize,
  onSizeChange,
  onShowGuide,
}: IProps) {
  return (
    <ProductSizeSelector
      sizes={sizes}
      value={selectedSize}
      recommended={RECOMMENDED_SIZE}
      onChange={onSizeChange}
      headerAction={
        <button
          type="button"
          onClick={onShowGuide}
          className="cursor-pointer text-sm font-medium text-sky-500"
        >
          Size Guide &gt;
        </button>
      }
    />
  );
}
