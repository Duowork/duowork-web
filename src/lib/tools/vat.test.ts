import { describe, expect, it } from "vitest";
import { NIGERIA_VAT } from "../../data/tool-notes";
import {
  computeVat,
  createVatDraft,
  isStandardRate,
  validateVat,
  vatSummary,
  type VatDraft,
} from "./vat";

const draftWith = (overrides: Partial<VatDraft>): VatDraft => ({
  ...createVatDraft(),
  ...overrides,
});

describe("computeVat", () => {
  it("starts at Nigeria's standard rate", () => {
    expect(NIGERIA_VAT.rate).toBe("7.5");
    expect(createVatDraft().rate).toBe("7.5");
  });

  it("adds VAT to a price", () => {
    expect(computeVat(draftWith({ amount: "10,000" }))).toEqual({
      net: 1000000,
      vat: 75000,
      gross: 1075000,
      rate: 7500,
    });
  });

  it("takes VAT out of a price", () => {
    expect(computeVat(draftWith({ mode: "inclusive", amount: "10,750" }))).toEqual({
      net: 1000000,
      vat: 75000,
      gross: 1075000,
      rate: 7500,
    });
  });

  it("rounds the net and keeps the parts adding up exactly", () => {
    // 1,000 ÷ 1.075 = 930.2325…, so 930.23 net and 69.77 VAT.
    const result = computeVat(draftWith({ mode: "inclusive", amount: "1,000" }))!;
    expect(result.net).toBe(93023);
    expect(result.vat).toBe(6977);
    expect(result.net + result.vat).toBe(result.gross);

    // 0.01 including VAT: rounds to all net.
    const tiny = computeVat(draftWith({ mode: "inclusive", amount: "0.01" }))!;
    expect(tiny.net + tiny.vat).toBe(1);
  });

  it("rounds added VAT half up", () => {
    // 7.5% of 0.10 is 0.0075, which rounds to 0.01.
    expect(computeVat(draftWith({ amount: "0.10" }))!.vat).toBe(1);
  });

  it("handles a zero rate and any other rate", () => {
    expect(computeVat(draftWith({ amount: "500", rate: "0" }))!.gross).toBe(50000);
    expect(computeVat(draftWith({ amount: "100", rate: "16" }))!.gross).toBe(11600);
  });

  it("waits for valid figures", () => {
    expect(computeVat(draftWith({ amount: "" }))).toBeNull();
    expect(computeVat(draftWith({ amount: "100", rate: "120" }))).toBeNull();
  });
});

describe("validateVat", () => {
  it("passes good figures and explains bad ones", () => {
    expect(validateVat(draftWith({ amount: "100" }))).toEqual({});
    expect(Object.keys(validateVat(draftWith({ amount: "x", rate: "" }))).sort()).toEqual([
      "amount",
      "rate",
    ]);
    expect(validateVat(draftWith({ amount: "1", rate: "101" })).rate).toBeTruthy();
  });

  it("recognises the standard rate however it's typed", () => {
    expect(isStandardRate(draftWith({ rate: "7.50" }))).toBe(true);
    expect(isStandardRate(draftWith({ rate: "10" }))).toBe(false);
  });
});

describe("vatSummary", () => {
  it("writes a breakdown", () => {
    expect(vatSummary(computeVat(draftWith({ amount: "10,000" }))!, "NGN")).toBe(
      [
        "Price before VAT: ₦10,000.00",
        "VAT at 7.5%: ₦750.00",
        "Price with VAT: ₦10,750.00",
      ].join("\n"),
    );
  });
});
