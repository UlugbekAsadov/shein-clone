"use client";

import { MapPointWave } from "@solar-icons/react/ssr";

interface IProps {
  label: string;
  onClick: () => void;
}

export function NewAddressMobileMapButton({ label, onClick }: IProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-12.5 w-full items-center justify-center gap-2 rounded-sm border border-foreground bg-background text-lg font-medium text-foreground active:bg-secondary"
    >
      <span>{label}</span>
      <MapPointWave className="size-6" />
    </button>
  );
}
