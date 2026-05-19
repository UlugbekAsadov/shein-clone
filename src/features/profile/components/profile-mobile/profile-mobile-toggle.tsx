import { cn } from "@/lib/utils";

interface IProps {
  active?: boolean;
}

export function ProfileMobileToggle({ active = false }: IProps) {
  return (
    <span
      role="switch"
      aria-checked={active}
      className={cn(
        "relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors",
        active ? "bg-foreground" : "bg-muted",
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 inline-block size-6 rounded-full bg-background shadow-sm transition-transform",
          active ? "translate-x-[22px]" : "translate-x-0.5",
        )}
      />
    </span>
  );
}
