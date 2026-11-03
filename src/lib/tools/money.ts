/**
 * Money for the tools. Amounts are held as integers in minor units (kobo,
 * cents) and multiplied with BigInt, so totals never pick up floating-point
 * drift. Everything here is pure, which is what the unit tests rely on.
 */

export const CURRENCIES = [
  { code: "NGN", label: "NGN — Nigerian naira" },
  { code: "USD", label: "USD — US dollar" },
  { code: "GBP", label: "GBP — British pound" },
  { code: "EUR", label: "EUR — Euro" },
  { code: "GHS", label: "GHS — Ghanaian cedi" },
  { code: "KES", label: "KES — Kenyan shilling" },
  { code: "ZAR", label: "ZAR — South African rand" },
] as const;

export type CurrencyCode = (typeof CURRENCIES)[number]["code"];

export const DEFAULT_CURRENCY: CurrencyCode = "NGN";

/** Largest amount accepted: 999 billion. Keeps every sum a safe integer. */
const MAX_MAJOR_DIGITS = 12;

const clean = (value: string) => value.replace(/[\s,]/g, "");

/**
 * Reads a typed decimal into an integer scaled by 10^places, working on the
 * digits so "1.005" can't round wrongly through a float. Returns null for
 * anything that isn't a non-negative number.
 */
function parseScaled(value: string, places: number): number | null {
  const text = clean(value);
  if (!/^(\d+\.?\d*|\.\d+)$/.test(text)) return null;

  const [whole = "", fraction = ""] = text.split(".");
  if (whole.replace(/^0+/, "").length > MAX_MAJOR_DIGITS) return null;

  const scale = 10 ** places;
  const kept = fraction.slice(0, places).padEnd(places, "0");
  const roundUp = (fraction[places] ?? "0") >= "5" ? 1 : 0;

  return Number(whole || "0") * scale + Number(kept || "0") + roundUp;
}

/** "1,250.50" becomes 125050. */
export const parseAmount = (value: string) => parseScaled(value, 2);

/** Quantities allow three decimals, for hours and weights: "1.5" becomes 1500. */
export const parseQuantity = (value: string) => parseScaled(value, 3);

/** Percentages allow three decimals: "7.5" becomes 7500. */
export const parsePercent = (value: string) => parseScaled(value, 3);

/** Divides with half-up rounding. */
function mulDiv(a: number, b: number, divisor: bigint): number {
  return Number((BigInt(a) * BigInt(b) + divisor / 2n) / divisor);
}

export const lineTotal = (quantity: number, unitMinor: number) =>
  mulDiv(quantity, unitMinor, 1000n);

export const percentOf = (amountMinor: number, percent: number) =>
  mulDiv(amountMinor, percent, 100000n);

export function formatMoney(minor: number, currency: CurrencyCode): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
  }).format(minor / 100);
}

/** 1500 becomes "1.5"; used to show a quantity or rate back without padding. */
export function formatScaled(scaled: number): string {
  return new Intl.NumberFormat("en-NG", { maximumFractionDigits: 3 }).format(
    scaled / 1000,
  );
}
