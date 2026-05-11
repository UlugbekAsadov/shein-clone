import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";
import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { Button } from "@/shared/components/ui/button";
import {
  countryOptions,
  regionOptions,
} from "@/features/profile/mocks/address.mocks";
import { AddressFormField } from "./address-form-field";

interface IProps {
  dict: IDictionary;
  lang: (typeof locales)[number];
}

export function AddressForm({ dict, lang }: IProps) {
  const t = dict.profile.addresses;
  return (
    <div>
      <header className="mb-6 flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href={`/${lang}/profile/addresses`}
            aria-label="Back"
            className="grid size-10 place-items-center rounded-full bg-muted hover:bg-muted/80"
          >
            <ArrowLeft className="size-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold">{t.title}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{t.current}</p>
          </div>
        </div>
        <Button size="lg" className="rounded-xl px-5">
          {t.addAddress}
          <Plus className="size-4" />
        </Button>
      </header>

      <div className="max-w-3xl space-y-4">
        <AddressFormField
          label={t.fields.country}
          placeholder={t.placeholder}
          options={countryOptions}
        />
        <AddressFormField
          label={t.fields.region}
          placeholder={t.placeholder}
          options={regionOptions}
        />
      </div>
    </div>
  );
}
