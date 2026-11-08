import { describe, expect, it } from "vitest";
import {
  computeMargin,
  createMarginDraft,
  isMarginPristine,
  marginSummary,
  SAMPLE_MARGIN,
  validateMargin,
  type MarginDraft,
} from "./margin";
import { formatPercent, ratioPercent } from "./money";

const draftWith = (overrides: Partial<MarginDraft>): MarginDraft => ({
  ...createMarginDraft(),
  ...overrides,
});

describe("ratioPercent", () => {
  it("rounds half away from zero, in hundredths of a percent", () => {
    expect(ratioPercent(350000, 650000)).toBe(5385); // 53.846…
    expect(ratioPercent(1, 3)).toBe(3333);
    expect(ratioPercent(2, 3)).toBe(6667);
    expect(ratioPercent(-1, 8)).toBe(-1250);
    expect(ratioPercent(-1, 3)).toBe(-3333);
    expect(ratioPercent(5, 0)).toBeNull();
  });

  it("formats without padding", () => {
    expect(formatPercent(3500)).toBe("35%");
    expect(formatPercent(5385)).toBe("53.85%");
    expect(formatPercent(-1250)).toBe("-12.5%");
  });
});

describe("computeMargin", () => {
  it("works out the classic example", () => {
    // Cost 6,500, price 10,000: profit 3,500, which is 35% of the price and
    // 53.85% of the cost.
    const result = computeMargin(SAMPLE_MARGIN)!;
    expect(result).toEqual({
      revenue: 1000000,
      totalCost: 650000,
      profit: 350000,
      unitCost: 650000,
      unitProfit: 350000,
      margin: 3500,
      markup: 5385,
    });
  });

  it("adds other costs to each unit and scales by quantity", () => {
    // (10,000 - (6,000 + 500)) × 12 = 42,000 profit on 120,000 revenue.
    const result = computeMargin(
      draftWith({ cost: "6,000", price: "10,000", extra: "500", quantity: "12" }),
    )!;
    expect(result.revenue).toBe(12000000);
    expect(result.totalCost).toBe(7800000);
    expect(result.profit).toBe(4200000);
    expect(result.margin).toBe(3500);
    expect(result.markup).toBe(5385);
  });

  it("reports a loss as negative", () => {
    const result = computeMargin(draftWith({ cost: "12,000", price: "10,000" }))!;
    expect(result.profit).toBe(-200000);
    expect(result.margin).toBe(-2000);
    expect(result.markup).toBe(-1667);
  });

  it("has no markup when nothing was spent", () => {
    const result = computeMargin(draftWith({ cost: "0", price: "5,000" }))!;
    expect(result.margin).toBe(10000);
    expect(result.markup).toBeNull();
  });

  it("waits for a cost and a price", () => {
    expect(computeMargin(draftWith({ cost: "100" }))).toBeNull();
    expect(computeMargin(draftWith({ cost: "x", price: "100" }))).toBeNull();
  });

  it("refuses figures too large to be exact", () => {
    const huge = draftWith({ cost: "1", price: "999,999,999,999", quantity: "999,999" });
    expect(computeMargin(huge)).toBeNull();
    expect(validateMargin(huge).quantity).toMatch(/too large/);
  });
});

describe("validateMargin", () => {
  it("passes good figures and explains bad ones", () => {
    expect(validateMargin(SAMPLE_MARGIN)).toEqual({});

    const errors = validateMargin(draftWith({ price: "0", extra: "abc", quantity: "0" }));
    expect(Object.keys(errors).sort()).toEqual(["cost", "extra", "price", "quantity"]);
  });
});

describe("helpers", () => {
  it("knows when nothing has been typed", () => {
    expect(isMarginPristine(createMarginDraft())).toBe(true);
    expect(isMarginPristine(draftWith({ quantity: "" }))).toBe(true);
    expect(isMarginPristine(draftWith({ quantity: "3" }))).toBe(false);
  });

  it("writes a summary", () => {
    expect(marginSummary(computeMargin(SAMPLE_MARGIN)!, "NGN")).toBe(
      [
        "Revenue: ₦10,000.00",
        "Total cost: ₦6,500.00",
        "Gross profit: ₦3,500.00",
        "Profit margin: 35%",
        "Markup: 53.85%",
        "Profit per unit: ₦3,500.00",
      ].join("\n"),
    );
  });
});
