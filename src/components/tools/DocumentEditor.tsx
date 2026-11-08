import { useState } from "react";
import { Copy, DownloadSimple, Hash, Printer } from "@phosphor-icons/react";
import { DRAFT_NOTICE } from "../../data/tools";
import { useDraft } from "../../hooks/useDraft";
import { useFieldErrors } from "../../hooks/useFieldErrors";
import {
  buildDocumentView,
  computeTotals,
  createDraft,
  documentSummary,
  isPristine,
  sampleDraft,
  validateDocument,
  type DocumentDraft,
  type DocumentKind,
  type PartyDraft,
} from "../../lib/tools/document";
import { copyText } from "../../lib/tools/files";
import { CURRENCIES, formatMoney, type CurrencyCode } from "../../lib/tools/money";
import DocumentPaper from "./DocumentPaper";
import LineItems from "./LineItems";
import LogoField from "./LogoField";
import ToolActions, { type ToolAction } from "./ToolActions";
import Workbench, { type WorkbenchMode } from "./Workbench";
import {
  FieldGroup,
  FieldRow,
  Segmented,
  SelectField,
  TextAreaField,
  TextField,
} from "./fields";

const CURRENCY_OPTIONS = CURRENCIES.map(({ code, label }) => ({ value: code, label }));

const DISCOUNT_TYPES = [
  { value: "percent", label: "Percent" },
  { value: "amount", label: "Amount" },
] as const;

const copyOutcome = (copied: boolean, what: string) => {
  if (!copied) throw new Error(`We couldn't reach your clipboard. Copy the ${what} from the preview instead.`);
  return `${what[0].toUpperCase()}${what.slice(1)} copied.`;
};

/** Moves focus to the first problem, once the form has re-rendered to show it. */
const focusFirstError = () =>
  window.setTimeout(() => {
    document.querySelector<HTMLElement>('#workbench [aria-invalid="true"]')?.focus();
  }, 50);

/** The whole work area for an invoice or a quotation; they differ only in detail. */
export default function DocumentEditor({ kind }: { kind: DocumentKind }) {
  const isInvoice = kind === "invoice";
  const noun = isInvoice ? "invoice" : "quotation";

  const [draft, setDraft] = useDraft<DocumentDraft>(`duowork-tools:${kind}:v1`, () => createDraft(kind));
  const [mode, setMode] = useState<WorkbenchMode>("edit");

  const errors = validateDocument(draft);
  const { errorFor, touch, attempt, reset } = useFieldErrors(errors);

  const pristine = isPristine(draft);
  const view = buildDocumentView(pristine ? sampleDraft(kind) : draft);
  const realView = buildDocumentView(draft);

  const patch = (changes: Partial<DocumentDraft>) =>
    setDraft((current) => ({ ...current, ...changes }));

  const patchParty = (key: "business" | "customer", changes: Partial<PartyDraft>) =>
    setDraft((current) => ({ ...current, [key]: { ...current[key], ...changes } }));

  /** Every export goes through here, so nothing unfinished can leave the page. */
  const requireValid = () => {
    const count = Object.keys(errors).length;
    if (count === 0) return;
    attempt();
    setMode("edit");
    focusFirstError();
    throw new Error(
      `${count === 1 ? "One thing needs" : `${count} things need`} fixing before your ${noun} is ready.`,
    );
  };

  const secondary: ToolAction[] = [
    {
      label: "Print",
      icon: Printer,
      run: () => {
        requireValid();
        window.print();
        return "";
      },
    },
    {
      label: "Copy summary",
      icon: Copy,
      run: async () => {
        requireValid();
        return copyOutcome(await copyText(documentSummary(realView)), "summary");
      },
    },
  ];

  if (isInvoice) {
    secondary.push({
      label: "Copy payment reference",
      icon: Hash,
      run: async () => {
        requireValid();
        return copyOutcome(await copyText(realView.number), "payment reference");
      },
    });
  }

  const totals = computeTotals(draft);

  const form = (
    <form
      noValidate
      onSubmit={(event) => event.preventDefault()}
      className="grid gap-8"
    >
      <p className="m-0 text-[13px] text-paper-70">{DRAFT_NOTICE}</p>

      <FieldGroup legend="Your business">
        <TextField
          label="Business name"
          value={draft.business.name}
          placeholder="Harmattan Studio"
          autoComplete="organization"
          onChange={(name) => patchParty("business", { name })}
          onBlur={() => touch("business.name")}
          error={errorFor("business.name")}
        />
        <FieldRow>
          <TextField
            label="Email"
            type="email"
            optional
            value={draft.business.email}
            autoComplete="email"
            placeholder="hello@yourbusiness.com"
            onChange={(email) => patchParty("business", { email })}
          />
          <TextField
            label="Phone"
            type="tel"
            optional
            value={draft.business.phone}
            autoComplete="tel"
            placeholder="+234 800 000 0000"
            onChange={(phone) => patchParty("business", { phone })}
          />
        </FieldRow>
        <TextAreaField
          label="Address"
          optional
          rows={2}
          value={draft.business.address}
          placeholder="14 Sample Road, Yaba, Lagos"
          onChange={(address) => patchParty("business", { address })}
        />
        <LogoField value={draft.logo} onChange={(logo) => patch({ logo })} />
      </FieldGroup>

      <FieldGroup legend={isInvoice ? "Your client" : "Your customer"}>
        <TextField
          label="Name or company"
          value={draft.customer.name}
          placeholder="Palmgrove Foods Ltd"
          onChange={(name) => patchParty("customer", { name })}
          onBlur={() => touch("customer.name")}
          error={errorFor("customer.name")}
        />
        <FieldRow>
          <TextField
            label="Email"
            type="email"
            optional
            value={draft.customer.email}
            placeholder="accounts@client.com"
            onChange={(email) => patchParty("customer", { email })}
          />
          <TextField
            label="Phone"
            type="tel"
            optional
            value={draft.customer.phone}
            onChange={(phone) => patchParty("customer", { phone })}
          />
        </FieldRow>
        <TextAreaField
          label="Address"
          optional
          rows={2}
          value={draft.customer.address}
          onChange={(address) => patchParty("customer", { address })}
        />
      </FieldGroup>

      {!isInvoice && (
        <FieldGroup legend="What you're proposing">
          <TextField
            label="Project or service"
            optional
            value={draft.projectTitle}
            placeholder="Brand refresh for the Palmgrove range"
            onChange={(projectTitle) => patch({ projectTitle })}
          />
          <TextAreaField
            label="Short description"
            optional
            value={draft.projectDescription}
            placeholder="What's included, and what your customer ends up with."
            onChange={(projectDescription) => patch({ projectDescription })}
          />
        </FieldGroup>
      )}

      <FieldGroup legend={isInvoice ? "Invoice details" : "Quotation details"}>
        <FieldRow>
          <TextField
            label={isInvoice ? "Invoice number" : "Quotation number"}
            value={draft.number}
            onChange={(number) => patch({ number })}
            onBlur={() => touch("number")}
            error={errorFor("number")}
          />
          <SelectField
            label="Currency"
            value={draft.currency}
            options={CURRENCY_OPTIONS}
            onChange={(currency) => patch({ currency: currency as CurrencyCode })}
          />
        </FieldRow>
        <FieldRow>
          <TextField
            label="Issue date"
            type="date"
            value={draft.issueDate}
            onChange={(issueDate) => patch({ issueDate })}
            onBlur={() => touch("issueDate")}
            error={errorFor("issueDate")}
          />
          <TextField
            label={isInvoice ? "Due date" : "Valid until"}
            type="date"
            value={draft.endDate}
            onChange={(endDate) => patch({ endDate })}
            onBlur={() => touch("endDate")}
            error={errorFor("endDate")}
          />
        </FieldRow>
      </FieldGroup>

      <FieldGroup legend="What you're charging for">
        <LineItems
          lines={draft.lines}
          currency={draft.currency}
          onChange={(lines) => patch({ lines })}
          errorFor={errorFor}
          onBlurField={(key) => touch(String(key))}
        />
      </FieldGroup>

      <FieldGroup legend="Discount and tax">
        <div className="grid gap-1.5">
          <Segmented
            label="Discount type"
            value={draft.discountType}
            options={DISCOUNT_TYPES}
            onChange={(discountType) => patch({ discountType })}
            className="w-fit"
          />
        </div>
        <TextField
          label={draft.discountType === "percent" ? "Discount (%)" : "Discount amount"}
          optional
          inputMode="decimal"
          value={draft.discountValue}
          placeholder={draft.discountType === "percent" ? "5" : "10,000"}
          onChange={(discountValue) => patch({ discountValue })}
          onBlur={() => touch("discountValue")}
          error={errorFor("discountValue")}
        />
        <FieldRow>
          <TextField
            label="Tax name"
            value={draft.taxLabel}
            onChange={(taxLabel) => patch({ taxLabel })}
          />
          <TextField
            label="Tax rate (%)"
            optional
            inputMode="decimal"
            value={draft.taxRate}
            placeholder="0"
            hint="Enter the rate that applies to your business. Tax is worked out after any discount."
            onChange={(taxRate) => patch({ taxRate })}
            onBlur={() => touch("taxRate")}
            error={errorFor("taxRate")}
          />
        </FieldRow>
        <p className="m-0 flex flex-wrap items-baseline justify-between gap-3 border-t border-hairline-dark pt-4">
          <span className="text-sm text-paper-70">{isInvoice ? "Total due" : "Quotation total"}</span>
          <span className="font-title text-2xl font-semibold wrap-anywhere text-volt">
            {formatMoney(totals.total, draft.currency)}
          </span>
        </p>
      </FieldGroup>

      <FieldGroup legend={isInvoice ? "Payment and notes" : "Terms and notes"}>
        <TextAreaField
          label={isInvoice ? "How to pay" : "Payment terms"}
          optional
          value={draft.payment}
          placeholder={
            isInvoice
              ? "Bank name, account name and account number"
              : "50% to begin, the balance on delivery."
          }
          onChange={(payment) => patch({ payment })}
        />
        {!isInvoice && (
          <TextAreaField
            label="Terms and conditions"
            optional
            value={draft.terms}
            placeholder="What's included, how changes are handled and so on."
            onChange={(terms) => patch({ terms })}
          />
        )}
        <TextAreaField
          label="Notes"
          optional
          rows={2}
          value={draft.notes}
          placeholder="Thank you for your business."
          onChange={(notes) => patch({ notes })}
        />
      </FieldGroup>

      <button
        type="button"
        onClick={() => {
          setMode("preview");
          document.getElementById("workbench")?.scrollIntoView();
        }}
        className="inline-flex min-h-11 w-full cursor-pointer items-center justify-center rounded-full bg-volt text-[15px] font-medium text-carbon lg:hidden"
      >
        Preview your {noun}
      </button>
    </form>
  );

  return (
    <Workbench
      mode={mode}
      onModeChange={setMode}
      form={form}
      preview={<DocumentPaper view={view} />}
      sampleNote={
        pristine
          ? `This is a sample. Your ${noun} will replace it as you type.`
          : undefined
      }
      actions={
        <ToolActions
          primary={{
            label: "Download PDF",
            icon: DownloadSimple,
            busyLabel: "Preparing your PDF",
            run: async () => {
                requireValid();
                const { saveDocumentPdf } = await import("../../lib/tools/pdf/render");
                const notice = await saveDocumentPdf(realView);
                return `Your ${noun} is downloading. Check it over before you send it.${notice}`;
            },
          }}
          secondary={secondary}
          onClear={() => {
            setDraft(createDraft(kind));
            reset();
          }}
        />
      }
    />
  );
}
