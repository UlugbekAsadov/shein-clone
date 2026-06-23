"use client";

import type { ISwatch } from "@/types/swatch.interface";
import type { ISize } from "@/types/size.interface";
import { ProductMobileColor } from "@/features/products/pages/[slug]/components/product-mobile/product-mobile-color";
import { ProductSizeSelector } from "@/shared/components/product/product-preview/product-size-selector";

interface IProps {
  colors: ISwatch[];
  colorValue: string;
  colorError: boolean;
  onColorChange: (id: string) => void;
  sizes: ISize[];
  sizeValue: string;
  sizeError: boolean;
  recommended: string;
  onSizeChange: (id: string) => void;
  onShowGuide: () => void;
}

export function SelectSizeView({
  colors,
  colorValue,
  colorError,
  onColorChange,
  sizes,
  sizeValue,
  sizeError,
  recommended,
  onSizeChange,
  onShowGuide,
}: IProps) {
  return (
    <div>
      {colors.length > 0 && (
        <ProductMobileColor
          swatches={colors}
          value={colorValue}
          error={colorError}
          onChange={onColorChange}
        />
      )}

      {sizes.length > 0 && (
        <ProductSizeSelector
          variant="card"
          sizes={sizes}
          value={sizeValue}
          recommended={recommended}
          error={sizeError}
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
      )}
    </div>
  );
}
