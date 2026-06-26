/** Single course pricing — the only fee BrainStack charges. */
export const COURSE_ORIGINAL_PRICE_BDT = 12_999;
export const COURSE_SALE_PRICE_BDT = 4_999;

export function formatBdt(amount: number): string {
  return `৳${amount.toLocaleString("en-BD")}`;
}

export function getDiscountPercent(
  original: number = COURSE_ORIGINAL_PRICE_BDT,
  sale: number = COURSE_SALE_PRICE_BDT,
): number {
  if (original <= 0 || sale >= original) return 0;
  return Math.round(((original - sale) / original) * 100);
}

export function getEffectivePrice(
  priceBdt: number,
  originalPriceBdt?: number | null,
): { original: number; sale: number; discountPct: number } {
  const sale = priceBdt > 0 ? priceBdt : COURSE_SALE_PRICE_BDT;
  const original =
    originalPriceBdt && originalPriceBdt > sale
      ? originalPriceBdt
      : COURSE_ORIGINAL_PRICE_BDT;

  return {
    original,
    sale,
    discountPct: getDiscountPercent(original, sale),
  };
}
