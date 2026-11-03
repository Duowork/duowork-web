import { addDaysISO, formatDate, isValidISODate, todayISO } from "./dates";
import {
  DEFAULT_CURRENCY,
  formatMoney,
  formatScaled,
  lineTotal,
  parseAmount,
  parsePercent,
  parseQuantity,
  percentOf,
  type CurrencyCode,
} from "./money";

/**
 * The shared model behind the invoice and quotation generators. A draft holds
 * what was typed, as strings. `buildDocumentView` turns it into the one view
 * that both the on-screen preview and the PDF render, which is what keeps the
 * two from drifting apart.
 */

export type DocumentKind = "invoice" | "quotation";

export type LineDraft = {
  id: string;
  description: string;
  quantity: string;
  unitPrice: string;
};

export type PartyDraft = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

export type DocumentDraft = {
  kind: DocumentKind;
  currency: CurrencyCode;
  number: string;
  issueDate: string;
  /** The due date on an invoice, the expiry date on a quotation. */
  endDate: string;
  business: PartyDraft;
  logo: string | null;
  customer: PartyDraft;
  projectTitle: string;
  projectDescription: string;
  lines: LineDraft[];
  discountType: "percent" | "amount";
  discountValue: string;
  taxLabel: string;
  taxRate: string;
  /** Payment instructions on an invoice, payment terms on a quotation. */
  payment: string;
  terms: string;
  notes: string;
};

export type Row = { label: string; value: string };

export type DocumentView = {
  kind: DocumentKind;
  title: string;
  number: string;
  logo: string | null;
  from: { name: string; lines: string[] };
  to: { label: string; name: string; lines: string[] };
  meta: Row[];
  project: { title: string; description: string } | null;
  lines: {
    id: string;
    description: string;
    quantity: string;
    unitPrice: string;
    total: string;
  }[];
  totals: Row[];
  grandTotal: Row;
  blocks: { heading: string; body: string }[];
  footnote: string | null;
};

export type Totals = {
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
};

export type DocumentErrors = Record<string, string>;

const NUMBER_PREFIX: Record<DocumentKind, string> = {
  invoice: "INV",
  quotation: "QUO",
};

const END_DATE_OFFSET: Record<DocumentKind, number> = {
  invoice: 14,
  quotation: 30,
};

let lineCounter = 0;

export function newLine(): LineDraft {
  lineCounter += 1;
  return {
    id: `line-${Date.now()}-${lineCounter}`,
    description: "",
    quantity: "1",
    unitPrice: "",
  };
}

const emptyParty = (): PartyDraft => ({
  name: "",
  email: "",
  phone: "",
  address: "",
});

export function createDraft(kind: DocumentKind): DocumentDraft {
  const issueDate = todayISO();
  return {
    kind,
    currency: DEFAULT_CURRENCY,
    number: `${NUMBER_PREFIX[kind]}-0001`,
    issueDate,
    endDate: addDaysISO(issueDate, END_DATE_OFFSET[kind]),
    business: emptyParty(),
    logo: null,
    customer: emptyParty(),
    projectTitle: "",
    projectDescription: "",
    lines: [newLine()],
    discountType: "percent",
    discountValue: "",
    taxLabel: "VAT",
    taxRate: "",
    payment: "",
    terms: "",
    notes: "",
  };
}

const hasText = (value: string) => value.trim() !== "";

const isBlankLine = (line: LineDraft) =>
  !hasText(line.description) && !hasText(line.unitPrice);

const partyHasText = (party: PartyDraft) =>
  Object.values(party).some(hasText);

/** True until the visitor has typed something of their own. */
export function isPristine(draft: DocumentDraft): boolean {
  return (
    !partyHasText(draft.business) &&
    !partyHasText(draft.customer) &&
    !draft.logo &&
    draft.lines.every(isBlankLine) &&
    ![
      draft.projectTitle,
      draft.projectDescription,
      draft.discountValue,
      draft.taxRate,
      draft.payment,
      draft.terms,
      draft.notes,
    ].some(hasText)
  );
}

export function computeTotals(draft: DocumentDraft): Totals {
  const subtotal = draft.lines.reduce((sum, line) => {
    const quantity = parseQuantity(line.quantity) ?? 0;
    const unit = parseAmount(line.unitPrice) ?? 0;
    return sum + lineTotal(quantity, unit);
  }, 0);

  const rawDiscount =
    draft.discountType === "percent"
      ? percentOf(subtotal, parsePercent(draft.discountValue) ?? 0)
      : (parseAmount(draft.discountValue) ?? 0);
  const discount = Math.min(rawDiscount, subtotal);

  // Tax is charged on the price after discount.
  const tax = percentOf(subtotal - discount, parsePercent(draft.taxRate) ?? 0);

  return { subtotal, discount, tax, total: subtotal - discount + tax };
}

const partyLines = (party: PartyDraft) =>
  [party.address, party.email, party.phone].flatMap((value) =>
    hasText(value) ? value.trim().split("\n") : [],
  );

const rateLabel = (rate: string) => formatScaled(parsePercent(rate) ?? 0);

export function buildDocumentView(draft: DocumentDraft): DocumentView {
  const isInvoice = draft.kind === "invoice";
  const money = (minor: number) => formatMoney(minor, draft.currency);
  const totals = computeTotals(draft);

  const rows: Row[] = [{ label: "Subtotal", value: money(totals.subtotal) }];

  if (totals.discount > 0) {
    rows.push({
      label:
        draft.discountType === "percent"
          ? `Discount (${rateLabel(draft.discountValue)}%)`
          : "Discount",
      value: `−${money(totals.discount)}`,
    });
  }

  if ((parsePercent(draft.taxRate) ?? 0) > 0) {
    rows.push({
      label: `${draft.taxLabel.trim() || "Tax"} (${rateLabel(draft.taxRate)}%)`,
      value: money(totals.tax),
    });
  }

  const blocks = [
    { heading: isInvoice ? "How to pay" : "Payment terms", body: draft.payment },
    { heading: "Terms and conditions", body: draft.terms },
    { heading: "Notes", body: draft.notes },
  ].filter((block) => hasText(block.body));

  return {
    kind: draft.kind,
    title: isInvoice ? "Invoice" : "Quotation",
    number: draft.number.trim(),
    logo: draft.logo,
    from: {
      name: draft.business.name.trim(),
      lines: partyLines(draft.business),
    },
    to: {
      label: isInvoice ? "Bill to" : "Prepared for",
      name: draft.customer.name.trim(),
      lines: partyLines(draft.customer),
    },
    meta: [
      { label: "Issued", value: formatDate(draft.issueDate) },
      {
        label: isInvoice ? "Due" : "Valid until",
        value: formatDate(draft.endDate),
      },
    ],
    project:
      !isInvoice &&
      (hasText(draft.projectTitle) || hasText(draft.projectDescription))
        ? {
            title: draft.projectTitle.trim(),
            description: draft.projectDescription.trim(),
          }
        : null,
    lines: draft.lines
      .filter((line) => !isBlankLine(line))
      .map((line) => {
        const quantity = parseQuantity(line.quantity) ?? 0;
        const unit = parseAmount(line.unitPrice) ?? 0;
        return {
          id: line.id,
          description: line.description.trim(),
          quantity: formatScaled(quantity),
          unitPrice: money(unit),
          total: money(lineTotal(quantity, unit)),
        };
      }),
    totals: rows,
    grandTotal: {
      label: isInvoice ? "Total due" : "Quotation total",
      value: money(totals.total),
    },
    blocks,
    footnote: isInvoice
      ? null
      : "This is a quotation, not a request for payment. An invoice follows once the work is agreed.",
  };
}

export function validateDocument(draft: DocumentDraft): DocumentErrors {
  const errors: DocumentErrors = {};
  const isInvoice = draft.kind === "invoice";

  if (!hasText(draft.business.name)) {
    errors["business.name"] = "Add your business name so your client knows who this is from.";
  }
  if (!hasText(draft.customer.name)) {
    errors["customer.name"] = "Add the name of the person or company this is for.";
  }
  if (!hasText(draft.number)) {
    errors.number = `Give this ${isInvoice ? "invoice" : "quotation"} a number so you can both refer to it.`;
  }
  if (!isValidISODate(draft.issueDate)) {
    errors.issueDate = "Choose the date this was issued.";
  }

  const endLabel = isInvoice ? "due date" : "expiry date";
  if (!isValidISODate(draft.endDate)) {
    errors.endDate = `Choose a ${endLabel}.`;
  } else if (isValidISODate(draft.issueDate) && draft.endDate < draft.issueDate) {
    errors.endDate = `The ${endLabel} can't be before the issue date.`;
  }

  const filled = draft.lines.filter((line) => !isBlankLine(line));
  if (filled.length === 0) {
    errors.lines = "Add at least one item with a description and a price.";
  }

  for (const line of filled) {
    if (!hasText(line.description)) {
      errors[`lines.${line.id}.description`] = "Describe what this charge is for.";
    }
    const quantity = parseQuantity(line.quantity);
    if (quantity === null || quantity === 0) {
      errors[`lines.${line.id}.quantity`] = "Enter a quantity above zero.";
    }
    if (parseAmount(line.unitPrice) === null) {
      errors[`lines.${line.id}.unitPrice`] = "Enter a price using numbers only, like 25,000.";
    }
  }

  if (hasText(draft.discountValue)) {
    if (draft.discountType === "percent") {
      const percent = parsePercent(draft.discountValue);
      if (percent === null || percent > 100000) {
        errors.discountValue = "Enter a percentage between 0 and 100.";
      }
    } else {
      const amount = parseAmount(draft.discountValue);
      if (amount === null) {
        errors.discountValue = "Enter the discount using numbers only.";
      } else if (amount > computeTotals(draft).subtotal) {
        errors.discountValue = "The discount can't be larger than the subtotal.";
      }
    }
  }

  if (hasText(draft.taxRate)) {
    const rate = parsePercent(draft.taxRate);
    if (rate === null || rate > 100000) {
      errors.taxRate = "Enter a rate between 0 and 100.";
    }
  }

  return errors;
}

/** The plain-text version for pasting into a message. */
export function documentSummary(view: DocumentView): string {
  const lines = [
    `${view.title} ${view.number}`,
    view.from.name && `From: ${view.from.name}`,
    view.to.name && `To: ${view.to.name}`,
    ...view.meta.filter((row) => row.value).map((row) => `${row.label}: ${row.value}`),
    `${view.grandTotal.label}: ${view.grandTotal.value}`,
  ];
  const payment = view.blocks.find((block) => block.heading === "How to pay");
  if (payment) lines.push("", payment.heading, payment.body.trim());
  return lines.filter((line) => line !== "").join("\n");
}

export function pdfFileName(title: string, number: string): string {
  const safe = number.replace(/[^\w-]+/g, "-").replace(/^-+|-+$/g, "");
  return `${title.toLowerCase()}${safe ? `-${safe}` : ""}.pdf`;
}

/** What first-time visitors see in the preview, before they've typed anything. */
export function sampleDraft(kind: DocumentKind): DocumentDraft {
  const draft = createDraft(kind);
  const isInvoice = kind === "invoice";

  return {
    ...draft,
    business: {
      name: "Harmattan Studio",
      email: "hello@harmattan.example",
      phone: "+234 800 000 0000",
      address: "14 Sample Road\nYaba, Lagos",
    },
    customer: {
      name: "Palmgrove Foods Ltd",
      email: "accounts@palmgrove.example",
      phone: "",
      address: "2 Example Close\nIkeja, Lagos",
    },
    projectTitle: isInvoice ? "" : "Brand refresh for the Palmgrove range",
    projectDescription: isInvoice
      ? ""
      : "New packaging artwork for three products, ready for the printer.",
    lines: [
      { id: "sample-1", description: "Packaging design", quantity: "3", unitPrice: "120,000" },
      { id: "sample-2", description: "Print supervision (hours)", quantity: "6", unitPrice: "15,000" },
    ],
    discountValue: "5",
    taxRate: "7.5",
    payment: isInvoice
      ? "Bank transfer to Harmattan Studio\nSample Bank, 0000000000"
      : "50% to begin, the balance on delivery.",
    terms: isInvoice ? "" : "Includes two rounds of changes. Further changes are charged by the hour.",
  };
}
