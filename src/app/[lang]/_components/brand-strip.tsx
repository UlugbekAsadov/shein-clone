import Image from "next/image";
import { brands } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function BrandStrip() {
  return (
    <div className="mx-auto max-w-[1440px] px-6">
      <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-thin">
        {brands.map((b) => (
          <button
            key={b.id}
            type="button"
            className="group flex shrink-0 flex-col items-center gap-2"
          >
            <span
              className={cn(
                "grid size-20 place-items-center rounded-full p-[5px]",
                b.storyViewed
                  ? "bg-muted-foreground/30"
                  : "bg-[conic-gradient(from_180deg_at_50%_50%,#fbbf24,#ec4899,#a855f7,#fbbf24)]",
              )}
            >
              <span
                className="grid size-full place-items-center overflow-hidden rounded-full ring-2 ring-background"
                style={{ backgroundColor: b.brandBg ?? "#0f172a" }}
              >
                <Image
                  src={b.image}
                  alt={b.name}
                  width={80}
                  height={80}
                  className="size-full rounded-full object-cover"
                />
              </span>
            </span>
            <span className="text-xs font-medium text-foreground">
              {b.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
