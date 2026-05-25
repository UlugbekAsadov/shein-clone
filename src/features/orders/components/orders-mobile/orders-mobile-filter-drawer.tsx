"use client";

import type { ReactNode } from "react";
import { XIcon } from "@/shared/components/icons/outline";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/components/ui/drawer";
import { Button } from "@/shared/components/ui/button";
import { OrdersMobileFilterRow } from "./orders-mobile-filter-row";

interface IProps {
  trigger: ReactNode;
  title: string;
  applyLabel: string;
  statusLabels: {
    unpaid: string;
    processing: string;
    shipped: string;
    review: string;
    return: string;
  };
}

export function OrdersMobileFilterDrawer({
  trigger,
  title,
  applyLabel,
  statusLabels,
}: IProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className="z-100 max-h-[80vh]">
        <div className="flex shrink-0 items-center justify-between px-5 pt-4 pb-3">
          <DrawerTitle className="text-xl font-bold text-foreground">
            {title}
          </DrawerTitle>
          <DrawerClose
            aria-label="Close filter"
            className="grid size-8 place-items-center rounded-full bg-secondary text-foreground"
          >
            <XIcon className="size-4" />
          </DrawerClose>
        </div>

        <div className="border-t border-border" />

        <div className="flex flex-col px-5 pt-1 pb-2 [&>label+label]:border-t [&>label+label]:border-border/60">
          <OrdersMobileFilterRow id="filter-unpaid" label={statusLabels.unpaid} />
          <OrdersMobileFilterRow
            id="filter-processing"
            label={statusLabels.processing}
          />
          <OrdersMobileFilterRow
            id="filter-shipped"
            label={statusLabels.shipped}
            defaultChecked
          />
          <OrdersMobileFilterRow
            id="filter-review"
            label={statusLabels.review}
            defaultChecked
          />
          <OrdersMobileFilterRow id="filter-return" label={statusLabels.return} />
        </div>

        <div className="shrink-0 px-5 pb-[max(env(safe-area-inset-bottom),1rem)] pt-2">
          <DrawerClose asChild>
            <Button
              type="button"
              size="lg"
              className="h-14 w-full rounded-2xl text-base font-bold"
            >
              {applyLabel}
            </Button>
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
