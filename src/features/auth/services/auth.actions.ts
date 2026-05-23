"use server";

import { cookies } from "next/headers";
import { updateTag } from "next/cache";
import { AUTH_COOKIES } from "@/core/api/api-config";
import { ApiError } from "@/core/api/api-error";
import { env } from "@/core/config/env";
import { authApi, ME_CACHE_TAG } from "@/features/auth/api/auth.api";
import type { ILoginResponseData } from "@/features/auth/login/utils/login.interface";
import type {
  IRegisterPayload,
  IRegisterRequest,
} from "@/features/auth/login/utils/register.interface";
import type { IActionResult } from "@/types/action-result.interface";

const PHONE_COUNTRY_CODE = "998";
const ACCESS_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;
const REFRESH_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

function digitsToIsoDate(digits: string): string {
  if (digits.length !== 8) return digits;
  const day = digits.slice(0, 2);
  const month = digits.slice(2, 4);
  const year = digits.slice(4, 8);
  return `${year}-${month}-${day}`;
}

function normalizePhone(input: string): string {
  const digits = input.replace(/\D/g, "");
  return digits.startsWith(PHONE_COUNTRY_CODE)
    ? digits
    : `${PHONE_COUNTRY_CODE}${digits}`;
}

function extractAccessToken(
  data: ILoginResponseData | undefined,
): string | undefined {
  return data?.token ?? data?.access_token ?? data?.accessToken;
}

function extractRefreshToken(
  data: ILoginResponseData | undefined,
): string | undefined {
  return data?.refresh_token ?? data?.refreshToken;
}

function authCookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    secure: env.isProduction,
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  };
}

async function persistTokens(
  data: ILoginResponseData | undefined,
): Promise<boolean> {
  const accessToken = extractAccessToken(data);
  if (!accessToken) return false;
  const store = await cookies();
  store.set(
    AUTH_COOKIES.accessToken,
    accessToken,
    authCookieOptions(ACCESS_MAX_AGE_SECONDS),
  );
  const refreshToken = extractRefreshToken(data);
  if (refreshToken) {
    store.set(
      AUTH_COOKIES.refreshToken,
      refreshToken,
      authCookieOptions(REFRESH_MAX_AGE_SECONDS),
    );
  }
  updateTag(ME_CACHE_TAG);
  return true;
}

function toActionError(error: unknown): IActionResult {
  if (error instanceof ApiError) {
    return {
      ok: false,
      message: error.userMessage,
      errorCode: error.errorCode,
    };
  }
  throw error;
}

export async function sendCodeAction(phone: string): Promise<IActionResult> {
  try {
    const result = await authApi.sendCode({
      contact: normalizePhone(phone),
      type: "phone",
    });
    return { ok: true, message: result.message };
  } catch (error) {
    return toActionError(error);
  }
}

export async function checkCodeAction(
  phone: string,
  code: string,
): Promise<IActionResult> {
  try {
    const result = await authApi.checkCode({
      contact: normalizePhone(phone),
      type: "phone",
      code,
    });
    return { ok: true, message: result.message };
  } catch (error) {
    return toActionError(error);
  }
}

export async function loginAction(
  phone: string,
  code: string,
): Promise<IActionResult> {
  try {
    const result = await authApi.login({
      contact: normalizePhone(phone),
      type: "phone",
      code,
    });
    await persistTokens(result.data);
    return { ok: true, message: result.message };
  } catch (error) {
    return toActionError(error);
  }
}

export async function registerAction(
  payload: IRegisterPayload,
): Promise<IActionResult> {
  const request: IRegisterRequest = {
    name: payload.name,
    contact: normalizePhone(payload.phone),
    type: "phone",
    code: payload.code,
    password: normalizePhone(payload.phone),
    birthday: digitsToIsoDate(payload.birthday),
    gender: payload.gender,
  };
  try {
    const result = await authApi.register(request);
    await persistTokens(result.data);
    return { ok: true, message: result.message };
  } catch (error) {
    return toActionError(error);
  }
}

export async function logoutAction(): Promise<IActionResult> {
  const store = await cookies();
  store.delete(AUTH_COOKIES.accessToken);
  store.delete(AUTH_COOKIES.refreshToken);
  updateTag(ME_CACHE_TAG);
  return { ok: true };
}
