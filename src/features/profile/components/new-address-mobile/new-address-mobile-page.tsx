"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Plus } from "lucide-react";
import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { Button } from "@/shared/components/ui/button";
import { AddressesMobileHeader } from "@/features/profile/components/addresses-mobile/addresses-mobile-header";
import { NewAddressMobileInput } from "./new-address-mobile-input";
import { NewAddressMobileMapButton } from "./new-address-mobile-map-button";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
}

export function NewAddressMobilePage({ lang, dict }: IProps) {
  const t = dict.profile.addresses;
  const router = useRouter();
  const params = useSearchParams();

  const type = (params.get("type") ?? "other") as "home" | "work" | "other";
  const typeLabel = t.types[type];

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (!name) setName(typeLabel);
  }, [typeLabel, name]);

  useEffect(() => {
    const incoming = params.get("address");
    if (incoming) setAddress(incoming);
  }, [params]);

  const handleOpenMap = () => {
    const search = new URLSearchParams();
    search.set("type", type);
    if (name) search.set("name", name);
    if (address) search.set("address", address);
    router.push(`/${lang}/profile/addresses/new/map?${search.toString()}`);
  };

  const canSubmit = name.trim() !== "" && address.trim() !== "";

  const handleSubmit = () => {
    if (!canSubmit) return;
    router.push(`/${lang}/profile/addresses`);
  };

  return (
    <div className="flex min-h-screen flex-col md:hidden">
      <AddressesMobileHeader
        title={t.form.title}
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
      </div>

      <div className="sticky bottom-0 left-0 right-0 bg-background px-4 pb-[max(env(safe-area-inset-bottom),1rem)] pt-3">
        <Button
          type="button"
          size="lg"
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="h-12.5 w-full rounded-sm text-lg font-semibold disabled:bg-[#ECECF2] disabled:text-[#A8A8AE]"
        >
          <span>{t.form.submit}</span>
          <Plus className="size-6" />
        </Button>
      </div>
    </div>
  );
}
