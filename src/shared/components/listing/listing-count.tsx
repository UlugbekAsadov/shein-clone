import { Box } from "@solar-icons/react";
import { cn } from "@/lib/utils";

interface IProps {
  label: string;
  count?: number;
  isLoading?: boolean;
  categoryName?: string;
}

export function ListingCount({
  label,
  count,
  isLoading,
  categoryName,
}: IProps) {
  return (
    <div className="flex flex-col gap-1">
      {categoryName && (
        <h1 className="text-[28px] font-bold leading-tight text-foreground">
          {categoryName}
        </h1>
      )}
      <p className="flex items-center gap-1 text-sm text-secondary-foreground">
        <Box weight="Bold" className="size-4.5" />
        <span className="text-muted-foreground">{label}:</span>{" "}
        <span
          className={cn(
            "font-semibold text-foreground",
            isLoading && "opacity-50",
          )}
        >
          {count ?? 0}
        </span>
      </p>
    </div>
  );
}
