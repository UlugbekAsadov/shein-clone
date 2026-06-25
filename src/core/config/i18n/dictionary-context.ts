"use client";

import { createContext } from "react";
import type { IDictionary } from "@/core/config/i18n/dictionaries";

export const DictionaryContext = createContext<IDictionary | null>(null);
