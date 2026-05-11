import { cn } from "@/lib/utils";

interface IProps {
  label: string;
  active?: boolean;
  badge?: number;
  onClick: () => void;
}

export function ShopTabItem({ label, active, badge, onClick }: IProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative flex cursor-pointer items-center gap-1.5 pb-3 text-sm font-semibold transition-colors",
        active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
      )}
    >
      {label}
      {badge !== undefined && badge > 0 && (
        <span className="grid size-5 place-items-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
          {badge}
        </span>
      )}
      {active && (
        <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-foreground" />
      )}
    </button>
  );
}
