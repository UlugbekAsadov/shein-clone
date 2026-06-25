"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Tuning2 } from "@solar-icons/react";
import { useDictionary } from "@/core/config/i18n/use-dictionary";

interface IProps {
  title: string;
}

export function ShopMobileHeader({ title }: IProps) {
  const router = useRouter();
  const dict = useDictionary();

  return (
    <div className="sticky top-0 z-30 bg-background">
      <div className="flex items-center gap-3 px-4 py-3">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label={dict.common.goBack}
          className="grid size-9 shrink-0 place-items-center rounded-full bg-secondary text-foreground"
        >
          <ArrowLeft className="size-6" />
        </button>

        <h1 className="flex-1 truncate text-base font-bold text-foreground">
          {title}
        </h1>

        <button
          type="button"
          aria-label={dict.common.filter}
          className="grid size-9 shrink-0 place-items-center rounded-full bg-secondary text-foreground"
        >
          <Tuning2 className="size-6 rotate-90" />
        </button>
      </div>
    </div>
  );
}
