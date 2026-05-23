"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { AltArrowRight, Star } from "@solar-icons/react/ssr";
import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import type { IAddress } from "@/features/profile/interfaces/address.interface";
import { Button } from "@/shared/components/ui/button";
import { AddressTypeIcon } from "@/features/profile/components/addresses-mobile/address-type-icon";
import {
  deleteAddressAction,
  setDefaultAddressAction,
} from "@/features/profile/services/address.actions";

interface IProps {
  address: IAddress;
  dict: IDictionary;
  lang: (typeof locales)[number];
}

export function AddressDesktopRow({ address, dict, lang }: IProps) {
  const t = dict.profile.addresses;
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const goToEdit = () => {
    router.push(`/${lang}/profile/addresses/${address.id}/edit`);
  };

  const handleSetDefault = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (address.is_default) return;
    startTransition(async () => {
      const result = await setDefaultAddressAction(address.id);
      if (result.ok) router.refresh();
    });
  };

  const handleDelete = (event: React.MouseEvent) => {
    event.stopPropagation();
    startTransition(async () => {
      const result = await deleteAddressAction(address.id);
      if (result.ok) router.refresh();
    });
  };

  return (
    <div className="flex w-full items-center gap-3">
      <button
        type="button"
        onClick={goToEdit}
        className="flex flex-1 items-center gap-3 text-left transition-colors cursor-pointer"
      >
        <span className="grid size-14.5 shrink-0 place-items-center rounded-md bg-secondary text-foreground">
          <AddressTypeIcon type={address.type} className="size-6" />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate text-base font-bold text-foreground">
              {address.name}
            </p>
            {address.is_default ? (
              <span className="rounded-full bg-foreground px-2 py-0.5 text-[10px] font-semibold uppercase text-background">
                {t.default}
              </span>
            ) : null}
          </div>
          <p className="truncate text-sm text-muted-foreground">
            {address.address}
          </p>
        </div>
      </button>

      {address.is_default ? null : (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={t.setDefault}
          title={t.setDefault}
          disabled={isPending}
          onClick={handleSetDefault}
          className="size-10 rounded-sm"
        >
          <Star className="size-5" />
        </Button>
      )}

      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label={t.delete}
        title={t.delete}
        disabled={isPending}
        onClick={handleDelete}
        className="size-10 rounded-sm text-destructive hover:text-destructive"
      >
        <Trash2 className="size-5" />
      </Button>

      <button
        type="button"
        onClick={goToEdit}
        aria-label={t.editTitle}
        className="grid size-10 place-items-center rounded-sm text-foreground"
      >
        <AltArrowRight className="size-6" />
      </button>
    </div>
  );
}
