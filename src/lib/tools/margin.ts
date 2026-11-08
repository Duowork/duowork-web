import {
  DEFAULT_CURRENCY,
  formatMoney,
  formatPercent,
  lineTotal,
  parseAmount,
  parseQuantity,
  ratioPercent,
  type CurrencyCode,
} from "./money";

/** The profit margin calculator. See document.ts for how the layers fit. */

export type MarginDraft = {
  currency: CurrencyCode;
  cost: string;
  price: string;
  /** Other costs per unit sold: packaging, delivery, commission. */
  extra: string;
  quantity: string;
};

export type MarginResult = {
  revenue: number;
  totalCost: number;
  profit: number;
  unitCost: number;
  unitProfit: number;
  /** Hundredths of a percent; null when there's no revenue to compare with. */
  margin: number | null;
  /** Hundredths of a percent; null when there's no cost to compare with. */
  markup: number | null;
};

export type MarginErrors = Record<string, string>;

export const createMarginDraft = (): MarginDraft => ({
  currency: DEFAULT_CURRENCY,
  cost: "",
  price: "",
  extra: "",
  quantity: "1",
});

/** The example shown until the visitor types: the figures in the placeholders. */
export const SAMPLE_MARGIN: MarginDraft = {
  ...createMarginDraft(),
  cost: "6,500",
  price: "10,000",
};

const hasText = (value: string) => value.trim() !== "";

export const isMarginPristine = (draft: MarginDraft) =>
  !hasText(draft.cost) &&
  !hasText(draft.price) &&
  !hasText(draft.extra) &&
  ["", "1"].includes(draft.quantity.trim());

/** Null until there's enough to work with; half-typed figures never throw. */
export function computeMargin(draft: MarginDraft): MarginResult | null {
  const cost = parseAmount(draft.cost);
  const price = parseAmount(draft.price);
  const extra = hasText(draft.extra) ? parseAmount(draft.extra) : 0;
  const quantity = hasText(draft.quantity) ? parseQuantity(draft.quantity) : 1000;

  if (cost === null || price === null || extra === null || !quantity) return null;

  const unitCost = cost + extra;
  const revenue = lineTotal(quantity, price);
  const totalCost = lineTotal(quantity, unitCost);
  if (!Number.isSafeInteger(revenue) || !Number.isSafeInteger(totalCost)) return null;

  const profit = revenue - totalCost;

  return {
    revenue,
    totalCost,
    profit,
    unitCost,
    unitProfit: price - unitCost,
    margin: ratioPercent(profit, revenue),
    markup: ratioPercent(profit, totalCost),
  };
}

export function validateMargin(draft: MarginDraft): MarginErrors {
  const errors: MarginErrors = {};

  if (parseAmount(draft.cost) === null) {
    errors.cost = "Enter what one unit costs you, using numbers only, like 6,500.";
  }
  const price = parseAmount(draft.price);
  if (price === null || price === 0) {
    errors.price = "Enter the price you sell one unit for, like 10,000.";
  }
  if (hasText(draft.extra) && parseAmount(draft.extra) === null) {
    errors.extra = "Enter other costs using numbers only, or leave this empty.";
  }
  const quantity = parseQuantity(draft.quantity);
  if (quantity === null || quantity === 0) {
    errors.quantity = "Enter how many you sell, above zero.";
  }

  if (Object.keys(errors).length === 0 && computeMargin(draft) === null) {
    errors.quantity = "Those figures are too large to work out precisely. Try a smaller quantity.";
  }

  return errors;
}

export function marginSummary(result: MarginResult, currency: CurrencyCode): string {
  const money = (minor: number) => formatMoney(minor, currency);
  const percent = (value: number | null) => (value === null ? "n/a" : formatPercent(value));

  return [
    `Revenue: ${money(result.revenue)}`,
    `Total cost: ${money(result.totalCost)}`,
    `Gross profit: ${money(result.profit)}`,
    `Profit margin: ${percent(result.margin)}`,
    `Markup: ${percent(result.markup)}`,
    `Profit per unit: ${money(result.unitProfit)}`,
  ].join("\n");
}
