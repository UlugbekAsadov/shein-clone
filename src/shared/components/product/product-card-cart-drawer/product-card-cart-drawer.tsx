"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
} from "@/shared/components/ui/drawer";
import { ProductSizeSelector } from "@/shared/components/product/product-preview/product-size-selector";
import { sizes } from "@/shared/mocks/product-preview.mocks";
import { RECOMMENDED_SIZE } from "@/shared/constants/product-preview.constants";

interface IProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductCardCartDrawer({ open, onOpenChange }: IProps) {
  const [selectedSize, setSelectedSize] = useState(RECOMMENDED_SIZE);

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="px-5 pb-6">
        <div className="mt-2 flex items-center justify-between">
          <DrawerTitle className="text-lg font-bold">
            Select a size
          </DrawerTitle>
          <DrawerClose asChild>
            <button
              type="button"
              aria-label="Close"
              className="grid size-7 cursor-pointer place-items-center rounded-full bg-secondary text-foreground"
            >
              <X className="size-4" />
            </button>
          </DrawerClose>
        </div>

        <ProductSizeSelector
          sizes={sizes}
          value={selectedSize}
          recommended={RECOMMENDED_SIZE}
          onChange={setSelectedSize}
          headerAction={
            <span className="text-sm font-medium text-sky-500">
              Size Guide &gt;
            </span>
          }
        />

        <Button
          className="mt-6 h-12 w-full rounded-2xl text-base font-semibold"
          onClick={() => onOpenChange(false)}
        >
          Add cart
        </Button>
      </DrawerContent>
    </Drawer>
  );
}
