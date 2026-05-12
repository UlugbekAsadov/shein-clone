"use client";

import Link from "next/link";
import { MapPin, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import type { IAddress } from "@/features/profile/interfaces/address.interface";
import { Button } from "@/shared/components/ui/button";

interface IProps {
  address: IAddress;
  selected: boolean;
  editHref: string;
  onSelect: (id: string) => void;
}

export function AddressCard({ address, selected, editHref, onSelect }: IProps) {
  return (
    <div className="flex items-center gap-4 py-4">
      <button
        type="button"
        role="radio"
        aria-checked={selected}
        onClick={() => onSelect(address.id)}
        className={cn(
          "relative grid size-5 shrink-0 place-items-center rounded-full border-2 transition-colors",
          selected ? "border-foreground" : "border-muted-foreground/40",
        )}
      >
        {selected && (
          <span className="size-2.5 rounded-full bg-foreground" aria-hidden />
        )}
      </button>

      <div className="grid size-[58px] shrink-0 place-items-center rounded-lg bg-muted">
        <MapPin className="size-6 text-foreground" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xl font-bold">{address.title}</p>
        <p className="mt-0.5 text-sm text-muted-foreground">
          {address.details}
        </p>
      </div>

      <Button size="icon" variant="outline" className="size-10 rounded-sm border-border">
        <Link href={editHref} aria-label="Edit address" className="">
          <Pencil className="size-4" />
        </Link>
      </Button>
    </div>
  );
}
