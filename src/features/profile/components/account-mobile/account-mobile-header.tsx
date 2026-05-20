"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, TrashBinTrash } from "@solar-icons/react";

interface IProps {
  title: string;
  onDeleteProfile: () => void;
}

export function AccountMobileHeader({ title, onDeleteProfile }: IProps) {
  const router = useRouter();

  return (
    <div className="sticky top-0 z-30 bg-background">
      <div className="flex items-center gap-3 px-4 py-3">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Go back"
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
          aria-label="Delete profile"
          className="grid size-10 shrink-0 place-items-center rounded-full bg-destructive/10 text-destructive"
        >
          <TrashBinTrash className="size-6" />
        </button>
      </div>
    </div>
  );
}
