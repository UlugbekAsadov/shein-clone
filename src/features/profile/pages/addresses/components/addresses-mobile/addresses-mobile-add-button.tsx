"use client";

import { Plus } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

interface IProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export function AddressesMobileAddButton({ label, onClick, disabled }: IProps) {
  return (
    <div className="sticky bottom-0 left-0 right-0 bg-background px-4 pb-[max(env(safe-area-inset-bottom),1rem)] pt-3">
      <Button
        type="button"
        size="lg"
        onClick={onClick}
        disabled={disabled}
        className="h-12.5 w-full rounded-sm text-base font-semibold"
      >
        <span className="text-lg font-medium">{label}</span>
        <Plus className="size-6" />
      </Button>
    </div>
  );
}
