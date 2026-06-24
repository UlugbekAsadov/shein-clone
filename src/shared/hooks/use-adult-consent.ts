"use client";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "adult-consent";
const CONSENT_VALUE = "1";

const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot(): boolean {
  return localStorage.getItem(STORAGE_KEY) === CONSENT_VALUE;
}

function getServerSnapshot(): boolean {
  return false;
}

export function useAdultConsent() {
  const confirmed = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const confirmAdult = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, CONSENT_VALUE);
    listeners.forEach((listener) => listener());
  }, []);

  return { confirmed, confirmAdult };
}
