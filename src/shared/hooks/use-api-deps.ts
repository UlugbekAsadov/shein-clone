"use client";

import { useParams } from "next/navigation";
import { useCurrency } from "@/shared/hooks/use-currency";

export function useApiDeps() {
  const { currency } = useCurrency();
  const params = useParams();
  const lang = typeof params?.lang === "string" ? params.lang : "uz";
  return { currency, lang };
}
