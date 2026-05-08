import Image from "next/image";
import { discountTiles } from "@/lib/mock-data";

type Props = {
  discountLabel: string;
};

export function DiscountBanners({ discountLabel }: Props) {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {discountTiles.map((tile) => (
          <article
            key={tile.id}
            className="relative flex h-32 items-center justify-between overflow-hidden rounded-xl px-6 text-white"
            style={{ background: tile.background }}
          >
            <div className="flex flex-col">
              <div className="mb-2 flex items-center gap-2">
                <Image
                  src="/placeholders/avatar.svg"
                  alt={tile.shopName}
                  width={32}
                  height={32}
                  className="size-8 rounded-full ring-2 ring-white/60"
                />
                <span className="text-xs font-semibold">{tile.shopName}</span>
              </div>
              <span className="text-sm font-medium opacity-90">
                {discountLabel}
              </span>
              <span className="text-4xl font-black leading-none">
                {tile.percent}%
              </span>
            </div>
            <div className="relative aspect-square h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-white/10">
              <Image
                src={tile.image}
                alt={tile.shopName}
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
