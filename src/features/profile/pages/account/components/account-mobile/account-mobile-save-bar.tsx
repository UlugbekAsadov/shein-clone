"use client";

import { Button } from "@/shared/components/ui/button";

interface IProps {
  label: string;
  disabled: boolean;
  onClick: () => void;
}

export function AccountMobileSaveBar({ label, disabled, onClick }: IProps) {
  return (
    <div className="sticky bottom-0 z-30 mt-auto border-t border-border bg-background px-4 pt-3 pb-[max(env(safe-area-inset-bottom),1rem)]">
      <Button
        type="button"
        size="lg"
        onClick={onClick}
        disabled={disabled}
        className="h-12.5 w-full rounded-sm text-base font-semibold"
      >
        {label}
      </Button>
    </div>
  );
}
