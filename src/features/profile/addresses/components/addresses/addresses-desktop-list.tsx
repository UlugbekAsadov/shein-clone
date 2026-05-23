import Link from "next/link";
import { Plus } from "lucide-react";
import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import type { IAddress } from "@/features/profile/interfaces/address.interface";
import { Button } from "@/shared/components/ui/button";
import { AddressDesktopRow } from "./address-desktop-row";
import { AddressesDesktopEmpty } from "./addresses-desktop-empty";

interface IProps {
  addresses: IAddress[];
  dict: IDictionary;
  lang: (typeof locales)[number];
}

export function AddressesDesktopList({ addresses, dict, lang }: IProps) {
  const t = dict.profile.addresses;
  const isEmpty = addresses.length === 0;

  return (
    <div>
      <div className="mb-6 flex items-start justify-between gap-4">
        <h1 className="text-xl font-bold">{t.title}</h1>
        <Button asChild size="lg" className="rounded-sm px-5">
          <Link href={`/${lang}/profile/addresses/new`} className="text-base!">
            {t.addAddress}
            <Plus className="size-5" />
          </Link>
        </Button>
      </div>

      {isEmpty ? (
        <AddressesDesktopEmpty
          title={t.empty.title}
          description={t.empty.description}
        />
      ) : (
        <ul className="flex flex-col gap-5">
          {addresses.map((address) => (
            <li key={address.id}>
              <AddressDesktopRow
                address={address}
                dict={dict}
                lang={lang}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
