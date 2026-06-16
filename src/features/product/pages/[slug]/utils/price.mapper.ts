export function getOriginalPrice(
  price: number,
  discount: number,
  discountType: string,
): number | undefined {
  if (discount <= 0) return undefined;
  return discountType === "percent"
    ? price / (1 - discount / 100)
    : price + discount;
}
