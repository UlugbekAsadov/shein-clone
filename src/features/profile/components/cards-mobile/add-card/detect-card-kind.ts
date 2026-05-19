import type { CardKind } from "@/features/profile/interfaces/card.interface";

export function detectCardKind(rawNumber: string): CardKind | null {
  const digits = rawNumber.replace(/\D/g, "");
  if (digits.length === 0) return null;

  if (digits.startsWith("9860")) return "humo";
  if (digits.startsWith("8600") || digits.startsWith("5614")) return "uzcard";
  if (digits.startsWith("4")) return "visa";
  if (
    digits.startsWith("5") ||
    digits.startsWith("2221") ||
    digits.startsWith("2222") ||
    digits.startsWith("2223") ||
    digits.startsWith("2224") ||
    digits.startsWith("2225") ||
    digits.startsWith("2226") ||
    digits.startsWith("2227") ||
    digits.startsWith("2228") ||
    digits.startsWith("2229")
  ) {
    return "mastercard";
  }

  return null;
}
