import { IProduct } from "@/types";
import { ProductRatingStars } from "../product-rating-stars";
import { ProductColorSelector } from "../product-color-selector";
import { ProductSizeSelector } from "../product-size-selector";
import { ProductQtyStepper } from "../product-qty-stepper";
import { useState } from "react";
import { colorSwatches, sizes } from "@/shared/mocks";
import {
  DESCRIPTION,
  RECOMMENDED_SIZE,
} from "@/shared/constants/product-preview.constants";
import { Button } from "@/shared/components/ui/button";

interface IProps {
  product: IProduct;
  onClose: () => void;
}

export const ProductPreviewInfo = ({ product, onClose }: IProps) => {
  const [colorId, setColorId] = useState(colorSwatches[0].id);
  const [sizeId, setSizeId] = useState("XS");
  const [qty, setQty] = useState(1);
  const soldCount = product.reviews * 5 + 123;

  return (
    <div className="flex flex-col  pr-2">
      <div>
        <h2 className="text-[28px] font-semibold leading-tight">
          {product.title}
        </h2>
        <div className="mt-3 flex items-center gap-3 text-xs">
          <ProductRatingStars />
          <span className="text-secondary-foreground">|</span>
          <span className="text-secondary-foreground">
            {product.reviews} reviews
          </span>
          <span className="text-secondary-foreground">|</span>
          <span className="text-secondary-foreground">{soldCount} sold</span>
        </div>
        <p className="mt-3 text-sm text-secondary-foreground">{DESCRIPTION}</p>
      </div>

      <div className="flex items-baseline gap-3 mt-3">
        <span className="text-4xl font-bold">{product.price.toFixed(1)}$</span>
        {product.originalPrice && (
          <span className="text-lg text-secondary-foreground line-through">
            {product.originalPrice.toFixed(1)}$
          </span>
        )}
        {product.saveLabel && (
          <span className="rounded-md bg-emerald-100 px-2.5 py-1 text-sm font-semibold text-emerald-700">
            {product.saveLabel}
          </span>
        )}
      </div>

      <ProductColorSelector
        swatches={colorSwatches}
        value={colorId}
        onChange={setColorId}
      />

      <ProductSizeSelector
        sizes={sizes}
        value={sizeId}
        recommended={RECOMMENDED_SIZE}
        onChange={setSizeId}
      />

      <ProductQtyStepper value={qty} onChange={setQty} />

      <div className="mt-5 flex gap-3">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 cursor-pointer rounded-[18px] bg-foreground py-3 text-base font-semibold text-background transition hover:bg-foreground/90"
        >
          Add to cart
        </button>

        <button
          type="button"
          onClick={onClose}
          className="flex-1 cursor-pointer rounded-[18px] border border-foreground bg-background hover:bg-muted"
        >
          Buy now
        </button>
      </div>
    </div>
  );
};
