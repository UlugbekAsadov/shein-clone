"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { IProductDetail } from "../_lib/interface/product-detail.interface";

interface IProps {
  product: IProductDetail;
}

export function ProductStickyBar({ product }: IProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 600);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        "fixed inset-x-0 top-0 z-50 pointer-events-none transition-all duration-300 ease-out shadow-lg bg-background",
        visible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0",
      )}
    >
      <div className="mx-auto max-w-[1440px] px-6">
        <div
          className={cn(
            "flex items-center  gap-4 bg-background px-4 py-3 ",
            visible && "pointer-events-auto",
          )}
        >
          <div className="flex items-center flex-1 gap-2">
            <div className="relative w-14 aspect-3/4 shrink-0 overflow-hidden rounded-sm bg-muted">
              <Image
                src={product.gallery[0]}
                alt={product.title}
                fill
                quality={90}
                sizes="56px"
                className="object-cover"
              />
            </div>

            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold leading-none">
                {product.price.toFixed(1)}$
              </span>
              {product.originalPrice && (
                <span className="text-muted-foreground line-through">
                  {product.originalPrice.toFixed(2)}$
                </span>
              )}
              {product.saveLabel && (
                <span className="rounded-[8px] bg-emerald-100 px-2 py-1.5 text-xs font-semibold text-emerald-700">
                  {product.saveLabel}
                </span>
              )}
            </div>
          </div>

          <div className=" flex items-center gap-3">
            <Button
              type="button"
              className="min-w-[220px] rounded-lg px-10 py-3 text-sm font-semibold"
              size="lg"
            >
              Add to cart
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="icon"
              className="size-11 rounded-full"
              aria-label="Add to wishlist"
            >
              <Heart className="size-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
