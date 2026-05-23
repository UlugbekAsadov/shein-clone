"use client";

import { AddressTypeIcon } from "@/features/profile/components/addresses-mobile/address-type-icon";

interface IProps {
  type: "home" | "work" | "other";
  selected: boolean;
  onClick: () => void;
  ariaLabel: string;
}

export function AddressTypeIconButton({
  type,
  selected,
  onClick,
  ariaLabel,
}: IProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      aria-label={ariaLabel}
      className={
        selected
          ? "grid size-14.5 place-items-center rounded-md border-2 border-foreground bg-background text-foreground cursor-pointer"
          : "grid size-14.5 place-items-center rounded-md border-2 border-transparent bg-secondary text-muted-foreground cursor-pointer transition-colors hover:text-foreground"
      }
    >
      <AddressTypeIcon type={type} className="size-6" />
    </button>
  );
}
