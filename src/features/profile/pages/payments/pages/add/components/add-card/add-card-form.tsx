"use client";

import { useMemo, useState, useTransition } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { Button } from "@/shared/components/ui/button";
import { createCardAction } from "@/features/profile/pages/payments/services/card.actions";
import { AddCardField } from "./add-card-field";
import { AddCardNumberInput } from "./add-card-number-input";
import { AddCardExpiryInput } from "./add-card-expiry-input";
import { detectCardKind } from "./detect-card-kind";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
}

export function AddCardForm({ lang, dict }: IProps) {
  const t = dict.profile.payments.addCardPage;
  const router = useRouter();

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [isPending, startTransition] = useTransition();

  const detectedKind = useMemo(() => detectCardKind(cardNumber), [cardNumber]);

  const cardDigits = cardNumber.replace(/\D/g, "");
  const expiryDigits = expiry.replace(/\D/g, "");

  const isValid = cardDigits.length === 16 && expiryDigits.length === 4;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValid || isPending) return;

    startTransition(async () => {
      const result = await createCardAction({
        card_number: cardDigits,
        expire_date: expiryDigits,
      });

      if (!result.ok) {
        toast.error(result.message);
        return;
      }

      router.push(`/${lang}/profile/payments`);
      router.refresh();
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-1 flex-col px-4 pt-2">
      <div className="flex flex-col gap-5">
        <AddCardField label={t.cardNumber}>
          <AddCardNumberInput
            value={cardNumber}
            onChange={setCardNumber}
            placeholder={t.cardNumberPlaceholder}
            detectedKind={detectedKind}
          />
        </AddCardField>

        <AddCardField label={t.expiryDate}>
          <AddCardExpiryInput
            value={expiry}
            onChange={setExpiry}
            placeholder={t.expiryDatePlaceholder}
          />
        </AddCardField>
      </div>

      <div className="mt-auto pt-6 pb-[max(env(safe-area-inset-bottom),1rem)]">
        <Button
          type="submit"
          size="lg"
          disabled={!isValid || isPending}
          className="h-12.5 text-lg w-full rounded-sm font-medium disabled:bg-secondary disabled:text-muted-foreground disabled:opacity-100"
        >
          {t.submit}
        </Button>
      </div>
    </form>
  );
}
