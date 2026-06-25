"use client";

import { useRouter } from "next/navigation";
import { AltArrowLeft } from "@solar-icons/react";
import { useDictionary } from "@/core/config/i18n/use-dictionary";

interface IProps {
  title: string;
  backHref: string;
}

export function CategoryDrillHeader({ title, backHref }: IProps) {
  const router = useRouter();
  const dict = useDictionary();

  return (
    <div className="flex items-center gap-2 px-4 pb-2 md:px-6">
      <button
        type="button"
        onClick={() => router.push(backHref)}
        aria-label={dict.common.back}
        className="grid size-8 place-items-center text-foreground"
      >
        <AltArrowLeft className="size-6" />
      </button>
      <h1 className="text-sm font-bold text-foreground">{title}</h1>
    </div>
  );
}
