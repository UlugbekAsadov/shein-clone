import { cn } from "@/lib/utils";

interface IProps {
  value: string;
}

export function ProductGroupTimerTile({ value }: IProps) {
  return (
    <div
      className={cn(
        "grid size-7.5 place-items-center rounded-[8px] bg-linear-to-b from-[#FCDADA] from-50% to-white to-50% text-sm font-bold text-red-500 shadow-sm",
        "md:size-10 md:rounded-8px md:text-lg",
      )}
    >
      {value}
    </div>
  );
}
