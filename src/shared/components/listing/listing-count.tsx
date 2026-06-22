import { Box } from "@solar-icons/react";
import { cn } from "@/lib/utils";

interface IProps {
  label: string;
  count?: number;
  isLoading?: boolean;
}

export function ListingCount({ label, count, isLoading }: IProps) {
  return (
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
  );
}
