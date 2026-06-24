"use client";

import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import type { IAdultDict } from "@/types/adult.interface";
import { AdultConfirmDialog } from "@/shared/components/product/adult-confirm/adult-confirm-dialog";

interface IProps {
  dict: IAdultDict;
  onConfirm: () => void;
}

export function AdultConfirmBanner({ dict, onConfirm }: IProps) {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setOpen(false);
  };

  return (
    <div className="mb-4 flex items-center gap-3 rounded-[12px] bg-[#E8373733] py-2.5 px-4 text-foreground">
      <span className="text-xl font-bold">{dict.badge}</span>
      <p className="flex-1 text-sm font-medium">{dict.bannerText}</p>
      <Button
        size="lg"
        className="rounded-[8px] bg-[#E83737] px-5 h-10 text-white hover:bg-[#E83737]/90 font-semibold"
        onClick={() => setOpen(true)}
      >
        {dict.confirm}
      </Button>
      <AdultConfirmDialog
        open={open}
        dict={dict}
        onOpenChange={setOpen}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
