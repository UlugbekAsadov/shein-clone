"use client";

import { IMaskInput } from "react-imask";
import type { CardKind } from "@/features/profile/interfaces/card.interface";
import { AddCardBrandIcon } from "./add-card-brand-icon";

interface IProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  detectedKind: CardKind | null;
}

export function AddCardNumberInput({
  value,
  onChange,
  placeholder,
  detectedKind,
}: IProps) {
  return (
    <div className="flex h-14 items-center gap-3 rounded-[12px] bg-secondary px-4">
      <IMaskInput
        mask="0000 0000 0000 0000"
        value={value}
        unmask={false}
        onAccept={(next) => onChange(String(next))}
        placeholder={placeholder}
        inputMode="numeric"
        autoComplete="cc-number"
        className="flex-1 bg-transparent text-base font-medium text-foreground placeholder:text-muted-foreground/70 outline-none"
      />
      <AddCardBrandIcon kind={detectedKind} />
    </div>
  );
}
