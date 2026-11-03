import { formatDate, isValidISODate, todayISO } from "./dates";
import {
  DEFAULT_CURRENCY,
  formatMoney,
  parseAmount,
  type CurrencyCode,
} from "./money";
import type { Row } from "./document";

/** The receipt generator's model. See document.ts for how the layers fit. */

export const PAYMENT_METHODS = [
  "Bank transfer",
  "Cash",
  "POS",
  "Card",
  "Mobile money",
  "Cheque",
  "Other",
] as const;

export type ReceiptLayout = "standard" | "compact";

export type ReceiptDraft = {
  layout: ReceiptLayout;
  currency: CurrencyCode;
  number: string;
  paymentDate: string;
  method: string;
  reference: string;
  businessName: string;
  businessContact: string;
  logo: string | null;
  customerName: string;
  customerContact: string;
  description: string;
  amountPaid: string;
  balance: string;
  notes: string;
};

export type ReceiptView = {
  layout: ReceiptLayout;
  number: string;
  logo: string | null;
  from: { name: string; lines: string[] };
  receivedFrom: { name: string; lines: string[] };
  meta: Row[];
  description: string;
  amountPaid: string;
  balance: string | null;
  notes: string;
};

export type ReceiptErrors = Record<string, string>;

export function createReceiptDraft(): ReceiptDraft {
  return {
    layout: "standard",
    currency: DEFAULT_CURRENCY,
    number: "RCT-0001",
    paymentDate: todayISO(),
    method: PAYMENT_METHODS[0],
    reference: "",
    businessName: "",
    businessContact: "",
    logo: null,
    customerName: "",
    customerContact: "",
    description: "",
    amountPaid: "",
    balance: "",
    notes: "",
  };
}

const hasText = (value: string) => value.trim() !== "";

const splitLines = (value: string) =>
  hasText(value) ? value.trim().split("\n") : [];

export function isReceiptPristine(draft: ReceiptDraft): boolean {
  return (
    !draft.logo &&
    ![
      draft.reference,
      draft.businessName,
      draft.businessContact,
      draft.customerName,
      draft.customerContact,
      draft.description,
      draft.amountPaid,
      draft.balance,
      draft.notes,
    ].some(hasText)
  );
}

export function buildReceiptView(draft: ReceiptDraft): ReceiptView {
  const money = (minor: number) => formatMoney(minor, draft.currency);
  const balance = hasText(draft.balance) ? parseAmount(draft.balance) : null;

  const meta: Row[] = [
    { label: "Date paid", value: formatDate(draft.paymentDate) },
    { label: "Paid by", value: draft.method },
  ];
  if (hasText(draft.reference)) {
    meta.push({ label: "Reference", value: draft.reference.trim() });
  }

  return {
    layout: draft.layout,
    number: draft.number.trim(),
    logo: draft.logo,
    from: {
      name: draft.businessName.trim(),
      lines: splitLines(draft.businessContact),
    },
    receivedFrom: {
      name: draft.customerName.trim(),
      lines: splitLines(draft.customerContact),
    },
    meta,
    description: draft.description.trim(),
    amountPaid: money(parseAmount(draft.amountPaid) ?? 0),
    balance: balance === null ? null : money(balance),
    notes: draft.notes.trim(),
  };
}

export function validateReceipt(draft: ReceiptDraft): ReceiptErrors {
  const errors: ReceiptErrors = {};

  if (!hasText(draft.businessName)) {
    errors.businessName = "Add your business name so the receipt shows who was paid.";
  }
  if (!hasText(draft.customerName)) {
    errors.customerName = "Add the name of the person who paid.";
  }
  if (!hasText(draft.number)) {
    errors.number = "Give this receipt a number so you can both refer to it.";
  }
  if (!isValidISODate(draft.paymentDate)) {
    errors.paymentDate = "Choose the date the payment was made.";
  }
  if (!hasText(draft.description)) {
    errors.description = "Say what the payment was for.";
  }

  const paid = parseAmount(draft.amountPaid);
  if (paid === null || paid === 0) {
    errors.amountPaid = "Enter the amount paid using numbers only, like 25,000.";
  }
  if (hasText(draft.balance) && parseAmount(draft.balance) === null) {
    errors.balance = "Enter the balance using numbers only, or leave it empty.";
  }

  return errors;
}

/** The plain-text confirmation for copying or sending on WhatsApp. */
export function receiptSummary(view: ReceiptView): string {
  const lines = [
    `Payment received: ${view.amountPaid}`,
    view.from.name && `Received by: ${view.from.name}`,
    view.receivedFrom.name && `From: ${view.receivedFrom.name}`,
    view.description && `For: ${view.description}`,
    ...view.meta.map((row) => `${row.label}: ${row.value}`),
    `Receipt number: ${view.number}`,
    view.balance && `Balance outstanding: ${view.balance}`,
  ];
  return lines.filter(Boolean).join("\n");
}

export function sampleReceiptDraft(layout: ReceiptLayout): ReceiptDraft {
  return {
    ...createReceiptDraft(),
    layout,
    reference: "TRF-000000",
    businessName: "Harmattan Studio",
    businessContact: "14 Sample Road, Yaba, Lagos\nhello@harmattan.example",
    customerName: "Palmgrove Foods Ltd",
    description: "First payment for packaging design",
    amountPaid: "193,800",
    balance: "193,800",
    notes: "Thank you for your business.",
  };
}
