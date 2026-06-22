"use client";

import { useCallback, useSyncExternalStore } from "react";
import { viewModes } from "@/shared/constants/listing.constants";

export type ListingView = (typeof viewModes)[number]["id"];

const STORAGE_KEY = "listing-view";
const DEFAULT_VIEW: ListingView = "comfortable";

function isListingView(value: string | null): value is ListingView {
  return viewModes.some((mode) => mode.id === value);
}

const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot(): ListingView {
  const stored = localStorage.getItem(STORAGE_KEY);
  return isListingView(stored) ? stored : DEFAULT_VIEW;
}

function getServerSnapshot(): ListingView {
  return DEFAULT_VIEW;
}

export function useListingView() {
  const view = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setView = useCallback((next: ListingView) => {
    localStorage.setItem(STORAGE_KEY, next);
    listeners.forEach((listener) => listener());
  }, []);

  return { view, setView };
}
