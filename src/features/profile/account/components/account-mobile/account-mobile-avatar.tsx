"use client";

import Image from "next/image";
import { useRef } from "react";
import { Camera, Upload } from "@solar-icons/react/ssr";
import { Button } from "@/shared/components/ui/button";

interface IProps {
  avatar: string | null;
  uploadLabel: string;
  deleteLabel: string;
  onUpload: (file: File) => void;
  onDeleteRequest: () => void;
}

export function AccountMobileAvatar({
  avatar,
  uploadLabel,
  deleteLabel,
  onUpload,
  onDeleteRequest,
}: IProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handlePick = () => inputRef.current?.click();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) onUpload(file);
    event.target.value = "";
  };

  return (
    <div className="flex flex-col items-center px-4 pt-2 pb-6">
      <button
        type="button"
        onClick={handlePick}
        aria-label={uploadLabel}
        className="relative grid size-17.5 place-items-center overflow-hidden rounded-full border border-border bg-secondary text-muted-foreground"
      >
        {avatar ? (
          <Image
            src={avatar}
            alt=""
            fill
            sizes="70px"
            className="object-cover"
          />
        ) : (
          <Camera className="size-6 opacity-50" />
        )}
      </button>

      <div className="mt-3 flex items-center gap-2">
        {!avatar && (
          <Button
            type="button"
            onClick={handlePick}
            className="h-7.5 rounded-[8px] px-3 text-sm font-semibold"
          >
            <span>{uploadLabel}</span>
            <Upload className="size-4" />
          </Button>
        )}

        {avatar && (
          <Button
            type="button"
            variant="destructive"
            onClick={onDeleteRequest}
            className="h-7.5 rounded-[8px] px-3 text-sm font-semibold"
          >
            {deleteLabel}
          </Button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}
