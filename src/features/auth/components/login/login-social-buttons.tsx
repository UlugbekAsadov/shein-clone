"use client";

import { toast } from "sonner";
import { Letter } from "@solar-icons/react/ssr";
import { AppleIcon } from "@/shared/components/icons/outline/apple-icon";
import { FacebookIcon } from "@/shared/components/icons/outline/facebook-icon";
import { GoogleIcon } from "@/shared/components/icons/outline/google-icon";

interface IProps {
  labels: {
    google: string;
    apple: string;
    mail: string;
    facebook: string;
    comingSoon: string;
  };
}

export function LoginSocialButtons({ labels }: IProps) {
  const handleClick = () => {
    toast.error(labels.comingSoon);
  };

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={handleClick}
        className="flex h-14 w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-secondary text-base font-semibold text-foreground transition-colors hover:bg-secondary/90"
      >
        <GoogleIcon className="size-6" />
        {labels.google}
      </button>

      <button
        type="button"
        onClick={handleClick}
        className="flex h-14 w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-secondary text-base font-semibold text-foreground transition-colors hover:bg-secondary/90"
      >
        <AppleIcon className="size-6" />
        {labels.apple}
      </button>

      <button
        type="button"
        onClick={handleClick}
        className="flex h-14 w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-secondary text-base font-semibold text-foreground transition-colors hover:bg-secondary/90"
      >
        <Letter className="size-6" weight="Bold" />
        {labels.mail}
      </button>

      <button
        type="button"
        onClick={handleClick}
        className="flex h-14 w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-secondary text-base font-semibold text-foreground transition-colors hover:bg-secondary/90"
      >
        <FacebookIcon className="size-6" />
        {labels.facebook}
      </button>
    </div>
  );
}
