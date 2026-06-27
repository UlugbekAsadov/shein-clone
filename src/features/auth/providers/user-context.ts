"use client";

import { createContext } from "react";
import type { IUserContextValue } from "@/features/auth/utils/user-context.interface";

export const UserContext = createContext<IUserContextValue | undefined>(
  undefined,
);
