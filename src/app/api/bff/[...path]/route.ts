import { type NextRequest, NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import { API_CONFIG, AUTH_COOKIES } from "@/core/api/api-config";

function mapCurrency(raw: string): string {
  return raw === "RUB" ? "RUBLE" : raw;
}

async function buildHeaders(skipAuth: boolean): Promise<Headers> {
  const store = await cookies();
  const headerStore = await headers();

  const result = new Headers();
  result.set("Accept", "application/json");

  const locale =
    headerStore.get("x-locale") ?? store.get("locale")?.value ?? "uz";
  const currency = store.get("currency")?.value ?? "USD";
  result.set("Accept-language", locale.toUpperCase());
  result.set("Accept-currency", mapCurrency(currency));

  if (!skipAuth) {
    const token = store.get(AUTH_COOKIES.accessToken)?.value;
    if (token) result.set("Authorization", `Bearer ${token}`);
  }

  return result;
}

async function forward(
  request: NextRequest,
  method: string,
  pathSegments: string[],
): Promise<Response> {
  const path = pathSegments.map((s) => encodeURIComponent(s)).join("/");
  const search = request.nextUrl.search;
  const url = `${API_CONFIG.baseUrl}/${path}${search}`;

  const skipAuth = request.headers.get("x-skip-auth") === "1";
  const outgoing = await buildHeaders(skipAuth);

  let body: BodyInit | undefined;
  if (method !== "GET" && method !== "DELETE") {
    const contentType = request.headers.get("content-type") ?? "";
    if (contentType.includes("multipart/form-data")) {
      body = await request.formData();
    } else {
      const text = await request.text();
      if (text.length > 0) {
        body = text;
        outgoing.set("Content-Type", contentType || "application/json");
      }
    }
  }

  const upstream = await fetch(url, {
    method,
    headers: outgoing,
    body,
    cache: "no-store",
  });

  const responseBody = await upstream.arrayBuffer();
  return new NextResponse(responseBody, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: {
      "content-type":
        upstream.headers.get("content-type") ?? "application/json",
    },
  });
}

interface IContext {
  params: Promise<{ path: string[] }>;
}

export async function GET(request: NextRequest, context: IContext) {
  const { path } = await context.params;
  return forward(request, "GET", path);
}

export async function POST(request: NextRequest, context: IContext) {
  const { path } = await context.params;
  return forward(request, "POST", path);
}

export async function PUT(request: NextRequest, context: IContext) {
  const { path } = await context.params;
  return forward(request, "PUT", path);
}

export async function PATCH(request: NextRequest, context: IContext) {
  const { path } = await context.params;
  return forward(request, "PATCH", path);
}

export async function DELETE(request: NextRequest, context: IContext) {
  const { path } = await context.params;
  return forward(request, "DELETE", path);
}
