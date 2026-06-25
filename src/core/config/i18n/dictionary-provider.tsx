"use client";

import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { DictionaryContext } from "@/core/config/i18n/dictionary-context";

interface IProps {
  dict: IDictionary;
  children: React.ReactNode;
}

export function DictionaryProvider({ dict, children }: IProps) {
  return (
    <DictionaryContext.Provider value={dict}>
      {children}
    </DictionaryContext.Provider>
  );
}
