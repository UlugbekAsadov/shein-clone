"use client";

import { useMemo, useState } from "react";
import { X } from "lucide-react";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { AddCardField } from "@/features/profile/components/cards-mobile/add-card/add-card-field";
import { AddCardNumberInput } from "@/features/profile/components/cards-mobile/add-card/add-card-number-input";
import { AddCardExpiryInput } from "@/features/profile/components/cards-mobile/add-card/add-card-expiry-input";
import { AddCardCvvInput } from "@/features/profile/components/cards-mobile/add-card/add-card-cvv-input";
import { detectCardKind } from "@/features/profile/components/cards-mobile/add-card/detect-card-kind";

interface IProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dict: IDictionary;
  onSubmit: () => void;
}

export function CardAddDialog({ open, onOpenChange, dict, onSubmit }: IProps) {
  const t = dict.profile.payments.addCardPage;

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const detectedKind = useMemo(() => detectCardKind(cardNumber), [cardNumber]);

  const cardDigits = cardNumber.replace(/\D/g, "");
  const expiryDigits = expiry.replace(/\D/g, "");
  const cvvDigits = cvv.replace(/\D/g, "");

  const isValid =
    cardDigits.length === 16 &&
    expiryDigits.length === 4 &&
    cvvDigits.length === 3;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValid) return;
    onSubmit();
    setCardNumber("");
    setExpiry("");
    setCvv("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-[30px] p-8">
        <div className="flex items-center justify-between">
          <DialogTitle className="text-2xl">{t.title}</DialogTitle>
          <DialogClose
            aria-label="Close"
            className="grid size-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <X className="size-6" />
          </DialogClose>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-5">
          <AddCardField label={t.cardNumber}>
            <AddCardNumberInput
              value={cardNumber}
              onChange={setCardNumber}
              placeholder={t.cardNumberPlaceholder}
              detectedKind={detectedKind}
            />
          </AddCardField>

          <div className="grid grid-cols-2 gap-3">
            <AddCardField label={t.expiryDate}>
              <AddCardExpiryInput
                value={expiry}
                onChange={setExpiry}
                placeholder={t.expiryDatePlaceholder}
              />
            </AddCardField>
            <AddCardField label={t.cvv}>
              <AddCardCvvInput
                value={cvv}
                onChange={setCvv}
                placeholder={t.cvvPlaceholder}
              />
            </AddCardField>
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={!isValid}
            className="mt-2 h-12.5 w-full rounded-sm text-base font-semibold disabled:bg-secondary disabled:text-muted-foreground disabled:opacity-100"
          >
            {t.submit}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
