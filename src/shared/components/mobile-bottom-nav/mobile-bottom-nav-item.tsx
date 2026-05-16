"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import type { ComponentType } from "react";
import type { IconProps } from "@solar-icons/react";
import { cn } from "@/lib/utils";

interface IProps {
  itemKey: string;
  href: string;
  label: string;
  icon: ComponentType<IconProps>;
  active: boolean;
}

const spring = {
  type: "spring" as const,
  stiffness: 360,
  damping: 30,
  mass: 0.8,
};

export function MobileBottomNavItem({
  itemKey,
  href,
  label,
  icon: Icon,
  active,
}: IProps) {
  return (
    <motion.li
      layout
      layoutId={`mbn-item-${itemKey}`}
      transition={spring}
      className="list-none"
    >
      <Link
        href={href}
        aria-label={label}
        aria-current={active ? "page" : undefined}
        className={cn(
          "flex items-center text-background",
          active && "gap-2 pr-3",
        )}
      >
        <motion.span
          layout
          transition={spring}
          className={cn(
            "grid size-11 place-items-center rounded-full transition-colors duration-300",
            active && "bg-background/15",
          )}
        >
          <Icon className="size-5" />
        </motion.span>
        <AnimatePresence initial={false}>
          {active && (
            <motion.span
              key="label"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{
                opacity: { duration: 0.18, ease: "easeOut" },
                width: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
              }}
              className="overflow-hidden whitespace-nowrap text-sm font-medium"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </Link>
    </motion.li>
  );
}
