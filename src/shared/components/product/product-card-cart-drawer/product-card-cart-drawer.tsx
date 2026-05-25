"use client";

import { useState } from "react";
import { AltArrowLeft } from "@solar-icons/react";
import { XIcon } from "@/shared/components/icons/outline";
import { cn } from "@/lib/utils";
import { Button } from "@/shared/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
} from "@/shared/components/ui/drawer";
import { RECOMMENDED_SIZE } from "@/shared/constants/product-preview.constants";
import { SelectSizeView } from "./select-size-view";
import { SizeGuideView } from "./size-guide-view";

interface IProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type View = "select" | "guide";

const VIEW_TRANSITION_MS = 300;

export function ProductCardCartDrawer({ open, onOpenChange }: IProps) {
  const [view, setView] = useState<View>("select");
  const [selectedSize, setSelectedSize] = useState(RECOMMENDED_SIZE);

  const handleOpenChange = (next: boolean) => {
    onOpenChange(next);
    if (!next) {
      setTimeout(() => setView("select"), VIEW_TRANSITION_MS);
    }
  };

  const closeDrawer = () => onOpenChange(false);

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerContent className="pb-6 z-100">
        <div className="flex items-center justify-between gap-2 px-5 pt-2">
          <div className="flex items-center gap-2">
            {view === "guide" && (
              <button
                type="button"
                aria-label="Back"
                onClick={() => setView("select")}
                className="grid size-7 cursor-pointer place-items-center duration-200 animate-in fade-in slide-in-from-left-2"
              >
                <AltArrowLeft className="size-6" weight="Outline" />
              </button>
            )}
            <DrawerTitle className="text-lg font-bold">
              Select a size
            </DrawerTitle>
          </div>
          <DrawerClose asChild>
            <button
              type="button"
              aria-label="Close"
              className="grid size-7 cursor-pointer place-items-center rounded-full bg-secondary text-foreground"
            >
              <XIcon className="size-4" />
            </button>
          </DrawerClose>
        </div>

        <div className="overflow-hidden">
          <div
            className={cn(
              "flex w-[200%] ease-out",
              "transition-transform duration-300",
              view === "select" ? "translate-x-0" : "-translate-x-1/2",
            )}
          >
            <div className="w-1/2 shrink-0 px-5">
              <SelectSizeView
                selectedSize={selectedSize}
                onSizeChange={setSelectedSize}
                onShowGuide={() => setView("guide")}
              />
            </div>
            <div className="w-1/2 shrink-0 px-5">
              <SizeGuideView />
            </div>
          </div>
        </div>

        <div className="mt-6 px-5">
          <Button
            className="h-12 w-full rounded-sm text-base font-semibold"
            onClick={closeDrawer}
          >
            Add cart
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
