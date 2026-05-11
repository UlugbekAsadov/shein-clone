import Image from "next/image";
import { Star, Sparkles, BadgeCheck, Package, Award } from "lucide-react";
import type { IShop } from "@/types/shop.interface";
import { featuredShops } from "@/shared/mocks";
import { cn } from "@/lib/utils";
import { SectionHeader } from "./section-header";

interface IProps {
  title: string;
  subtitle: string;
  viewAllLabel: string;
  followLabel: string;
  followingLabel: string;
  shops?: IShop[];
}

export function FeaturedShops({
  title,
  subtitle,
  viewAllLabel,
  followLabel,
  followingLabel,
  shops = featuredShops,
}: IProps) {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-6">
      <SectionHeader
        title={
          <span className="flex items-center gap-2">
            {title}
            <Sparkles className="size-5 text-amber-500" />
          </span>
        }
        subtitle={subtitle}
        viewAllHref="#"
        viewAllLabel={viewAllLabel}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {shops.map((shop) => (
          <article
            key={shop.id}
            className="rounded-lg border border-border bg-card p-3"
          >
            <div className="relative">
              <div className="relative aspect-16/8 overflow-hidden rounded-lg bg-muted">
                <Image
                  src={shop.banner}
                  alt={shop.name}
                  fill
                  quality={95}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
                  className="object-cover"
                />
                {shop.tag && (
                  <span
                    className={cn(
                      "absolute right-2 top-2 rounded-full px-2.5 py-1 text-xs font-semibold text-white shadow-sm",
                      shop.tag.variant === "shipping"
                        ? "bg-emerald-500"
                        : "bg-rose-500",
                    )}
                  >
                    {shop.tag.label}
                  </span>
                )}
              </div>
              <div className="absolute -bottom-5 left-3 size-12 overflow-hidden rounded-full border-2 border-card bg-background">
                <Image
                  src={shop.avatar}
                  alt={shop.name}
                  width={48}
                  height={48}
                  className="size-full object-cover"
                />
              </div>
            </div>

            <div className="mt-7 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="flex items-center gap-1 text-base font-bold">
                  <span className="truncate">{shop.name}</span>
                  {shop.verified && (
                    <BadgeCheck className="size-5 shrink-0 fill-sky-500 text-white" />
                  )}
                </h3>
                <p className="text-sm text-muted-foreground">{shop.category}</p>
              </div>
              <button
                type="button"
                className={cn(
                  "shrink-0 rounded-full px-5 py-2 text-sm font-semibold transition",
                  shop.isFollowing
                    ? "border border-foreground bg-card text-foreground hover:bg-muted"
                    : "bg-foreground text-background hover:bg-foreground/90",
                )}
              >
                {shop.isFollowing ? followingLabel : followLabel}
              </button>
            </div>

            <div className="mt-3 flex items-center gap-1.5 text-sm">
              <Star className="size-5 fill-amber-400 text-amber-400" />
              <span className="font-semibold">{shop.rating.toFixed(1)}</span>
              <span className="text-muted-foreground">({shop.reviews})</span>
            </div>

            <div className="mt-3 flex items-center gap-5 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Package className="size-5" />
                {shop.itemsSoldCount}
              </span>
              <span className="flex items-center gap-1.5">
                <Award className="size-5" />
                {shop.yearsSelling}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
