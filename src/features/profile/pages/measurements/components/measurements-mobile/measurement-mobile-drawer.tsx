"use client";

import { useEffect, useState } from "react";
import { XIcon } from "@/shared/components/icons/outline";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
} from "@/shared/components/ui/drawer";
import { Button } from "@/shared/components/ui/button";
import type { IMeasurementOption } from "@/features/profile/pages/measurements/utils/measurement.interface";
import { MeasurementMobileOption } from "./measurement-mobile-option";
import { useDictionary } from "@/core/config/i18n/use-dictionary";

interface IProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  options: IMeasurementOption[];
  selectedValue: string | null;
  onApply: (value: string) => void;
  applyLabel: string;
}

export function MeasurementMobileDrawer({
  open,
  onOpenChange,
  title,
  options,
  selectedValue,
  onApply,
  applyLabel,
}: IProps) {
  const dict = useDictionary();
  const [draftValue, setDraftValue] = useState<string | null>(selectedValue);

  useEffect(() => {
    if (open) {
      setDraftValue(selectedValue);
    }
  }, [open, selectedValue]);

  const handleApply = () => {
    if (draftValue) {
      onApply(draftValue);
    }
    onOpenChange(false);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="z-100 h-[80vh]">
        <div className="flex shrink-0 items-center justify-between px-4 pt-3 pb-3">
          <DrawerTitle className="text-lg font-bold text-foreground">
            {title}
          </DrawerTitle>
          <DrawerClose
            aria-label={dict.common.close}
            className="grid size-8 place-items-center rounded-full text-muted-foreground"
          >
            <XIcon className="size-6" />
          </DrawerClose>
        </div>

        <div className="border-t border-border" />

        <div className="min-h-0 flex-1 overflow-y-auto px-4">
          {options.map((option) => (
            <MeasurementMobileOption
              key={option.value}
              label={option.label}
              selected={draftValue === option.value}
              onSelect={() => setDraftValue(option.value)}
            />
          ))}
        </div>

        <div className="shrink-0 px-4 pb-[max(env(safe-area-inset-bottom),1rem)] pt-2">
          <Button
            type="button"
            size="lg"
            onClick={handleApply}
            className="h-12.5 w-full rounded-sm text-lg font-medium"
          >
            {applyLabel}
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
