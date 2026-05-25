"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { viewModes } from "@/shared/constants/listing.constants";

export type ListingView = (typeof viewModes)[number]["id"];

const VIEW_PARAM = "view";
const DEFAULT_VIEW: ListingView = "comfortable";

function isListingView(value: string | null): value is ListingView {
  return viewModes.some((mode) => mode.id === value);
}

export function useListingView() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const param = searchParams.get(VIEW_PARAM);
  const view: ListingView = isListingView(param) ? param : DEFAULT_VIEW;

  const setView = useCallback(
    (next: ListingView) => {
      const params = new URLSearchParams(searchParams.toString());
      if (next === DEFAULT_VIEW) {
        params.delete(VIEW_PARAM);
      } else {
        params.set(VIEW_PARAM, next);
      }
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router, searchParams],
  );

  return { view, setView };
}
