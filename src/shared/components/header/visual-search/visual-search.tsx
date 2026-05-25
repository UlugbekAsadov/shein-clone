"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Camera } from "@solar-icons/react";
import type { locales } from "@/core/config/i18n/i18n-config";
import { cn } from "@/lib/utils";
import { VisualSearchUploadPopover } from "./visual-search-upload-popover";
import { VisualSearchCropDialog } from "./visual-search-crop-dialog";
import { VisualSearchAnalyzingDialog } from "./visual-search-analyzing-dialog";

export interface IVisualSearchDict {
  tooltip: string;
  title: string;
  upload: string;
  formats: string;
  cropTitle: string;
  findProduct: string;
  analyzing: string;
}

interface IProps {
  lang: (typeof locales)[number];
  dict: IVisualSearchDict;
  variant?: "desktop" | "mobile";
}

export function VisualSearch({ lang, dict, variant = "desktop" }: IProps) {
  const router = useRouter();
  const [step, setStep] = useState<
    "idle" | "upload" | "crop" | "analyzing"
  >("idle");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const anchorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  const clearImage = () => {
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
      setImageUrl(null);
    }
  };

  const reset = () => {
    setStep("idle");
    clearImage();
  };

  const handleFile = (file: File) => {
    clearImage();
    setImageUrl(URL.createObjectURL(file));
    setStep("crop");
  };

  const handleFindProduct = () => {
    setStep("analyzing");
    window.setTimeout(() => {
      reset();
      router.push(`/${lang}/search?q=visual-search`);
    }, 1800);
  };

  return (
    <div ref={anchorRef} className="relative">
      <button
        type="button"
        aria-label={dict.tooltip}
        onClick={(e) => {
          e.stopPropagation();
          setStep(step === "upload" ? "idle" : "upload");
        }}
        className={cn(
          "group/cam relative rounded-full text-muted-foreground hover:bg-muted cursor-pointer",
          variant === "desktop"
            ? "p-2"
            : "grid size-8 place-items-center hover:bg-transparent",
        )}
      >
        <Camera className="size-6" />
        {step === "idle" && (
          <span className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2.5 py-1.5 text-xs font-medium text-background opacity-0 shadow-md transition-opacity duration-150 group-hover/cam:opacity-100">
            {dict.tooltip}
          </span>
        )}
      </button>

      {step === "upload" && (
        <VisualSearchUploadPopover
          anchorRef={anchorRef}
          dict={dict}
          onClose={reset}
          onSelectFile={handleFile}
        />
      )}

      <VisualSearchCropDialog
        open={step === "crop"}
        imageUrl={imageUrl}
        title={dict.cropTitle}
        findLabel={dict.findProduct}
        onClose={reset}
        onConfirm={handleFindProduct}
      />

      <VisualSearchAnalyzingDialog
        open={step === "analyzing"}
        imageUrl={imageUrl}
        title={dict.analyzing}
        onClose={reset}
      />
    </div>
  );
}
