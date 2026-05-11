import type { LucideIcon } from "lucide-react";

interface IProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function ProfilePlaceholder({ icon: Icon, title, description }: IProps) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-muted/30 px-6 py-12 text-center">
      <span className="grid size-16 place-items-center rounded-full bg-background text-muted-foreground shadow-sm">
        <Icon className="size-7" />
      </span>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="max-w-md text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
