"use client";

import { useState } from "react";
import type { IProductDetail } from "@/features/product/pages/[slug]/utils/product-detail.interface";
import { ProductColorSelector } from "@/shared/components/product/product-preview/product-color-selector";
import { ProductSizeSelector } from "@/shared/components/product/product-preview/product-size-selector";
import { ProductQtyStepper } from "@/shared/components/product/product-preview/product-qty-stepper";
import { ProductRatingStars } from "@/shared/components/product/product-preview/product-rating-stars";
import { Button } from "@/shared/components/ui/button";

interface IProps {
  product: IProductDetail;
}

export function ProductInfoPanel({ product }: IProps) {
  const [colorId, setColorId] = useState(product.colors[0].id);
  const [sizeId, setSizeId] = useState(product.recommendedSize);
  const [qty, setQty] = useState(1);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-3xl font-bold leading-tight">{product.title}</h1>
        <div className="mt-3 flex items-center gap-3 text-sm">
          <ProductRatingStars />
          <span className="text-muted-foreground">|</span>
          <span className="text-muted-foreground">
            {product.reviews} reviews
          </span>
          <span className="text-muted-foreground">|</span>
          <span className="text-muted-foreground">{product.sold} sold</span>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">{product.subtitle}</p>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-4xl font-bold">{product.price.toFixed(1)}$</span>
        {product.originalPrice && (
          <span className="text-lg text-muted-foreground line-through">
            {product.originalPrice.toFixed(2)}$
          </span>
        )}
        {product.saveLabel && (
          <span className="rounded-sm bg-emerald-100 px-2.5 py-1.5 text-sm font-semibold text-emerald-700">
            {product.saveLabel}
          </span>
        )}
      </div>

      <ProductColorSelector
        swatches={product.colors}
        value={colorId}
        onChange={setColorId}
      />

      <ProductSizeSelector
        sizes={product.sizes}
        value={sizeId}
        recommended={product.recommendedSize}
        onChange={setSizeId}
      />

      <ProductQtyStepper value={qty} onChange={setQty} />

      <div className="mt-2 flex gap-3">
        <Button
          type="button"
          className="flex-1 cursor-pointer py-4 text-base font-semibold transition hover:bg-foreground/90"
          variant="default"
          size="lg"
        >
          Add to cart
        </Button>

        <Button
          type="button"
          className="flex-1 cursor-pointer py-4 text-base font-semibold transition"
          variant="outline"
          size="lg"
        >
          Buy now
        </Button>
      </div>
    </div>
  );
}
