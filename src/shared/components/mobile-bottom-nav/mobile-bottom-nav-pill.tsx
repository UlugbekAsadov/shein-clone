"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import type { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  className?: string;
  animateInitial?: boolean;
}

const spring = {
  type: "spring" as const,
  stiffness: 360,
  damping: 30,
  mass: 0.8,
};

export function MobileBottomNavPill({
  children,
  className,
  animateInitial = true,
}: IProps) {
  return (
    <motion.ul
      layout
      initial={animateInitial ? { opacity: 0, scale: 0.5 } : false}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={spring}
      className={cn("flex items-center gap-1 rounded-full bg-foreground p-1.5 shadow-lg shadow-black/10", className)}
    >
      {children}
    </motion.ul>
  );
}
