"use client";

import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
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
import { AddCardCvvInput } from "@/features/profile/pages/payments/pages/add/components/add-card/add-card-cvv-input";
import { detectCardKind } from "@/features/profile/pages/payments/pages/add/components/add-card/detect-card-kind";
import { SecurityCodeStep } from "./security-code-step";

interface IProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dict: IDictionary;
  onSubmit: () => void;
}

export function CardAddDialog({ open, onOpenChange, dict, onSubmit }: IProps) {
  const tForm = dict.profile.payments.addCardPage;
  const tCode = dict.profile.payments.securityCode;

  const [step, setStep] = useState<"form" | "code">("form");

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [codeError, setCodeError] = useState(false);

  useEffect(() => {
    if (!open) {
      setStep("form");
      setCardNumber("");
      setExpiry("");
      setCvv("");
      setCodeError(false);
    }
  }, [open]);

  const detectedKind = useMemo(() => detectCardKind(cardNumber), [cardNumber]);

  const cardDigits = cardNumber.replace(/\D/g, "");
  const expiryDigits = expiry.replace(/\D/g, "");
  const cvvDigits = cvv.replace(/\D/g, "");

  const isValid =
    cardDigits.length === 16 &&
    expiryDigits.length === 4 &&
    cvvDigits.length === 3;

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValid) return;
    setStep("code");
  };

  const handleCodeContinue = (code: string) => {
    if (code === "00000") {
      setCodeError(true);
      toast.error(tCode.invalid);
      return;
    }
    onSubmit();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-[30px] p-8">
        <div className="flex items-center justify-between">
          <DialogTitle className="text-2xl">
            {step === "form" ? tForm.title : tCode.title}
          </DialogTitle>
          <DialogClose
            aria-label="Close"
            className="grid size-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <X className="size-6" />
          </DialogClose>
        </div>

        {step === "form" ? (
          <form
            onSubmit={handleFormSubmit}
            className="mt-5 flex flex-col gap-5"
          >
            <AddCardField label={tForm.cardNumber}>
              <AddCardNumberInput
                value={cardNumber}
                onChange={setCardNumber}
                placeholder={tForm.cardNumberPlaceholder}
                detectedKind={detectedKind}
              />
            </AddCardField>

            <div className="grid grid-cols-2 gap-3">
              <AddCardField label={tForm.expiryDate}>
                <AddCardExpiryInput
                  value={expiry}
                  onChange={setExpiry}
                  placeholder={tForm.expiryDatePlaceholder}
                />
              </AddCardField>
              <AddCardField label={tForm.cvv}>
                <AddCardCvvInput
                  value={cvv}
                  onChange={setCvv}
                  placeholder={tForm.cvvPlaceholder}
                />
              </AddCardField>
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={!isValid}
              className="mt-2 h-12.5 w-full rounded-sm text-base font-semibold disabled:bg-secondary disabled:text-muted-foreground disabled:opacity-100"
            >
              {tForm.submit}
            </Button>
          </form>
        ) : (
          <div className="mt-5">
            <SecurityCodeStep
              description={tCode.description}
              continueLabel={tCode.continue}
              resendLabel={tCode.resend}
              hasError={codeError}
              onCodeChange={() => setCodeError(false)}
              onContinue={handleCodeContinue}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
