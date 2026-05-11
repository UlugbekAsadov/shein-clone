import { ChevronRight, LucideIcon } from "lucide-react";

interface IProps {
  title: string;
  icon?: LucideIcon;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export function ProductInfoAccordion({
  title,
  icon: Icon,
  defaultOpen = false,
  children,
}: IProps) {
  return (
    <details open={defaultOpen} className="group bg-card  border-b last:border-b-0">
      <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3.5 text-sm font-semibold">
        <span className="flex items-center gap-2">
          {Icon && <Icon className="size-5 text-foreground" />}
          {title}
        </span>
        <ChevronRight className="size-4 text-muted-foreground transition-transform group-open:-rotate-90" />
      </summary>
      <div className="px-4 pb-4 text-sm text-muted-foreground">{children}</div>
    </details>
  );
}
