"use client";

import Link from "next/link";
import { AltArrowRight } from "@solar-icons/react/ssr";
import { ProductGrid } from "@/shared/components/product/product-grid";
import { useDictionary } from "@/core/config/i18n/use-dictionary";
import type { IProduct } from "@/types/product.interface";
import type { ISimilarProductAutoFilter } from "@/features/products/pages/[slug]/utils/similar-product.interface";
import type { locales } from "@/core/config/i18n/i18n-config";

interface IProps {
  products: IProduct[];
  countLabel: string;
  lang: (typeof locales)[number];
  autoFilter: ISimilarProductAutoFilter | null;
}

function buildViewAllHref(
  lang: string,
  autoFilter: ISimilarProductAutoFilter | null,
): string {
  const base = `/${lang}/demo/products`;
  if (!autoFilter) return base;
  const params = new URLSearchParams();
  if (autoFilter.category_ids.length > 0)
    params.set("category_ids", autoFilter.category_ids.join(","));
  if (autoFilter.brand_ids.length > 0)
    params.set("brand_ids", autoFilter.brand_ids.join(","));
  if (autoFilter.season_ids.length > 0)
    params.set("season_ids", autoFilter.season_ids.join(","));
  if (autoFilter.sort_by) params.set("sort_by", autoFilter.sort_by);
  if (autoFilter.sort_direction)
    params.set("sort_direction", autoFilter.sort_direction);
  if (autoFilter.min_price !== null)
    params.set("min_price", String(autoFilter.min_price));
  if (autoFilter.max_price !== null)
    params.set("max_price", String(autoFilter.max_price));
  if (autoFilter.has_discount) params.set("has_discount", "1");
  if (autoFilter.is_original) params.set("is_original", "1");
  return `${base}?${params.toString()}`;
}

export function SimilarProducts({
  products,
  countLabel,
  lang,
  autoFilter,
}: IProps) {
  const dict = useDictionary();
  if (!products.length) return null;

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-xl font-bold">{dict.product.similarProducts}</h2>
          <p className="text-xs text-muted-foreground">{countLabel}</p>
        </div>
        <Link
          href={buildViewAllHref(lang, autoFilter)}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          {dict.common.viewAll}
          <AltArrowRight className="size-4" weight="Outline" />
        </Link>
      </div>

      <ProductGrid products={products} />
    </section>
  );
}
