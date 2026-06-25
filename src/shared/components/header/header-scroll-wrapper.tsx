"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface IProps {
  isSticky: boolean;
  children: React.ReactNode;
}

export function HeaderScrollWrapper({ isSticky, children }: IProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      suppressHydrationWarning
      className={cn(
        "top-0 z-40 hidden bg-primary md:block pt-5 space-y-4",
        isScrolled && "header-shadow",
        isSticky && "sticky",
      )}
    >
      {children}
    </header>
  );
}
