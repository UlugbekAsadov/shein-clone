import { cn } from "@/lib/utils";

interface IProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function FeatureItem({ icon, title, description }: IProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 p-3! rounded-md bg-secondary feature-item",
        "md:bg-background",
      )}
    >
      <span
        className={cn(
          "grid size-8 place-items-center rounded-[8px] bg-white text-foreground",
          "md:size-16 md:bg-muted md:rounded-sm",
        )}
      >
        {icon}
      </span>
      <div>
        <h4 className="text-sm font-semibold">{title}</h4>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
