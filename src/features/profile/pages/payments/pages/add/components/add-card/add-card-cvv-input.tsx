"use client";

import { IMaskInput } from "react-imask";

interface IProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export function AddCardCvvInput({ value, onChange, placeholder }: IProps) {
  return (
    <div className="flex h-14 items-center rounded-sm bg-secondary px-4">
      <IMaskInput
        mask="000"
        value={value}
        unmask={false}
        onAccept={(next) => onChange(String(next))}
        placeholder={placeholder}
        inputMode="numeric"
        autoComplete="cc-csc"
        type="password"
        className="w-full bg-transparent text-base font-medium text-foreground placeholder:text-muted-foreground/70 outline-none"
      />
    </div>
  );
}
