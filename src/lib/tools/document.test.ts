import { describe, expect, it } from "vitest";
import { addDaysISO, formatDate, isValidISODate } from "./dates";
import {
  buildDocumentView,
  computeTotals,
  createDraft,
  documentSummary,
  isPristine,
  newLine,
  pdfFileName,
  sampleDraft,
  validateDocument,
  type DocumentDraft,
} from "./document";

function draftWith(overrides: Partial<DocumentDraft> = {}): DocumentDraft {
  return {
    ...createDraft("invoice"),
    business: { name: "Acme", email: "", phone: "", address: "" },
    customer: { name: "Client", email: "", phone: "", address: "" },
    issueDate: "2026-07-01",
    endDate: "2026-07-15",
    lines: [{ id: "a", description: "Design", quantity: "2", unitPrice: "1,000" }],
    ...overrides,
  };
}

describe("computeTotals", () => {
  it("adds lines with no discount or tax", () => {
    const totals = computeTotals(
      draftWith({
        lines: [
          { id: "a", description: "A", quantity: "2", unitPrice: "1,000" },
          { id: "b", description: "B", quantity: "1.5", unitPrice: "200.50" },
        ],
      }),
    );
    // 2,000.00 + 300.75
    expect(totals).toEqual({ subtotal: 230075, discount: 0, tax: 0, total: 230075 });
  });

  it("applies a percentage discount, then tax on what's left", () => {
    const totals = computeTotals(
      draftWith({
        lines: [{ id: "a", description: "A", quantity: "1", unitPrice: "100,000" }],
        discountValue: "10",
        taxRate: "7.5",
      }),
    );
    // 100,000 - 10,000 = 90,000; 7.5% of that = 6,750
    expect(totals).toEqual({
      subtotal: 10000000,
      discount: 1000000,
      tax: 675000,
      total: 9675000,
    });
  });

  it("applies a fixed discount", () => {
    const totals = computeTotals(
      draftWith({ discountType: "amount", discountValue: "500" }),
    );
    expect(totals.discount).toBe(50000);
    expect(totals.total).toBe(150000);
  });

  it("never lets a discount push the total below zero", () => {
    const totals = computeTotals(
      draftWith({ discountType: "amount", discountValue: "999,999", taxRate: "10" }),
    );
    expect(totals.total).toBe(0);
    expect(totals.tax).toBe(0);
  });

  it("treats half-typed numbers as zero rather than failing", () => {
    const totals = computeTotals(
      draftWith({
        lines: [{ id: "a", description: "A", quantity: "x", unitPrice: "abc" }],
        taxRate: "ten",
      }),
    );
    expect(totals.total).toBe(0);
  });
});

describe("validateDocument", () => {
  it("passes a complete invoice", () => {
    expect(validateDocument(draftWith())).toEqual({});
  });

  it("explains what's missing on an empty draft", () => {
    const errors = validateDocument(createDraft("invoice"));
    expect(errors["business.name"]).toBeTruthy();
    expect(errors["customer.name"]).toBeTruthy();
    expect(errors.lines).toBeTruthy();
  });

  it("ignores untouched rows but checks started ones", () => {
    const blank = newLine();
    const started = { ...newLine(), unitPrice: "abc", quantity: "0" };
    const errors = validateDocument(
      draftWith({
        lines: [{ id: "a", description: "A", quantity: "1", unitPrice: "1" }, blank, started],
      }),
    );
    expect(errors[`lines.${blank.id}.description`]).toBeUndefined();
    expect(errors[`lines.${started.id}.description`]).toBeTruthy();
    expect(errors[`lines.${started.id}.quantity`]).toBeTruthy();
    expect(errors[`lines.${started.id}.unitPrice`]).toBeTruthy();
  });

  it("rejects a due date before the issue date", () => {
    const errors = validateDocument(draftWith({ endDate: "2026-06-30" }));
    expect(errors.endDate).toMatch(/before the issue date/);
  });

  it("uses quotation wording", () => {
    const errors = validateDocument({
      ...draftWith(),
      kind: "quotation",
      endDate: "2026-06-30",
    });
    expect(errors.endDate).toMatch(/expiry date/);
  });

  it("rejects out-of-range discounts and rates", () => {
    expect(validateDocument(draftWith({ discountValue: "101" })).discountValue).toBeTruthy();
    expect(
      validateDocument(draftWith({ discountType: "amount", discountValue: "2,001" })).discountValue,
    ).toBeTruthy();
    expect(validateDocument(draftWith({ taxRate: "-1" })).taxRate).toBeTruthy();
    expect(validateDocument(draftWith({ taxRate: "100.5" })).taxRate).toBeTruthy();
  });
});

describe("buildDocumentView", () => {
  it("shows only the totals that apply", () => {
    const plain = buildDocumentView(draftWith());
    expect(plain.totals.map((row) => row.label)).toEqual(["Subtotal"]);

    const full = buildDocumentView(draftWith({ discountValue: "10", taxRate: "7.5" }));
    expect(full.totals.map((row) => row.label)).toEqual([
      "Subtotal",
      "Discount (10%)",
      "VAT (7.5%)",
    ]);
    expect(full.totals[1].value).toBe("−₦200.00");
    expect(full.grandTotal).toEqual({ label: "Total due", value: "₦1,935.00" });
  });

  it("leaves blank rows out", () => {
    const view = buildDocumentView(
      draftWith({ lines: [...draftWith().lines, newLine()] }),
    );
    expect(view.lines).toHaveLength(1);
  });

  it("frames a quotation differently from an invoice", () => {
    const view = buildDocumentView({
      ...draftWith(),
      kind: "quotation",
      projectTitle: "Brand refresh",
      payment: "50% upfront",
      terms: "Two rounds of changes",
    });
    expect(view.title).toBe("Quotation");
    expect(view.to.label).toBe("Prepared for");
    expect(view.meta[1].label).toBe("Valid until");
    expect(view.project?.title).toBe("Brand refresh");
    expect(view.footnote).toMatch(/not a request for payment/);
    expect(view.blocks.map((block) => block.heading)).toEqual([
      "Payment terms",
      "Terms and conditions",
    ]);
  });

  it("gives every sample a total that adds up", () => {
    // 3 × 120,000 + 6 × 15,000 = 450,000; less 5% = 427,500; plus 7.5% = 459,562.50
    expect(buildDocumentView(sampleDraft("invoice")).grandTotal.value).toBe("₦459,562.50");
  });
});

describe("isPristine", () => {
  it("is true for a new draft despite its default number and dates", () => {
    expect(isPristine(createDraft("invoice"))).toBe(true);
  });

  it("becomes false once anything is typed", () => {
    const draft = createDraft("invoice");
    expect(isPristine({ ...draft, notes: "Hi" })).toBe(false);
    expect(
      isPristine({ ...draft, customer: { ...draft.customer, name: "A" } }),
    ).toBe(false);
    expect(
      isPristine({ ...draft, lines: [{ ...draft.lines[0], unitPrice: "5" }] }),
    ).toBe(false);
  });
});

describe("output helpers", () => {
  it("writes a summary ready for a message", () => {
    const summary = documentSummary(
      buildDocumentView(draftWith({ number: "INV-7", payment: "Bank: 123" })),
    );
    expect(summary).toBe(
      [
        "Invoice INV-7",
        "From: Acme",
        "To: Client",
        "Issued: 1 July 2026",
        "Due: 15 July 2026",
        "Total due: ₦2,000.00",
        "How to pay",
        "Bank: 123",
      ].join("\n"),
    );
  });

  it("makes a safe file name", () => {
    expect(pdfFileName("Invoice", "INV-0001")).toBe("invoice-INV-0001.pdf");
    expect(pdfFileName("Invoice", "A/B 12?")).toBe("invoice-A-B-12.pdf");
    expect(pdfFileName("Invoice", "///")).toBe("invoice.pdf");
  });
});

describe("dates", () => {
  it("spells dates out unambiguously", () => {
    expect(formatDate("2026-03-04")).toBe("4 March 2026");
    expect(formatDate("nonsense")).toBe("");
  });

  it("adds days across month and year ends", () => {
    expect(addDaysISO("2026-01-25", 14)).toBe("2026-02-08");
    expect(addDaysISO("2026-12-25", 30)).toBe("2027-01-24");
  });

  it("rejects impossible dates", () => {
    expect(isValidISODate("2026-02-30")).toBe(false);
    expect(isValidISODate("2028-02-29")).toBe(true);
  });
});
