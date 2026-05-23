import { cn } from "@/lib/utils";

interface IProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

export function OrdersMobileTabItem({ label, active, onClick }: IProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex-1 rounded-sm py-2.5 text-sm font-semibold transition-colors",
        active
          ? "bg-background text-foreground shadow-sm"
          : "bg-transparent text-muted-foreground",
      )}
    >
      {label}
    </button>
  );
}
