import { env } from "@/core/config/env";

export const API_CONFIG = {
  baseUrl: env.apiUrl,
  defaultHeaders: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeoutMs: 30_000,
} as const;

export const AUTH_COOKIES = {
  accessToken: "access_token",
  refreshToken: "refresh_token",
} as const;
