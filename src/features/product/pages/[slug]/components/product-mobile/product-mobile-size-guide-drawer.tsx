"use client";

import { Fragment } from "react";
import { AltArrowLeft } from "@solar-icons/react";
import { XIcon } from "@/shared/components/icons/outline";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
} from "@/shared/components/ui/drawer";
import { Button } from "@/shared/components/ui/button";
import { sizeGuide, sizes } from "@/shared/mocks/product-preview.mocks";
import { cn } from "@/lib/utils";

interface IProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedSize: string;
}

export function ProductMobileSizeGuideDrawer({
  open,
  onOpenChange,
  selectedSize,
}: IProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="z-100 max-h-[80vh]">
        <div className="sticky top-0 z-10 flex shrink-0 items-center justify-between border-b bg-popover px-4 py-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              aria-label="Back"
              className="grid size-7 place-items-center"
            >
              <AltArrowLeft className="size-6" />
            </button>
            <DrawerTitle className="text-xs font-bold text-foreground">
              Select a size
            </DrawerTitle>
          </div>
          <DrawerClose
            aria-label="Close"
            className="grid size-8 place-items-center rounded-full bg-secondary text-foreground"
          >
            <XIcon className="size-4" />
          </DrawerClose>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="flex px-4 py-2">
            <div className="flex w-32 shrink-0 flex-col">
              {sizeGuide.map((row, rowIdx) => (
                <div
                  key={row.label}
                  className={cn(
                    "flex h-16 items-center text-sm text-muted-foreground",
                    rowIdx > 0 && "border-t",
                  )}
                >
                  {row.label}
                </div>
              ))}
            </div>

            <div className="flex-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div
                className="relative grid"
                style={{
                  gridTemplateColumns: `repeat(${sizes.length}, minmax(3.5rem, 1fr))`,
                }}
              >
                {sizes.map((size) => {
                  const isSelected = size.id === selectedSize;
                  return (
                    <div
                      key={size.id}
                      className={cn(
                        "relative",
                        isSelected &&
                          "rounded-[16px] outline outline-foreground outline-offset-[-1px]",
                      )}
                    >
                      {sizeGuide.map((row, rowIdx) => (
                        <Fragment key={`${size.id}-${row.label}`}>
                          <div
                            className={cn(
                              "flex h-16 items-center justify-center text-sm font-semibold",
                              rowIdx > 0 && !isSelected && "border-t",
                            )}
                          >
                            {row.values[size.id]}
                          </div>
                        </Fragment>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 z-10 shrink-0 border-t bg-popover p-4">
          <DrawerClose asChild>
            <Button
              type="button"
              size="lg"
              className="h-13 w-full rounded-[14px] text-base font-bold"
            >
              Apply
            </Button>
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
