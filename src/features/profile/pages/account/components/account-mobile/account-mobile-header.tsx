"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, TrashBinTrash } from "@solar-icons/react";
import { useDictionary } from "@/core/config/i18n/use-dictionary";

interface IProps {
  title: string;
  onDeleteProfile: () => void;
}

export function AccountMobileHeader({ title, onDeleteProfile }: IProps) {
  const router = useRouter();
  const dict = useDictionary();

  return (
    <div className="sticky top-0 z-30 bg-background">
      <div className="flex items-center gap-3 px-4 py-3">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label={dict.common.goBack}
          className="grid size-10 shrink-0 place-items-center rounded-full bg-secondary text-foreground"
        >
          <ArrowLeft className="size-6" />
        </button>

        <h1 className="flex-1 text-center text-lg font-bold text-foreground">
          {title}
        </h1>

        <button
          type="button"
          onClick={onDeleteProfile}
          aria-label={dict.common.delete}
          className="grid size-10 shrink-0 place-items-center rounded-full bg-destructive/10 text-destructive"
        >
          <TrashBinTrash className="size-6" />
        </button>
      </div>
    </div>
  );
}
