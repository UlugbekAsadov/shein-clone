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
import { AddressTypeIcon } from "./address-type-icon";
import { useDictionary } from "@/core/config/i18n/use-dictionary";

interface IProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  confirmLabel: string;
  typeLabels: { home: string; work: string; other: string };
  onConfirm: (icon_type: "home" | "work" | "other") => void;
}

const TYPES: Array<"home" | "work" | "other"> = ["home", "work", "other"];

export function AddressTypeDrawer({
  open,
  onOpenChange,
  title,
  confirmLabel,
  typeLabels,
  onConfirm,
}: IProps) {
  const dict = useDictionary();
  const [selected, setSelected] = useState<"home" | "work" | "other">("other");

  useEffect(() => {
    if (open) setSelected("other");
  }, [open]);

  const handleConfirm = () => {
    onConfirm(selected);
    onOpenChange(false);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="z-100">
        <div className="flex items-center justify-between px-4 pt-3 pb-3">
          <DrawerTitle className="text-lg font-bold text-foreground">
            {title}
          </DrawerTitle>
          <DrawerClose
            aria-label={dict.common.close}
            className="grid size-8 place-items-center rounded-full bg-secondary text-muted-foreground"
          >
            <XIcon className="size-5" />
          </DrawerClose>
        </div>

        <div className="border-t border-border" />

        <div className="flex flex-col px-4 py-2">
          {TYPES.map((icon_type) => {
            const isSelected = selected === icon_type;
            return (
              <button
                key={icon_type}
                type="button"
                onClick={() => setSelected(icon_type)}
                className="flex items-center gap-3 py-3"
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-[8px] bg-secondary ">
                  <AddressTypeIcon icon_type={icon_type} className="size-5" />
                </span>
                <span className="flex-1 text-left text-base font-bold text-foreground">
                  {typeLabels[icon_type]}
                </span>
                <span
                  className={
                    isSelected
                      ? "grid size-6 place-items-center rounded-full bg-foreground"
                      : "grid size-6 place-items-center rounded-full border-2 border-border bg-background"
                  }
                >
                  {isSelected && (
                    <span className="size-2 rounded-full bg-background" />
                  )}
                </span>
              </button>
            );
          })}
        </div>

        <div className="px-4 pb-[max(env(safe-area-inset-bottom),1rem)] pt-2">
          <Button
            type="button"
            size="lg"
            onClick={handleConfirm}
            className="h-12.5 w-full rounded-sm text-lg font-semibold"
          >
            {confirmLabel}
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
