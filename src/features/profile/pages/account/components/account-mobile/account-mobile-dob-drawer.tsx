"use client";

import { useEffect, useMemo, useState } from "react";
import { CloseCircle } from "@solar-icons/react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
} from "@/shared/components/ui/drawer";
import { Button } from "@/shared/components/ui/button";
import { WheelPickerColumn } from "./wheel-picker-column";

interface IProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  saveLabel: string;
  value: string;
  months: string[];
  onSave: (value: string) => void;
}

const ITEM_HEIGHT = 44;

const pad = (n: number) => n.toString().padStart(2, "0");

function getDaysInMonth(year: number, monthIndex: number): number {
  return new Date(year, monthIndex + 1, 0).getDate();
}

function parseDate(value: string): { year: number; month: number; day: number } {
  const [y, m, d] = value.split("-").map((part) => Number(part));
  const year = Number.isFinite(y) ? y : 2000;
  const month = Number.isFinite(m) ? m - 1 : 0;
  const day = Number.isFinite(d) ? d : 1;
  return { year, month, day };
}

export function AccountMobileDobDrawer({
  open,
  onOpenChange,
  title,
  saveLabel,
  value,
  months,
  onSave,
}: IProps) {
  const initial = parseDate(value);
  const [year, setYear] = useState(initial.year);
  const [month, setMonth] = useState(initial.month);
  const [day, setDay] = useState(initial.day);

  useEffect(() => {
    if (open) {
      const parsed = parseDate(value);
      setYear(parsed.year);
      setMonth(parsed.month);
      setDay(parsed.day);
    }
  }, [open, value]);

  const currentYear = new Date().getFullYear();
  const years = useMemo(() => {
    const list: { value: string; label: string }[] = [];
    for (let y = currentYear; y >= 1900; y--) {
      list.push({ value: String(y), label: String(y) });
    }
    return list;
  }, [currentYear]);

  const monthItems = useMemo(
    () =>
      months.map((label, index) => ({ value: String(index), label })),
    [months],
  );

  const dayItems = useMemo(() => {
    const total = getDaysInMonth(year, month);
    return Array.from({ length: total }, (_, i) => ({
      value: String(i + 1),
      label: pad(i + 1),
    }));
  }, [year, month]);

  useEffect(() => {
    const max = getDaysInMonth(year, month);
    if (day > max) setDay(max);
  }, [year, month, day]);

  const handleSave = () => {
    const iso = `${year}-${pad(month + 1)}-${pad(day)}`;
    onSave(iso);
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
            aria-label="Close"
            className="grid size-8 place-items-center rounded-full bg-secondary text-muted-foreground"
          >
            <CloseCircle className="size-4" weight="Outline" />
          </DrawerClose>
        </div>

        <div className="border-t border-border" />

        <div className="relative px-4 py-6">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-4 top-1/2 -translate-y-1/2 border-y border-border"
            style={{ height: ITEM_HEIGHT }}
          />
          <div className="flex gap-2">
            <WheelPickerColumn
              items={dayItems}
              value={String(day)}
              onChange={(v) => setDay(Number(v))}
              itemHeight={ITEM_HEIGHT}
            />
            <WheelPickerColumn
              items={monthItems}
              value={String(month)}
              onChange={(v) => setMonth(Number(v))}
              itemHeight={ITEM_HEIGHT}
            />
            <WheelPickerColumn
              items={years}
              value={String(year)}
              onChange={(v) => setYear(Number(v))}
              itemHeight={ITEM_HEIGHT}
            />
          </div>
        </div>

        <div className="px-4 pb-[max(env(safe-area-inset-bottom),1rem)] pt-2">
          <Button
            type="button"
            size="lg"
            onClick={handleSave}
            className="h-12.5 w-full rounded-sm text-base font-semibold"
          >
            {saveLabel}
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
