"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import type { IAddress } from "@/features/profile/pages/addresses/utils/address.interface";
import { AddressesMobileHeader } from "./addresses-mobile-header";
import { AddressMobileRow } from "./address-mobile-row";
import { AddressesMobileEmpty } from "./addresses-mobile-empty";
import { AddressesMobileAddButton } from "./addresses-mobile-add-button";
import { AddressTypeDrawer } from "./address-type-drawer";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
  initialAddresses: IAddress[];
}

export function AddressesMobilePage({
  lang,
  dict,
  initialAddresses,
}: IProps) {
  const t = dict.profile.addresses;
  const router = useRouter();
  const [addresses] = useState<IAddress[]>(initialAddresses);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isEmpty = addresses.length === 0;

  const handleAddClick = () => setDrawerOpen(true);

  const handleConfirmType = (type: "home" | "work" | "other") => {
    router.push(`/${lang}/profile/addresses/new?type=${type}`);
  };

  return (
    <div className="flex min-h-screen flex-col md:hidden">
      <AddressesMobileHeader
        title={t.title}
        fallbackHref={`/${lang}/profile`}
      />

      {isEmpty ? (
        <AddressesMobileEmpty
          title={t.empty.title}
          description={t.empty.description}
        />
      ) : (
        <div className="flex flex-1 flex-col gap-3 px-4 pt-2 pb-32">
          {addresses.map((address) => (
            <AddressMobileRow
              key={address.id}
              address={address}
              onClick={() =>
                router.push(`/${lang}/profile/addresses/${address.id}/edit`)
              }
            />
          ))}
        </div>
      )}

      <AddressesMobileAddButton
        label={t.addAddress}
        onClick={handleAddClick}
      />

      <AddressTypeDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        title={t.selectAddress.title}
        confirmLabel={t.selectAddress.confirm}
        typeLabels={t.types}
        onConfirm={handleConfirmType}
      />
    </div>
  );
}
