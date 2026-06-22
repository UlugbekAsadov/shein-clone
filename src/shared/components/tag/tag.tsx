import { cn } from "@/lib/utils";

interface IProps {
  label: string;
  variant?: "success" | "destructive";
  size?: "sm" | "base" | "md" | "lg";
  className?: string;
}

const VARIANT_BG: Record<NonNullable<IProps["variant"]>, string> = {
  success: "bg-[#21BE65]",
  destructive: "bg-rose-500",
};

const SIZE_PADDING: Record<NonNullable<IProps["size"]>, string> = {
  sm: "px-1 py-0.5 rounded-[3px]",
  base: "px-1 py-0.5 md:px-1.75 md:py-1.5 rounded-[4px]",
  md: "px-2.5 py-2 rounded-[5px]",
  lg: "px-3 py-2.5 rounded-[6px]",
};

const SIZE_TEXT: Record<NonNullable<IProps["size"]>, string> = {
  sm: "text-[10px]",
  base: "text-[10px] md:text-xs",
  md: "text-sm",
  lg: "text-base",
};

export function Tag({
  label,
  variant = "success",
  size = "base",
  className,
}: IProps) {
  return (
    <span
      className={cn(
        "inline-block -skew-x-14 shadow-sm",
        VARIANT_BG[variant],
        SIZE_PADDING[size],
        className,
      )}
    >
      <span
        className={cn(
          "block skew-x-14 font-bold italic text-white",
          SIZE_TEXT[size],
        )}
      >
        {label}
      </span>
    </span>
  );
}
