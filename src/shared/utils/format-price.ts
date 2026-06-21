import { currencies } from "@/shared/constants/currencies.constants";

export function groupDigits(n: number): string {
  return Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function formatPrice(
  amount: number,
  currency: (typeof currencies)[number],
): string {
  if (currency === "USD") {
    return `$${amount.toFixed(2)}`;
  }
  if (currency === "UZS") {
    return `${groupDigits(amount)} so'm`;
  }
  return `${groupDigits(amount)} ₽`;
}
