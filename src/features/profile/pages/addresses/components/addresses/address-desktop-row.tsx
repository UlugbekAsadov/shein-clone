"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import type { IAddress } from "@/features/profile/pages/addresses/utils/address.interface";
import { Button } from "@/shared/components/ui/button";
import { AddressTypeIcon } from "@/features/profile/pages/addresses/components/addresses-mobile/address-type-icon";
import { setDefaultAddressAction } from "@/features/profile/pages/addresses/services/address.actions";

interface IProps {
  address: IAddress;
  dict: IDictionary;
  lang: (typeof locales)[number];
}

export function AddressDesktopRow({ address, dict, lang }: IProps) {
  const t = dict.profile.addresses;
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSelectDefault = () => {
    if (address.is_default || isPending) return;
    startTransition(async () => {
      const result = await setDefaultAddressAction(address.id);
      if (result.ok) router.refresh();
    });
  };

  const goToEdit = () => {
    router.push(`/${lang}/profile/addresses/${address.id}/edit`);
  };

  return (
    <div className="flex w-full items-center gap-4">
      <button
        type="button"
        role="radio"
        aria-checked={address.is_default}
        aria-label={t.setDefault}
        onClick={handleSelectDefault}
        disabled={isPending}
        className="flex flex-1 items-center gap-4 text-left cursor-pointer disabled:cursor-default"
      >
        <span
          className={cn(
            "relative grid size-5 shrink-0 place-items-center rounded-full border-2 transition-colors",
            address.is_default
              ? "border-foreground"
              : "border-muted-foreground/40",
          )}
        >
          {address.is_default ? (
            <span className="size-2.5 rounded-full bg-foreground" aria-hidden />
          ) : null}
        </span>

        <span className="grid size-14.5 shrink-0 place-items-center rounded-md bg-secondary text-foreground">
          <AddressTypeIcon type={address.type} className="size-6" />
        </span>

        <span className="min-w-0 flex-1">
          <span className="block truncate text-base font-bold text-foreground">
            {address.name}
          </span>
          <span className="block truncate text-sm text-muted-foreground">
            {address.address}
          </span>
        </span>
      </button>

      <Button
        type="button"
        size="icon"
        variant="outline"
        aria-label={t.editTitle}
        onClick={goToEdit}
        className="size-10 rounded-sm border-border"
      >
        <Pencil className="size-4" />
      </Button>
    </div>
  );
}
