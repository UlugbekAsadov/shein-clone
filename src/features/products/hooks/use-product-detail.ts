"use client";

import { useEffect, useState } from "react";
import { ApiError } from "@/core/api/api-error";
import { productDetailApi } from "@/features/products/api/products-detail.api";
import { getClientSessionId } from "@/lib/session-id";
import type { IProductDetail } from "@/features/products/pages/[slug]/utils/product-detail.interface";

const detailCache = new Map<string, IProductDetail>();

export function useProductDetail(slug: string, enabled: boolean) {
  const [data, setData] = useState<IProductDetail | null>(
    () => detailCache.get(slug) ?? null,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const cached = detailCache.get(slug);
    if (cached) {
      setData(cached);
      setError(false);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError(false);

    productDetailApi
      .getBySlug(slug, getClientSessionId(), controller.signal)
      .then((result) => {
        if (controller.signal.aborted) return;
        if (result.data) {
          detailCache.set(slug, result.data);
          setData(result.data);
        } else {
          setError(true);
        }
      })
      .catch((err) => {
        if (controller.signal.aborted) return;
        if (err instanceof ApiError || err instanceof Error) setError(true);
        else throw err;
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [slug, enabled]);

  return { data, loading, error };
}
