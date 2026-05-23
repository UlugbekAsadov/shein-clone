export interface IGeocodeResult {
  name: string;
  description: string;
  addressLine: string;
}

async function awaitReady(): Promise<boolean> {
  if (typeof window === "undefined") return false;
  if (window.__ymapsLoadingPromise) {
    try {
      await window.__ymapsLoadingPromise;
    } catch {
      return false;
    }
  }
  if (!window.ymaps) return false;
  await new Promise<void>((resolve) => window.ymaps!.ready(() => resolve()));
  return true;
}

interface IPropertyBag {
  get: (key: string, defaultValue?: unknown) => unknown;
}

function getProperty(obj: unknown, key: string): string {
  if (!obj || typeof obj !== "object") return "";
  const props = (obj as { properties?: IPropertyBag }).properties;
  if (!props || typeof props.get !== "function") return "";
  const value = props.get(key, "");
  return typeof value === "string" ? value : "";
}

export async function reverseGeocode(
  lng: number,
  lat: number,
): Promise<IGeocodeResult | null> {
  await awaitReady();
  if (!window.ymaps?.geocode) return null;
  try {
    const result = await window.ymaps.geocode([lat, lng], { results: 1 });
    const first = result.geoObjects.get(0);
    if (!first) return null;
    const addressLine = first.getAddressLine();
    const name = getProperty(first, "name") || addressLine;
    const description = getProperty(first, "description") || "";
    return { name, description, addressLine };
  } catch {
    return null;
  }
}

export interface ISuggestion {
  value: string;
  displayName: string;
}

export async function suggest(
  query: string,
  results = 6,
): Promise<ISuggestion[]> {
  const trimmed = query.trim();
  if (!trimmed) return [];
  try {
    const url = new URL("/api/yandex/suggest", window.location.origin);
    url.searchParams.set("q", trimmed);
    url.searchParams.set("results", String(results));
    const response = await fetch(url.toString());
    if (!response.ok) return [];
    const data = (await response.json()) as { items?: ISuggestion[] };
    return data.items ?? [];
  } catch {
    return [];
  }
}

export async function forwardGeocode(
  query: string,
): Promise<({ lng: number; lat: number } & IGeocodeResult) | null> {
  await awaitReady();
  if (!query.trim() || !window.ymaps?.geocode) return null;
  try {
    const result = await window.ymaps.geocode(query, { results: 1 });
    const first = result.geoObjects.get(0);
    if (!first) return null;
    const [lat, lng] = first.geometry.getCoordinates();
    const addressLine = first.getAddressLine();
    const name = getProperty(first, "name") || addressLine;
    const description = getProperty(first, "description") || "";
    return { lng, lat, name, description, addressLine };
  } catch {
    return null;
  }
}
