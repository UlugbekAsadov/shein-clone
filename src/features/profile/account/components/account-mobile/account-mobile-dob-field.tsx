"use client";

import { PenNewSquare } from "@solar-icons/react/ssr";

interface IProps {
  label: string;
  displayValue: string;
  onClick: () => void;
}

export function AccountMobileDobField({
  label,
  displayValue,
  onClick,
}: IProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <button
        type="button"
        onClick={onClick}
        className="flex h-12.5 w-full items-center justify-between rounded-sm bg-secondary px-4 text-left text-base font-medium text-foreground"
      >
        <span>{displayValue}</span>
        <PenNewSquare className="size-5 text-muted-foreground" />
      </button>
    </div>
  );
}
