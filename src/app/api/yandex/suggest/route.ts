import { NextResponse } from "next/server";

interface IRawResult {
  title?: { text?: string };
  subtitle?: { text?: string };
  text?: string;
}

interface IResponse {
  items: Array<{ value: string; displayName: string }>;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const part = searchParams.get("q")?.trim();
  if (!part) {
    return NextResponse.json<IResponse>({ items: [] });
  }
  const lang = searchParams.get("lang") ?? "en_US";
  const results = Number(searchParams.get("results") ?? "6");
  const ll = searchParams.get("ll");
  const apiKey =
    process.env.NEXT_PUBLIC_YANDEX_API_KEY ?? process.env.YANDEX_API_KEY;

  if (!apiKey) {
    return NextResponse.json<IResponse>({ items: [] }, { status: 500 });
  }

  const url = new URL("https://suggest-maps.yandex.ru/suggest-geo");
  url.searchParams.set("apikey", apiKey);
  url.searchParams.set("lang", lang);
  url.searchParams.set("part", part);
  url.searchParams.set("results", String(Math.min(Math.max(results, 1), 10)));
  url.searchParams.set("v", "9");
  if (ll) url.searchParams.set("ll", ll);

  const response = await fetch(url.toString(), { cache: "no-store" });
  if (!response.ok) {
    return NextResponse.json<IResponse>({ items: [] });
  }
  const text = await response.text();
  const match = text.match(/^suggest\.apply\(([\s\S]*)\)\s*;?\s*$/);
  if (!match) {
    return NextResponse.json<IResponse>({ items: [] });
  }
  let data: { results?: IRawResult[] };
  try {
    data = JSON.parse(match[1]) as { results?: IRawResult[] };
  } catch {
    return NextResponse.json<IResponse>({ items: [] });
  }

  const items = (data.results ?? []).flatMap((item) => {
    const title = item.title?.text?.trim();
    const subtitle = item.subtitle?.text?.trim();
    const value = item.text?.trim() || title || "";
    if (!value || !title) return [];
    const displayName = subtitle ? `${title} — ${subtitle}` : title;
    return [{ value, displayName }];
  });

  return NextResponse.json<IResponse>({ items });
}
