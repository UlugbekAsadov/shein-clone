"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Heart,
  Minus,
  Plus,
  Star,
  X,
} from "lucide-react";
import type { Product } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const TRANSITION_MS = 250;

const GALLERY_POOL = [
  "/mocks/images/products/image%2027.png",
  "/mocks/images/products/image%2027-1.png",
  "/mocks/images/products/image%2027-2.png",
  "/mocks/images/products/image%2027-3.png",
  "/mocks/images/products/image%2027-4.png",
];

const COLOR_SWATCHES = [
  { id: "white", name: "White", image: GALLERY_POOL[0] },
  { id: "navy", name: "Navy", image: GALLERY_POOL[1] },
  { id: "black", name: "Black", image: GALLERY_POOL[2] },
  { id: "gray", name: "Gray", image: GALLERY_POOL[3] },
  { id: "dark-navy", name: "Dark Navy", image: GALLERY_POOL[4] },
  { id: "white-pink", name: "White Pink", image: GALLERY_POOL[0] },
  { id: "dark-khaki", name: "Dark Khaki", image: GALLERY_POOL[1] },
  { id: "beige", name: "Beige", image: GALLERY_POOL[2] },
  { id: "tan", name: "Tan", image: GALLERY_POOL[3] },
  { id: "stone", name: "Stone", image: GALLERY_POOL[4] },
];

const SIZES = [
  { id: "XS", available: true },
  { id: "S", available: true },
  { id: "M", available: true },
  { id: "L", available: true },
  { id: "2XL", available: false },
  { id: "3XL", available: true },
];

const RECOMMENDED_SIZE = "M";

const DESCRIPTION =
  "Women's Casual Pullover Sweatshirt With minimalist Orange Sports Car & Letter Print, Versatile For Daily";

type Props = {
  product: Product;
  open: boolean;
  onClose: () => void;
};

export function ProductPreviewDialog({ product, open, onClose }: Props) {
  const [mounted, setMounted] = useState(false);
  const [closing, setClosing] = useState(false);

  const [imageIndex, setImageIndex] = useState(0);
  const [colorId, setColorId] = useState(COLOR_SWATCHES[0].id);
  const [sizeId, setSizeId] = useState("XS");
  const [qty, setQty] = useState(1);
  const [zooming, setZooming] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });

  useEffect(() => {
    if (open) {
      setMounted(true);
      setClosing(false);
      return;
    }
    if (!mounted) return;
    setClosing(true);
    const t = setTimeout(() => {
      setMounted(false);
      setClosing(false);
    }, TRANSITION_MS);

    return () => clearTimeout(t);
  }, [open, mounted]);

  useEffect(() => {
    if (!mounted) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [mounted, onClose]);

  useEffect(() => {
    if (!mounted) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mounted]);

  if (!mounted) return null;

  const galleryImages = GALLERY_POOL;
  const soldCount = product.reviews * 5 + 123;

  const goPrevImage = () =>
    setImageIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length);
  const goNextImage = () =>
    setImageIndex((i) => (i + 1) % galleryImages.length);

  return (
    <div
      onClick={onClose}
      className={cn(
        "fixed inset-0 z-70 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm",
        closing ? "dialog-overlay-exit" : "dialog-overlay-enter",
      )}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "relative max-h-[90vh] w-full max-w-[1200px] overflow-hidden rounded-3xl bg-background shadow-2xl",
          closing ? "dialog-content-exit" : "dialog-content-enter",
        )}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 z-20 grid size-9 cursor-pointer place-items-center rounded-full text-foreground hover:bg-muted"
        >
          <X className="size-5" />
        </button>

        <div className="grid max-h-[90vh] grid-cols-1 gap-8 overflow-y-auto p-6 md:grid-cols-[1fr_1fr] md:p-8">
          <div className="flex gap-3">
            <div className="flex w-20 flex-col gap-2">
              {galleryImages.map((src, i) => (
                <button
                  type="button"
                  key={src}
                  onClick={() => setImageIndex(i)}
                  className={cn(
                    "relative aspect-square cursor-pointer overflow-hidden rounded-xl ring-2 transition",
                    i === imageIndex
                      ? "ring-foreground"
                      : "ring-transparent hover:ring-muted-foreground/40",
                  )}
                  aria-label={`Gallery image ${i + 1}`}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    quality={90}
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            <div
              className="group relative aspect-4/5 flex-1 cursor-zoom-in overflow-hidden rounded-2xl bg-muted"
              onMouseEnter={() => setZooming(true)}
              onMouseLeave={() => setZooming(false)}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                setZoomOrigin({ x, y });
              }}
            >
              <div
                className="absolute inset-y-0 left-0 flex h-full"
                style={{
                  width: `${galleryImages.length * 100}%`,
                  transform: `translate3d(-${(imageIndex * 100) / galleryImages.length}%, 0, 0)`,
                  transition: "transform 500ms cubic-bezier(0.32, 0.72, 0, 1)",
                }}
              >
                {galleryImages.map((src, i) => (
                  <div
                    key={src}
                    className="relative h-full shrink-0 overflow-hidden"
                    style={{ width: `${100 / galleryImages.length}%` }}
                  >
                    <Image
                      src={src}
                      alt={product.title}
                      fill
                      quality={95}
                      sizes="(min-width: 768px) 40vw, 90vw"
                      priority={i === 0}
                      className="object-cover transition-transform duration-300 ease-out will-change-transform"
                      style={{
                        transform: zooming ? "scale(1.8)" : "scale(1)",
                        transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`,
                      }}
                    />
                  </div>
                ))}
              </div>

              <button
                type="button"
                aria-label="Add to wishlist"
                className="absolute right-4 top-4 z-10 grid size-10 cursor-pointer place-items-center rounded-full bg-white/90 text-foreground shadow-sm transition hover:bg-white"
              >
                <Heart className="size-5" />
              </button>

              <button
                type="button"
                onMouseLeave={() => setZooming(true)}
                onMouseEnter={() => setZooming(false)}
                onClick={goPrevImage}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 z-10 grid size-9 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white/80 text-foreground shadow-sm transition hover:bg-white"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                onMouseLeave={() => setZooming(true)}
                onMouseEnter={() => setZooming(false)}
                onClick={goNextImage}
                aria-label="Next image"
                className="absolute right-3 top-1/2 z-10 grid size-9 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white/80 text-foreground shadow-sm transition hover:bg-white"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-5 pr-2">
            <div>
              <h2 className="text-3xl font-bold leading-tight">
                {product.title}
              </h2>
              <div className="mt-3 flex items-center gap-3 text-sm">
                <div className="flex items-center gap-1">
                  {[0, 1, 2, 3].map((i) => (
                    <Star
                      key={i}
                      className="size-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                  <Star className="size-4 fill-amber-400/40 text-amber-400" />
                  <span className="ml-1 font-medium">
                    {product.rating.toFixed(1)}
                  </span>
                </div>
                <span className="text-muted-foreground">|</span>
                <span className="text-muted-foreground">
                  {product.reviews} reviews
                </span>
                <span className="text-muted-foreground">|</span>
                <span className="text-muted-foreground">{soldCount} sold</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                {DESCRIPTION}
              </p>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold">
                {product.price.toFixed(1)}$
              </span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  {product.originalPrice.toFixed(1)}$
                </span>
              )}
              {product.saveLabel && (
                <span className="rounded-md bg-emerald-100 px-2.5 py-1 text-sm font-semibold text-emerald-700">
                  {product.saveLabel}
                </span>
              )}
            </div>

            <div>
              <div className="mb-2 text-sm">
                <span className="font-semibold">Color:</span>{" "}
                <span className="text-muted-foreground">
                  {COLOR_SWATCHES.find((c) => c.id === colorId)?.name}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {COLOR_SWATCHES.map((c) => (
                  <button
                    type="button"
                    key={c.id}
                    onClick={() => setColorId(c.id)}
                    aria-label={c.name}
                    className={cn(
                      "relative size-14 cursor-pointer overflow-hidden rounded-xl ring-2 transition",
                      colorId === c.id
                        ? "ring-foreground"
                        : "ring-transparent hover:ring-muted-foreground/40",
                    )}
                  >
                    <Image
                      src={c.image}
                      alt={c.name}
                      fill
                      quality={80}
                      sizes="56px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-2 text-sm font-semibold">Size:</div>
              <div className="flex flex-wrap gap-2">
                {SIZES.map((s) => {
                  const selected = s.id === sizeId;
                  const recommended = s.id === RECOMMENDED_SIZE;
                  return (
                    <button
                      type="button"
                      key={s.id}
                      disabled={!s.available}
                      onClick={() => setSizeId(s.id)}
                      className={cn(
                        "relative h-11 min-w-14 cursor-pointer rounded-full px-5 text-sm font-semibold transition",
                        selected
                          ? "bg-foreground text-background"
                          : "border border-border bg-background text-foreground hover:bg-muted",
                        !s.available &&
                          "cursor-not-allowed text-muted-foreground line-through opacity-50 hover:bg-background",
                      )}
                    >
                      {s.id}
                      {selected && recommended && (
                        <span className="absolute -bottom-1 -right-1 grid size-4 place-items-center rounded-full bg-emerald-500 ring-2 ring-background">
                          <BadgeCheck className="size-3 text-white" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
              <div className="mt-3 flex items-center gap-2 text-sm">
                <BadgeCheck className="size-4 fill-emerald-500 text-white" />
                <span className="text-muted-foreground">
                  Recommended for you:
                </span>
                <span className="font-semibold">{RECOMMENDED_SIZE}</span>
              </div>
            </div>

            <div>
              <div className="mb-2 text-sm font-semibold">Qty:</div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="grid size-11 cursor-pointer place-items-center rounded-full border border-border bg-background text-foreground transition hover:bg-muted"
                >
                  <Minus className="size-4" />
                </button>
                <div className="grid h-11 min-w-14 place-items-center px-3 text-base font-semibold">
                  {qty}
                </div>
                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="grid size-11 cursor-pointer place-items-center rounded-full border border-border bg-background text-foreground transition hover:bg-muted"
                >
                  <Plus className="size-4" />
                </button>
              </div>
            </div>

            <div className="mt-2 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 cursor-pointer rounded-full bg-foreground py-4 text-base font-semibold text-background transition hover:bg-foreground/90"
              >
                Add to cart
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 cursor-pointer rounded-full border border-foreground bg-background py-4 text-base font-semibold text-foreground transition hover:bg-muted"
              >
                Buy now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
