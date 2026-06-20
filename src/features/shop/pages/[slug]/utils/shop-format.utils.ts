import type { IDictionary } from "@/core/config/i18n/dictionaries";

export function formatCount(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`;
  return String(count);
}

export function formatMemberYears(memberSince: string, dict: IDictionary): string {
  const years = new Date().getFullYear() - parseInt(memberSince, 10);
  const n = Math.max(1, years);
  const absN = Math.abs(n);
  const lastTwo = absN % 100;
  const lastOne = absN % 10;

  let form: "yearOne" | "yearFew" | "yearMany";
  if (lastTwo >= 11 && lastTwo <= 14) {
    form = "yearMany";
  } else if (lastOne === 1) {
    form = "yearOne";
  } else if (lastOne >= 2 && lastOne <= 4) {
    form = "yearFew";
  } else {
    form = "yearMany";
  }

  return `${n} ${dict.shop[form]}`;
}
