"use client";

import { useEffect } from "react";
import { Login } from "@solar-icons/react/ssr";
import { Button } from "@/shared/components/ui/button";
import { useAuthDialog } from "@/features/auth/hooks/use-auth-dialog";

interface IProps {
  title: string;
  description: string;
  loginButton: string;
}

export function ProfileLoginPrompt({
  title,
  description,
  loginButton,
}: IProps) {
  const { open } = useAuthDialog();

  useEffect(() => {
    if (window.matchMedia("(min-width: 768px)").matches) {
      open();
    }
  }, [open]);

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border bg-muted/30 px-6 py-12 text-center">
      <span className="grid size-16 place-items-center rounded-full bg-background text-muted-foreground shadow-sm">
        <Login className="size-7" weight="Outline" />
      </span>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="max-w-md text-sm text-muted-foreground">{description}</p>
      <Button size="lg" onClick={open} className="mt-2 px-8">
        {loginButton}
      </Button>
    </div>
  );
}
