"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Plus, Star, Trash2 } from "lucide-react";
import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import type { IAddress } from "@/features/profile/pages/addresses/utils/address.interface";
import { Button } from "@/shared/components/ui/button";
import { AddressesMobileHeader } from "@/features/profile/pages/addresses/components/addresses-mobile/addresses-mobile-header";
import {
  createAddressAction,
  deleteAddressAction,
  setDefaultAddressAction,
  updateAddressAction,
} from "@/features/profile/pages/addresses/services/address.actions";
import { NewAddressMobileInput } from "./new-address-mobile-input";
import { NewAddressMobileMapButton } from "./new-address-mobile-map-button";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
  initialAddress?: IAddress;
}

function parseNumber(value: string | null): number | null {
  if (!value) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

export function NewAddressMobilePage({
  lang,
  dict,
  initialAddress,
}: IProps) {
  const t = dict.profile.addresses;
  const router = useRouter();
  const params = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const type = (initialAddress?.type ?? params.get("type") ?? "other") as
    | "home"
    | "work"
    | "other";
  const typeLabel = t.types[type];

  const [name, setName] = useState(
    initialAddress?.name ?? params.get("name") ?? "",
  );
  const [address, setAddress] = useState(
    initialAddress?.address ?? params.get("address") ?? "",
  );
  const [lat, setLat] = useState<number | null>(
    initialAddress?.lat ?? parseNumber(params.get("lat")),
  );
  const [long, setLong] = useState<number | null>(
    initialAddress?.long ?? parseNumber(params.get("long")),
  );

  useEffect(() => {
    if (!name && !initialAddress) setName(typeLabel);
  }, [typeLabel, name, initialAddress]);

  useEffect(() => {
    const incomingAddress = params.get("address");
    if (incomingAddress) setAddress(incomingAddress);
    const incomingName = params.get("name");
    if (incomingName) setName(incomingName);
    const incomingLat = parseNumber(params.get("lat"));
    if (incomingLat !== null) setLat(incomingLat);
    const incomingLong = parseNumber(params.get("long"));
    if (incomingLong !== null) setLong(incomingLong);
  }, [params]);

  const handleOpenMap = () => {
    const search = new URLSearchParams();
    search.set("type", type);
    if (name) search.set("name", name);
    if (address) search.set("address", address);
    if (lat !== null) search.set("lat", String(lat));
    if (long !== null) search.set("long", String(long));
    if (initialAddress) search.set("id", String(initialAddress.id));
    const target = initialAddress
      ? `/${lang}/profile/addresses/${initialAddress.id}/edit/map`
      : `/${lang}/profile/addresses/new/map`;
    router.push(`${target}?${search.toString()}`);
  };

  const canSubmit =
    name.trim() !== "" &&
    address.trim() !== "" &&
    lat !== null &&
    long !== null &&
    !isPending;

  const handleSubmit = () => {
    if (!canSubmit || lat === null || long === null) return;
    setErrorMessage(null);
    const payload = { type, name, address, lat, long };
    startTransition(async () => {
      const result = initialAddress
        ? await updateAddressAction(initialAddress.id, payload)
        : await createAddressAction(payload);
      if (!result.ok) {
        setErrorMessage(result.message ?? "Failed to save address");
        return;
      }
      router.push(`/${lang}/profile/addresses`);
      router.refresh();
    });
  };

  const handleDelete = () => {
    if (!initialAddress) return;
    setErrorMessage(null);
    startTransition(async () => {
      const result = await deleteAddressAction(initialAddress.id);
      if (!result.ok) {
        setErrorMessage(result.message ?? "Failed to delete address");
        return;
      }
      router.push(`/${lang}/profile/addresses`);
      router.refresh();
    });
  };

  const handleSetDefault = () => {
    if (!initialAddress || initialAddress.is_default) return;
    setErrorMessage(null);
    startTransition(async () => {
      const result = await setDefaultAddressAction(initialAddress.id);
      if (!result.ok) {
        setErrorMessage(result.message ?? "Failed to set default address");
        return;
      }
      router.refresh();
    });
  };

  return (
    <div className="flex min-h-screen flex-col md:hidden">
      <AddressesMobileHeader
        title={initialAddress ? t.editTitle : t.form.title}
        fallbackHref={`/${lang}/profile/addresses`}
      />

      <div className="flex flex-1 flex-col gap-5 px-4 pt-2 pb-32">
        <NewAddressMobileInput
          label={t.form.addressName}
          value={name}
          onChange={setName}
          placeholder={t.form.addressNamePlaceholder}
        />
        <NewAddressMobileInput
          label={t.form.address}
          value={address}
          onChange={setAddress}
          placeholder={t.form.addressPlaceholder}
        />
        <NewAddressMobileMapButton
          label={t.form.selectOnMap}
          onClick={handleOpenMap}
        />
        {errorMessage ? (
          <p className="text-sm text-destructive">{errorMessage}</p>
        ) : null}
      </div>

      <div className="sticky bottom-0 left-0 right-0 bg-background px-4 pb-[max(env(safe-area-inset-bottom),1rem)] pt-3">
        {initialAddress && !initialAddress.is_default ? (
          <Button
            type="button"
            size="lg"
            variant="outline"
            onClick={handleSetDefault}
            disabled={isPending}
            className="mb-2 h-12.5 w-full rounded-sm text-base font-semibold"
          >
            <Star className="size-5" />
            <span>{t.setDefault}</span>
          </Button>
        ) : null}
        {initialAddress ? (
          <Button
            type="button"
            size="lg"
            variant="outline"
            onClick={handleDelete}
            disabled={isPending}
            className="mb-2 h-12.5 w-full rounded-sm text-base font-semibold"
          >
            <Trash2 className="size-5" />
            <span>{t.delete}</span>
          </Button>
        ) : null}
        <Button
          type="button"
          size="lg"
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="h-12.5 w-full rounded-sm text-lg font-semibold disabled:bg-[#ECECF2] disabled:text-[#A8A8AE]"
        >
          <span>{initialAddress ? t.updateSubmit : t.form.submit}</span>
          {initialAddress ? null : <Plus className="size-6" />}
        </Button>
      </div>
    </div>
  );
}
