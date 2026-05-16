"use client";

import { Fragment } from "react";
import { cn } from "@/lib/utils";
import { sizes, sizeGuide } from "@/shared/mocks/product-preview.mocks";

export function SizeGuideView() {
  return (
    <div className="mt-4">
      <div className="flex">
        <div className="flex w-28 shrink-0 flex-col">
          {sizeGuide.map((row, rowIdx) => (
            <div
              key={row.label}
              className={cn(
                "flex h-14 items-center text-sm text-muted-foreground",
                rowIdx > 0 && "border-t",
              )}
            >
              {row.label}
            </div>
          ))}
        </div>

        <div className="flex-1 overflow-x-auto scrollbar-hidden">
          <div
            className="relative grid scrollbar-hidden"
            style={{
              gridTemplateColumns: `repeat(${sizes.length}, minmax(4rem, 1fr))`,
            }}
          >
            {sizeGuide.map((row, rowIdx) => (
              <Fragment key={row.label}>
                {sizes.map((size) => (
                  <div
                    key={size.id}
                    className={cn(
                      "flex h-14 items-center justify-center text-sm font-semibold",
                      rowIdx > 0 && "border-t",
                    )}
                  >
                    {row.values[size.id]}
                  </div>
                ))}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
