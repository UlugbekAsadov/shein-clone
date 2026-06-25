"use client";

import { useContext } from "react";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { DictionaryContext } from "@/core/config/i18n/dictionary-context";

export function useDictionary(): IDictionary {
  const dict = useContext(DictionaryContext);

  if (!dict) {
    throw new Error("useDictionary must be used within a DictionaryProvider");
  }

  return dict;
}
