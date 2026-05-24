"use client";

import { CloseCircle } from "@solar-icons/react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/components/ui/drawer";
import { FilterMobileContent } from "../filter-mobile/filter-mobile-content";

interface IProps {
  trigger: React.ReactNode;
  dict: {
    title: string;
    color: string;
    priceTo: string;
    style: string;
    material: string;
  };
}

export function ListingFilterDrawer({ trigger, dict }: IProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className="z-100 max-h-[92vh]">
        <DrawerHeader className="sticky top-0 z-10 flex shrink-0 items-center justify-between border-b bg-popover px-4 py-3">
          <DrawerTitle className="text-lg font-bold text-foreground">
            {dict.title}
          </DrawerTitle>
          <DrawerClose
            aria-label="Close filter"
            className="grid size-8 place-items-center rounded-full bg-secondary text-foreground"
          >
            <CloseCircle className="size-4" weight="Outline" />
          </DrawerClose>
        </DrawerHeader>
        <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-6">
          <FilterMobileContent dict={dict} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
