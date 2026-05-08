import Image from "next/image";
import { Heart, Star } from "lucide-react";
import type { Product } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

type Props = {
  product: Product;
  variant?: "default" | "dark";
};

export function ProductCard({ product, variant = "default" }: Props) {
  const isDark = variant === "dark";

  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl border transition-shadow hover:shadow-md",
        isDark
          ? "border-white/10 bg-white text-foreground"
          : "border-border bg-card text-card-foreground",
      )}
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 1440px) 25vw, 360px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute left-2 top-2 rounded-md bg-foreground/85 px-2 py-0.5 text-[11px] font-semibold uppercase text-background">
            {product.badge}
          </span>
        )}
        <button
          type="button"
          aria-label="Add to wishlist"
          className="absolute right-2 top-2 grid size-8 place-items-center rounded-full bg-background/90 text-foreground hover:bg-background"
        >
          <Heart className="size-4" />
        </button>
      </div>

      <div className="flex flex-col gap-1.5 p-3">
        <h3 className="text-sm font-semibold">{product.title}</h3>
        <p className="line-clamp-1 text-xs text-muted-foreground">
          {product.subtitle}
        </p>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-base font-bold">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
          {product.saveLabel && (
            <span className="ml-auto rounded bg-rose-100 px-1.5 py-0.5 text-[10px] font-semibold text-rose-700">
              {product.saveLabel}
            </span>
          )}
        </div>
        <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="size-3.5 fill-amber-400 text-amber-400" />
          <span>{product.rating}</span>
          <span>·</span>
          <span>{product.reviews}k sold</span>
        </div>
      </div>
    </article>
  );
}
