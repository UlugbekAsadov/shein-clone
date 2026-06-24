"use client";

import { useRouter } from "next/navigation";
import { AltArrowLeft, TrashBinMinimalistic } from "@solar-icons/react";

interface IProps {
  title: string;
  clearing: boolean;
  onClear: () => void;
}

export function CartMobileHeader({ title, clearing, onClear }: IProps) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-3 bg-background px-4 py-3">
      <button
        type="button"
        onClick={() => router.back()}
        aria-label="Go back"
        className="grid size-11 cursor-pointer place-items-center rounded-full bg-secondary"
      >
        <AltArrowLeft className="size-6" weight="Outline" />
      </button>

      <h1 className="text-xl font-bold">{title}</h1>

      <button
        type="button"
        onClick={onClear}
        disabled={clearing}
        aria-label="Clear cart"
        className="grid size-11 cursor-pointer place-items-center rounded-full bg-[#E837371F] text-[#E83737] disabled:opacity-50"
      >
        <TrashBinMinimalistic className="size-6" weight="Outline" />
      </button>
    </header>
  );
}
