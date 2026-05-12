"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import type { IAddress } from "@/features/profile/interfaces/address.interface";
import { Button } from "@/shared/components/ui/button";
import { AddressCard } from "./address-card";

interface IProps {
  addresses: IAddress[];
  dict: IDictionary;
  lang: (typeof locales)[number];
}

export function AddressesList({ addresses, dict, lang }: IProps) {
  const t = dict.profile.addresses;
  const initial = addresses.find((a) => a.isDefault)?.id ?? addresses[0]?.id;
  const [selectedId, setSelectedId] = useState<string | undefined>(initial);

  return (
    <div>
      <div className="mb-2 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold">{t.title}</h1>
          <p className="mt-0.5 text-xs text-muted-foreground">{t.current}</p>
        </div>
        <Button asChild size="lg" className="rounded-sm px-5">
          <Link href={`/${lang}/profile/addresses/new`} className="text-base!">
            {t.addAddress}
            <Plus className="size-6" />
          </Link>
        </Button>
      </div>

      <ul className="divide-y divide-border" role="radiogroup">
        {addresses.map((address) => (
          <li key={address.id}>
            <AddressCard
              address={address}
              selected={selectedId === address.id}
              onSelect={setSelectedId}
              editHref={`/${lang}/profile/addresses/${address.id}/edit`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
