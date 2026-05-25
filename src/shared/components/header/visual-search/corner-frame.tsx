import { cn } from "@/lib/utils";

interface IProps {
  color: "white" | "cyan";
}

export function CornerFrame({ color }: IProps) {
  const borderClass =
    color === "cyan" ? "border-cyan-400" : "border-white drop-shadow-md";
  const base = "pointer-events-none absolute size-7 border-0";

  return (
    <>
      <span
        aria-hidden
        className={cn(
          base,
          borderClass,
          "left-0 top-0 border-l-3 border-t-3 rounded-tl-lg",
        )}
      />
      <span
        aria-hidden
        className={cn(
          base,
          borderClass,
          "right-0 top-0 border-r-3 border-t-3 rounded-tr-lg",
        )}
      />
      <span
        aria-hidden
        className={cn(
          base,
          borderClass,
          "left-0 bottom-0 border-l-3 border-b-3 rounded-bl-lg",
        )}
      />
      <span
        aria-hidden
        className={cn(
          base,
          borderClass,
          "right-0 bottom-0 border-r-3 border-b-3 rounded-br-lg",
        )}
      />
    </>
  );
}
