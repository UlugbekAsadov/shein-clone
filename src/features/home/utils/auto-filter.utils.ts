import type { IAutoFilter } from "./product-section.interface";

export function buildAutoFilterQuery(autoFilter: IAutoFilter): string {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(autoFilter)) {
    if (value === null || value === undefined) continue;
    if (Array.isArray(value)) {
      if (value.length === 0) continue;
      params.set(key, value.join(","));
    } else {
      params.set(key, String(value));
    }
  }

  const str = params.toString();
  return str ? `?${str}` : "";
}
