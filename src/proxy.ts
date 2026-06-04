import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/core/config/i18n/i18n-config";
import { AUTH_COOKIES } from "@/core/api/api-config";

const PROTECTED_SEGMENTS = ["profile"] as const;

function pickLocale(request: NextRequest): string {
  const accept = request.headers.get("accept-language");
  if (!accept) return defaultLocale;

  const preferences = accept
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const qParam = params.find((p) => p.startsWith("q="));
      const q = qParam ? Number.parseFloat(qParam.slice(2)) : 1;

      return {
        tag: tag.toLowerCase(),
        q: Number.isFinite(q) ? q : 0,
      };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of preferences) {
    const base = tag.split("-")[0];

    if ((locales as readonly string[]).includes(base)) {
      return base;
    }
  }

  return defaultLocale;
}

function matchLocalePrefix(pathname: string): string | null {
  for (const locale of locales) {
    if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) {
      return locale;
    }
  }

  return null;
}

function isProtectedPath(pathname: string, locale: string): boolean {
  return PROTECTED_SEGMENTS.some((segment) =>
    pathname.startsWith(`/${locale}/demo/${segment}`),
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const locale = matchLocalePrefix(pathname);

  // "/" => "/uz"
  if (locale === null) {
    const picked = pickLocale(request);

    const url = request.nextUrl.clone();
    url.pathname = `/${picked}${pathname === "/" ? "" : pathname}`;

    return NextResponse.redirect(url);
  }

  // "/uz" => Coming Soon sahifasi
  if (pathname === `/${locale}`) {
    return NextResponse.next();
  }

  // "/uz/demo/*" => o'z holicha qoldir
  if (!pathname.startsWith(`/${locale}/demo`)) {
    const url = request.nextUrl.clone();

    url.pathname = pathname.replace(`/${locale}`, `/${locale}/demo`);

    return NextResponse.redirect(url);
  }

  // Auth tekshiruvi
  if (
    isProtectedPath(pathname, locale) &&
    !request.cookies.get(AUTH_COOKIES.accessToken)?.value
  ) {
    const url = request.nextUrl.clone();

    url.pathname = `/${locale}`;
    url.search = "";

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
