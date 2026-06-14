import { API_CONFIG, AUTH_COOKIES } from "./api-config";
import { ApiError } from "./api-error";
import type { IApiErrorBody } from "./interfaces/api-response.interface";
import type { IHttpOptions } from "./interfaces/http-options.interface";

const isServer = typeof window === "undefined";

function buildUrl(
  endpoint: string,
  searchParams?: IHttpOptions["searchParams"],
): string {
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = new URL(`${API_CONFIG.baseUrl}${path}`);
  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      if (value === undefined || value === null) continue;
      url.searchParams.set(key, String(value));
    }
  }
  return url.toString();
}

function mapCurrency(raw: string): string {
  return raw === "RUB" ? "RUBLE" : raw;
}

function getCookie(name: string, cookieHeader: string): string | undefined {
  const match = cookieHeader.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

async function buildDynamicHeaders(
  skipAuth: boolean,
): Promise<Record<string, string>> {
  const result: Record<string, string> = {};

  if (isServer) {
    const { cookies } = await import("next/headers");
    const store = await cookies();

    const locale = store.get("locale")?.value ?? "uz";
    const currency = store.get("currency")?.value ?? "USD";
    result["Accept-language"] = locale.toUpperCase();
    result["Accept-currency"] = mapCurrency(currency);

    if (!skipAuth) {
      const token = store.get(AUTH_COOKIES.accessToken)?.value;
      if (token) result.Authorization = `Bearer ${token}`;
    }
  } else {
    const raw = document.cookie;
    const locale = getCookie("locale", raw) ?? "uz";
    const currency = getCookie("currency", raw) ?? "USD";
    result["Accept-language"] = locale.toUpperCase();
    result["Accept-currency"] = mapCurrency(currency);
  }

  return result;
}

async function parseBody(response: Response): Promise<unknown> {
  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    return response.json().catch(() => null);
  }
  const text = await response.text();
  return text.length > 0 ? text : null;
}

async function request<TData>(
  method: string,
  endpoint: string,
  body: unknown,
  options: IHttpOptions = {},
): Promise<TData> {
  const { searchParams, headers, next, skipAuth, signal, ...rest } = options;
  const url = buildUrl(endpoint, searchParams);

  const dynamicHeaders = await buildDynamicHeaders(skipAuth ?? false);

  const finalHeaders: Record<string, string> = {
    ...API_CONFIG.defaultHeaders,
    ...dynamicHeaders,
    ...(headers as Record<string, string> | undefined),
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(
    () => controller.abort(),
    API_CONFIG.timeoutMs,
  );
  if (signal) {
    signal.addEventListener("abort", () => controller.abort(), { once: true });
  }

  let response: Response;
  try {
    response = await fetch(url, {
      ...rest,
      method,
      headers: finalHeaders,
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: controller.signal,
      next,
    });
  } finally {
    clearTimeout(timeoutId);
  }

  if (!response.ok) {
    const errorBody = (await parseBody(response)) as IApiErrorBody | string | null;
    throw new ApiError(response.status, response.statusText, endpoint, errorBody);
  }

  return (await parseBody(response)) as TData;
}

export const apiClient = {
  get<TData>(endpoint: string, options?: IHttpOptions) {
    return request<TData>("GET", endpoint, undefined, options);
  },
  post<TData>(endpoint: string, body?: unknown, options?: IHttpOptions) {
    return request<TData>("POST", endpoint, body, options);
  },
  put<TData>(endpoint: string, body?: unknown, options?: IHttpOptions) {
    return request<TData>("PUT", endpoint, body, options);
  },
  patch<TData>(endpoint: string, body?: unknown, options?: IHttpOptions) {
    return request<TData>("PATCH", endpoint, body, options);
  },
  delete<TData>(endpoint: string, options?: IHttpOptions) {
    return request<TData>("DELETE", endpoint, undefined, options);
  },
};
