"use client";

import Image from "next/image";
import { useRef } from "react";
import { Camera, Upload, TrashBinTrash } from "@solar-icons/react/ssr";
import { Button } from "@/shared/components/ui/button";

interface IProps {
  avatar: string | null;
  uploadLabel: string;
  deleteLabel: string;
  isUploading: boolean;
  onUpload: (file: File) => void;
  onDelete: () => void;
}

export function AccountAvatar({
  avatar,
  uploadLabel,
  deleteLabel,
  isUploading,
  onUpload,
  onDelete,
}: IProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handlePick = () => inputRef.current?.click();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) onUpload(file);
    event.target.value = "";
  };

  return (
    <div className="flex flex-col items-start gap-3">
      <button
        type="button"
        onClick={handlePick}
        aria-label={uploadLabel}
        className="relative grid size-20 place-items-center overflow-hidden rounded-full border border-border bg-secondary text-muted-foreground"
      >
        {avatar ? (
          <Image src={avatar} alt="" fill sizes="80px" className="object-cover" />
        ) : (
          <Camera className="size-6 opacity-50" />
        )}
      </button>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          onClick={handlePick}
          disabled={isUploading}
          className="h-9 rounded-sm px-3 text-sm font-semibold"
        >
          <span>{uploadLabel}</span>
          <Upload className="size-4" />
        </Button>

        {avatar && (
          <Button
            type="button"
            variant="destructive"
            onClick={onDelete}
            disabled={isUploading}
            className="h-9 rounded-sm px-3 text-sm font-semibold"
          >
            <span>{deleteLabel}</span>
            <TrashBinTrash className="size-4" />
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
