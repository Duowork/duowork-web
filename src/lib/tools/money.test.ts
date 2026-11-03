import { describe, expect, it } from "vitest";
import {
  formatMoney,
  formatScaled,
  lineTotal,
  parseAmount,
  parsePercent,
  parseQuantity,
  percentOf,
} from "./money";

describe("parseAmount", () => {
  it("reads plain and comma-separated amounts into minor units", () => {
    expect(parseAmount("1250")).toBe(125000);
    expect(parseAmount("1,250.50")).toBe(125050);
    expect(parseAmount(" 25 000 ")).toBe(2500000);
    expect(parseAmount(".5")).toBe(50);
    expect(parseAmount("7.")).toBe(700);
  });

  it("rounds on the digits, where a float would get it wrong", () => {
    // 1.005 * 100 is 100.49999... in floating point.
    expect(parseAmount("1.005")).toBe(101);
    expect(parseAmount("1.004")).toBe(100);
    expect(parseAmount("0.29")).toBe(29);
    expect(parseAmount("1.99")).toBe(199);
  });

  it("rejects anything that isn't a non-negative number", () => {
    for (const bad of ["", " ", "abc", "-5", "1.2.3", "₦500", "1e5"]) {
      expect(parseAmount(bad)).toBeNull();
    }
  });

  it("rejects amounts too large to total safely", () => {
    expect(parseAmount("999999999999")).toBe(99999999999900);
    expect(parseAmount("1000000000000")).toBeNull();
  });
});

describe("parseQuantity and parsePercent", () => {
  it("keep three decimals", () => {
    expect(parseQuantity("1.5")).toBe(1500);
    expect(parseQuantity("0.125")).toBe(125);
    expect(parsePercent("7.5")).toBe(7500);
    expect(parsePercent("100")).toBe(100000);
  });
});

describe("lineTotal", () => {
  it("multiplies quantity by unit price", () => {
    expect(lineTotal(3000, 12000000)).toBe(36000000); // 3 × 120,000.00
    expect(lineTotal(1500, 1000)).toBe(1500); // 1.5 × 10.00
  });

  it("rounds half up to the nearest minor unit", () => {
    expect(lineTotal(1500, 33)).toBe(50); // 1.5 × 0.33 = 0.495
    expect(lineTotal(333, 100)).toBe(33); // 0.333 × 1.00 = 0.333
  });

  it("stays exact on very large values", () => {
    // 999,999,999.999 × 999,999,999,999.99 would lose precision as a float.
    expect(lineTotal(1000, 99999999999999)).toBe(99999999999999);
  });
});

describe("percentOf", () => {
  it("takes a percentage of an amount", () => {
    expect(percentOf(10000000, 7500)).toBe(750000); // 7.5% of 100,000.00
    expect(percentOf(10000, 100000)).toBe(10000); // 100%
    expect(percentOf(10000, 0)).toBe(0);
  });

  it("rounds half up", () => {
    expect(percentOf(1000, 12345)).toBe(123); // 12.345% of 10.00 = 1.2345
    expect(percentOf(100, 7500)).toBe(8); // 7.5% of 1.00 = 0.075
  });
});

describe("formatting", () => {
  it("uses the naira sign and thousands separators", () => {
    expect(formatMoney(123456750, "NGN")).toBe("₦1,234,567.50");
    expect(formatMoney(0, "NGN")).toBe("₦0.00");
  });

  it("formats other currencies", () => {
    expect(formatMoney(150000, "GBP")).toBe("£1,500.00");
    expect(formatMoney(150000, "EUR")).toBe("€1,500.00");
  });

  it("shows scaled values without padding", () => {
    expect(formatScaled(1500)).toBe("1.5");
    expect(formatScaled(3000)).toBe("3");
    expect(formatScaled(1000000)).toBe("1,000");
  });
});
