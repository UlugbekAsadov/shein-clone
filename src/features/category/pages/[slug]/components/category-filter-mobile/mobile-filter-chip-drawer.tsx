"use client";

import { useState } from "react";
import { XIcon } from "@/shared/components/icons/outline";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/components/ui/drawer";
import { Button } from "@/shared/components/ui/button";
import { ListingFilterChipTrigger } from "@/shared/components/listing/listing-mobile-header/listing-filter-chip-trigger";

interface IProps<TValue> {
  label: string;
  title: string;
  applyLabel: string;
  count: number;
  appliedValue: TValue;
  emptyValue: TValue;
  onApply: (value: TValue) => void;
  children: (
    value: TValue,
    setValue: (value: TValue) => void,
  ) => React.ReactNode;
}

export function MobileFilterChipDrawer<TValue>({
  label,
  title,
  applyLabel,
  count,
  appliedValue,
  emptyValue,
  onApply,
  children,
}: IProps<TValue>) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState<TValue>(appliedValue);

  const handleOpenChange = (next: boolean) => {
    if (next) setPending(appliedValue);
    setOpen(next);
  };

  const handleApply = () => {
    onApply(pending);
    setOpen(false);
  };

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerTrigger asChild>
        <ListingFilterChipTrigger
          label={count > 0 ? `${label} · ${count}` : label}
          applied={count > 0}
          onClear={() => onApply(emptyValue)}
        />
      </DrawerTrigger>
      <DrawerContent className="z-100 max-h-[80vh]">
        <DrawerHeader className="sticky top-0 z-10 flex shrink-0 items-center justify-between border-b bg-popover px-4 py-3">
          <DrawerTitle className="text-lg font-bold text-foreground">
            {title}
          </DrawerTitle>
          <DrawerClose
            aria-label="Close filter"
            className="grid size-8 place-items-center rounded-full bg-secondary text-foreground"
          >
            <XIcon className="size-4" />
          </DrawerClose>
        </DrawerHeader>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-2">
          {children(pending, setPending)}
        </div>

        <div className="sticky bottom-0 z-10 shrink-0 border-t bg-popover p-4">
          <Button
            type="button"
            size="lg"
            onClick={handleApply}
            className="h-13 w-full rounded-[14px] text-base font-bold"
          >
            {applyLabel}
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
