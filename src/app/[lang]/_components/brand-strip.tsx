import Image from "next/image";
import { brands } from "@/lib/mock-data";

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
              className="grid size-20 place-items-center rounded-full p-[3px]"
              style={{
                background: `conic-gradient(from 180deg at 50% 50%, ${b.ringColor ?? "#a855f7"}, #ec4899, ${b.ringColor ?? "#a855f7"})`,
              }}
            >
              <span
                className="grid size-full place-items-center overflow-hidden rounded-full bg-background"
                style={{ backgroundColor: b.ringColor ?? "#0f172a" }}
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
