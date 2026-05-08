import Image from "next/image";
import { shopByCategory } from "@/lib/mock-data";
import { SectionHeader } from "./section-header";

type Props = {
  title: string;
  viewAllLabel: string;
};

export function ShopByCategory({ title, viewAllLabel }: Props) {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-8">
      <SectionHeader
        title={title}
        viewAllHref="#"
        viewAllLabel={viewAllLabel}
      />
      <div className="grid grid-cols-10 gap-4">
        {shopByCategory.map((c) => (
          <button
            key={c.id}
            type="button"
            className="flex flex-col items-center gap-2"
          >
            <span className="relative grid aspect-square w-full place-items-center overflow-hidden rounded-full bg-muted">
              <Image
                src={c.image ?? "/placeholders/category.svg"}
                alt={c.name}
                width={140}
                height={140}
                className="size-full object-cover"
              />
              {c.badge && (
                <span className="absolute right-1 top-1 grid h-6 min-w-10 place-items-center rounded-full bg-rose-500 px-2 text-[11px] font-semibold text-white">
                  {c.badge}
                </span>
              )}
            </span>
            <span className="text-sm font-medium text-foreground">
              {c.name}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
