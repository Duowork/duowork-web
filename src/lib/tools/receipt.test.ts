import { describe, expect, it } from "vitest";
import {
  buildReceiptView,
  createReceiptDraft,
  isReceiptPristine,
  receiptSummary,
  validateReceipt,
  type ReceiptDraft,
} from "./receipt";

function draftWith(overrides: Partial<ReceiptDraft> = {}): ReceiptDraft {
  return {
    ...createReceiptDraft(),
    number: "RCT-9",
    paymentDate: "2026-07-01",
    businessName: "Acme",
    customerName: "Ada",
    description: "Deposit",
    amountPaid: "25,000",
    ...overrides,
  };
}

describe("validateReceipt", () => {
  it("passes a complete receipt", () => {
    expect(validateReceipt(draftWith())).toEqual({});
  });

  it("requires the essentials", () => {
    const errors = validateReceipt(createReceiptDraft());
    expect(Object.keys(errors).sort()).toEqual([
      "amountPaid",
      "businessName",
      "customerName",
      "description",
    ]);
  });

  it("rejects a zero or malformed amount", () => {
    expect(validateReceipt(draftWith({ amountPaid: "0" })).amountPaid).toBeTruthy();
    expect(validateReceipt(draftWith({ amountPaid: "abc" })).amountPaid).toBeTruthy();
  });

  it("allows an empty balance but not a malformed one", () => {
    expect(validateReceipt(draftWith({ balance: "" })).balance).toBeUndefined();
    expect(validateReceipt(draftWith({ balance: "0" })).balance).toBeUndefined();
    expect(validateReceipt(draftWith({ balance: "x" })).balance).toBeTruthy();
  });
});

describe("buildReceiptView", () => {
  it("includes the reference and balance only when given", () => {
    const plain = buildReceiptView(draftWith());
    expect(plain.meta.map((row) => row.label)).toEqual(["Date paid", "Paid by"]);
    expect(plain.balance).toBeNull();

    const full = buildReceiptView(draftWith({ reference: "T1", balance: "500" }));
    expect(full.meta[2]).toEqual({ label: "Reference", value: "T1" });
    expect(full.balance).toBe("₦500.00");
  });

  it("shows a settled balance of zero when one is entered", () => {
    expect(buildReceiptView(draftWith({ balance: "0" })).balance).toBe("₦0.00");
  });
});

describe("receiptSummary", () => {
  it("writes a confirmation ready to send", () => {
    expect(receiptSummary(buildReceiptView(draftWith({ balance: "500" })))).toBe(
      [
        "Payment received: ₦25,000.00",
        "Received by: Acme",
        "From: Ada",
        "For: Deposit",
        "Date paid: 1 July 2026",
        "Paid by: Bank transfer",
        "Receipt number: RCT-9",
        "Balance outstanding: ₦500.00",
      ].join("\n"),
    );
  });
});

describe("isReceiptPristine", () => {
  it("ignores defaults and the layout choice", () => {
    expect(isReceiptPristine({ ...createReceiptDraft(), layout: "compact" })).toBe(true);
    expect(isReceiptPristine({ ...createReceiptDraft(), amountPaid: "1" })).toBe(false);
  });
});
