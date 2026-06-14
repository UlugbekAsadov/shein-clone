"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ListingShell } from "@/shared/components/listing/listing-shell";
import { categoryApi } from "@/features/category/api/category.api";
import type { IProduct } from "@/types/product.interface";
import type {
  IApiCategorySectionMeta,
  IApiCategorySectionProduct,
} from "@/features/category/pages/[slug]/utils/category-section.interface";

interface IListingDict {
  tabs: { similar: string; deals: string };
  toolbar: {
    productFound: string;
    mostPopular: string;
    price: string;
    sortNewest: string;
    sortPriceLow: string;
    sortPriceHigh: string;
    sortRating: string;
  };
  filter: {
    title: string;
    quickFilters: string;
    category: string;
    size: string;
    sizeClothing: string;
    sizeShoes: string;
    color: string;
    priceRange: string;
    priceTo: string;
    brands: string;
    brandsSearch: string;
    style: string;
    material: string;
    apply: string;
  };
}

interface IProps {
  slug: string;
  title: string;
  header: React.ReactNode;
  dict: IListingDict;
  quickFiltersLabels: {
    onSale: string;
    freeDelivery: string;
    original: string;
    new: string;
  };
  initialProducts: IProduct[];
  initialMeta: IApiCategorySectionMeta;
}

function mapProduct(p: IApiCategorySectionProduct): IProduct {
  return {
    id: String(p.id),
    slug: p.slug,
    title: p.title,
    subtitle: "",
    prices: { USD: 0, UZS: p.price, RUB: 0 },
    image: p.image_url,
    rating: p.rating,
    reviews: 0,
    badge: p.is_original ? "Original" : undefined,
    discountLabel:
      p.discount_type === "percent" && p.discount > 0
        ? `${p.discount}%`
        : undefined,
    delivery: p.delivery_date_text,
  };
}

export function SectionProductsInfinite({
  slug,
  title,
  header,
  dict,
  quickFiltersLabels,
  initialProducts,
  initialMeta,
}: IProps) {
  const [products, setProducts] = useState<IProduct[]>(initialProducts);
  const [meta, setMeta] = useState(initialMeta);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);

  const hasMore = meta.current_page < meta.last_page;

  const loadMore = useCallback(async () => {
    if (loadingRef.current || meta.current_page >= meta.last_page) return;
    loadingRef.current = true;
    setLoading(true);
    try {
      const res = await categoryApi.getSection(slug, meta.current_page + 1);
      const incoming = Array.isArray(res.data?.products)
        ? res.data.products.map(mapProduct)
        : [];
      setProducts((prev) => [...prev, ...incoming]);
      if (res.data?.meta) setMeta(res.data.meta);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, [slug, meta]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) loadMore();
      },
      { rootMargin: "300px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore, hasMore]);

  return (
    <>
      <ListingShell
        title={title}
        header={header}
        products={products}
        dict={dict}
        quickFiltersLabels={quickFiltersLabels}
      />
      {hasMore && <div ref={sentinelRef} className="h-10" />}
      {loading && (
        <div className="flex justify-center py-6">
          <div className="size-8 animate-spin rounded-full border-4 border-muted border-t-primary" />
        </div>
      )}
    </>
  );
}
