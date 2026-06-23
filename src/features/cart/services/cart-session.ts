import "server-only";
import { cookies } from "next/headers";
import { env } from "@/core/config/env";

const CART_SESSION_COOKIE = "cart_session_id";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

export async function getCartSessionId(): Promise<string> {
  const store = await cookies();
  const existing = store.get(CART_SESSION_COOKIE)?.value;
  if (existing) return existing;

  const sessionId = crypto.randomUUID();
  store.set(CART_SESSION_COOKIE, sessionId, {
    httpOnly: true,
    secure: env.isProduction,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
  return sessionId;
}
