"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { XIcon } from "@/shared/components/icons/outline";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import type { ICard } from "@/features/profile/pages/payments/utils/card.interface";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { AddCardField } from "@/features/profile/pages/payments/pages/add/components/add-card/add-card-field";
import { AddCardNumberInput } from "@/features/profile/pages/payments/pages/add/components/add-card/add-card-number-input";
import { AddCardExpiryInput } from "@/features/profile/pages/payments/pages/add/components/add-card/add-card-expiry-input";
import { detectCardKind } from "@/features/profile/pages/payments/pages/add/components/add-card/detect-card-kind";
import { createCardAction } from "@/features/profile/pages/payments/services/card.actions";

interface IProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dict: IDictionary;
  onAdd: (card: ICard) => void;
}

export function CardAddDialog({ open, onOpenChange, dict, onAdd }: IProps) {
  const tForm = dict.profile.payments.addCardPage;
  const router = useRouter();

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!open) {
      setCardNumber("");
      setExpiry("");
    }
  }, [open]);

  const detectedKind = useMemo(() => detectCardKind(cardNumber), [cardNumber]);

  const cardDigits = cardNumber.replace(/\D/g, "");
  const expiryDigits = expiry.replace(/\D/g, "");

  const isValid = cardDigits.length === 16 && expiryDigits.length === 4;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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

      if (result.data) {
        onAdd(result.data);
      } else {
        router.refresh();
      }

      onOpenChange(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-[30px] p-8">
        <div className="flex items-center justify-between">
          <DialogTitle className="text-2xl">{tForm.title}</DialogTitle>
          <DialogClose
            aria-label={dict.common.close}
            className="grid size-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <XIcon className="size-6" />
          </DialogClose>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-5">
          <AddCardField label={tForm.cardNumber}>
            <AddCardNumberInput
              value={cardNumber}
              onChange={setCardNumber}
              placeholder={tForm.cardNumberPlaceholder}
              detectedKind={detectedKind}
            />
          </AddCardField>

          <AddCardField label={tForm.expiryDate}>
            <AddCardExpiryInput
              value={expiry}
              onChange={setExpiry}
              placeholder={tForm.expiryDatePlaceholder}
            />
          </AddCardField>

          <Button
            type="submit"
            size="lg"
            disabled={!isValid || isPending}
            className="mt-2 h-12.5 w-full rounded-sm text-base font-semibold disabled:bg-secondary disabled:text-muted-foreground disabled:opacity-100"
          >
            {tForm.submit}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
