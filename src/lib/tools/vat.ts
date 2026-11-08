import { NIGERIA_VAT } from "../../data/tool-notes";
import {
  DEFAULT_CURRENCY,
  formatMoney,
  formatScaled,
  parseAmount,
  parsePercent,
  percentOf,
  type CurrencyCode,
} from "./money";

/** The VAT calculator. See document.ts for how the layers fit. */

export type VatMode = "exclusive" | "inclusive";

export type VatDraft = {
  currency: CurrencyCode;
  /** exclusive: the amount is before VAT. inclusive: VAT is already in it. */
  mode: VatMode;
  amount: string;
  rate: string;
};

export type VatResult = {
  net: number;
  vat: number;
  gross: number;
  /** Thousandths of a percent, as parsePercent returns. */
  rate: number;
};

export type VatErrors = Record<string, string>;

export const createVatDraft = (): VatDraft => ({
  currency: DEFAULT_CURRENCY,
  mode: "exclusive",
  amount: "",
  rate: NIGERIA_VAT.rate,
});

export const SAMPLE_VAT_AMOUNT = "10,000";

const hasText = (value: string) => value.trim() !== "";

export function computeVat(draft: VatDraft): VatResult | null {
  const amount = parseAmount(draft.amount);
  const rate = parsePercent(draft.rate);
  if (amount === null || rate === null || rate > 100000) return null;

  if (draft.mode === "exclusive") {
    const vat = percentOf(amount, rate);
    return { net: amount, vat, gross: amount + vat, rate };
  }

  // Taking VAT out: net = gross ÷ (1 + rate), rounded half up, and the VAT is
  // whatever's left, so the two always add back to the price exactly.
  const divisor = 100000n + BigInt(rate);
  const net = Number((BigInt(amount) * 100000n * 2n + divisor) / (divisor * 2n));
  return { net, vat: amount - net, gross: amount, rate };
}

export function validateVat(draft: VatDraft): VatErrors {
  const errors: VatErrors = {};

  if (parseAmount(draft.amount) === null) {
    errors.amount = "Enter an amount using numbers only, like 10,000.";
  }
  const rate = parsePercent(draft.rate);
  if (!hasText(draft.rate) || rate === null || rate > 100000) {
    errors.rate = "Enter a rate between 0 and 100.";
  }

  return errors;
}

export const isStandardRate = (draft: VatDraft) =>
  parsePercent(draft.rate) === parsePercent(NIGERIA_VAT.rate);

export function vatSummary(result: VatResult, currency: CurrencyCode): string {
  const money = (minor: number) => formatMoney(minor, currency);
  return [
    `Price before VAT: ${money(result.net)}`,
    `VAT at ${formatScaled(result.rate)}%: ${money(result.vat)}`,
    `Price with VAT: ${money(result.gross)}`,
  ].join("\n");
}
