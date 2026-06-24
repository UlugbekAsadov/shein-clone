"use client";

import type { IAdultDict } from "@/types/adult.interface";
import { useAdultDialog } from "@/shared/hooks/use-adult-dialog";
import { useAdultConsent } from "@/shared/hooks/use-adult-consent";
import { AdultConfirmDialog } from "./adult-confirm-dialog";

interface IProps {
  dict: IAdultDict;
}

export function AdultGateDialog({ dict }: IProps) {
  const { isOpen, close } = useAdultDialog();
  const { confirmAdult } = useAdultConsent();

  const handleConfirm = () => {
    confirmAdult();
    close();
  };

  return (
    <AdultConfirmDialog
      open={isOpen}
      dict={dict}
      onOpenChange={(next) => {
        if (!next) close();
      }}
      onConfirm={handleConfirm}
    />
  );
}
