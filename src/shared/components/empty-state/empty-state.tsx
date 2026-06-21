import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface IProps {
  media: ReactNode;
  title: string;
  description: string;
  size?: "sm" | "lg";
  className?: string;
}

export function EmptyState({
  media,
  title,
  description,
  size = "lg",
  className,
}: IProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center px-6 text-center",
        className,
      )}
    >
      {media}
      <h2
        className={cn(
          "text-foreground",
          size === "lg"
            ? "mt-3 text-lg font-bold"
            : "mt-2.5 text-sm font-semibold",
        )}
      >
        {title}
      </h2>
      <p
        className={cn(
          "mt-2 text-muted-foreground",
          size === "lg" ? "max-w-xs text-sm" : "max-w-66.75 text-xs",
        )}
      >
        {description}
      </p>
    </div>
  );
}
