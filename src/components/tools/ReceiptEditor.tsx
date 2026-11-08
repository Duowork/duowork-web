import { useState } from "react";
import { Copy, DownloadSimple, Printer, WhatsappLogo } from "@phosphor-icons/react";
import { DRAFT_NOTICE } from "../../data/tools";
import { useDraft } from "../../hooks/useDraft";
import { useFieldErrors } from "../../hooks/useFieldErrors";
import { copyText } from "../../lib/tools/files";
import { CURRENCIES, type CurrencyCode } from "../../lib/tools/money";
import {
  buildReceiptView,
  createReceiptDraft,
  isReceiptPristine,
  PAYMENT_METHODS,
  receiptSummary,
  sampleReceiptDraft,
  validateReceipt,
  type ReceiptDraft,
  type ReceiptLayout,
} from "../../lib/tools/receipt";
import LogoField from "./LogoField";
import ReceiptPaper from "./ReceiptPaper";
import ToolActions from "./ToolActions";
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
const METHOD_OPTIONS = PAYMENT_METHODS.map((method) => ({ value: method, label: method }));

const LAYOUTS: readonly { value: ReceiptLayout; label: string }[] = [
  { value: "standard", label: "Full page" },
  { value: "compact", label: "Compact" },
];

export default function ReceiptEditor() {
  const [draft, setDraft] = useDraft<ReceiptDraft>("duowork-tools:receipt:v1", createReceiptDraft);
  const [mode, setMode] = useState<WorkbenchMode>("edit");

  const errors = validateReceipt(draft);
  const { errorFor, touch, attempt, reset } = useFieldErrors(errors);

  const pristine = isReceiptPristine(draft);
  const view = buildReceiptView(pristine ? sampleReceiptDraft(draft.layout) : draft);
  const realView = buildReceiptView(draft);

  const patch = (changes: Partial<ReceiptDraft>) =>
    setDraft((current) => ({ ...current, ...changes }));

  const requireValid = () => {
    const count = Object.keys(errors).length;
    if (count === 0) return;
    attempt();
    setMode("edit");
    window.setTimeout(() => {
      document.querySelector<HTMLElement>('#workbench [aria-invalid="true"]')?.focus();
    }, 50);
    throw new Error(
      `${count === 1 ? "One thing needs" : `${count} things need`} fixing before your receipt is ready.`,
    );
  };

  const form = (
    <form noValidate onSubmit={(event) => event.preventDefault()} className="grid gap-8">
      <p className="m-0 text-[13px] text-paper-70">{DRAFT_NOTICE}</p>

      <FieldGroup legend="The payment">
        <FieldRow>
          <TextField
            label="Amount paid"
            inputMode="decimal"
            value={draft.amountPaid}
            placeholder="25,000"
            onChange={(amountPaid) => patch({ amountPaid })}
            onBlur={() => touch("amountPaid")}
            error={errorFor("amountPaid")}
          />
          <SelectField
            label="Currency"
            value={draft.currency}
            options={CURRENCY_OPTIONS}
            onChange={(currency) => patch({ currency: currency as CurrencyCode })}
          />
        </FieldRow>
        <TextField
          label="What it was for"
          value={draft.description}
          placeholder="First payment for packaging design"
          onChange={(description) => patch({ description })}
          onBlur={() => touch("description")}
          error={errorFor("description")}
        />
        <FieldRow>
          <SelectField
            label="Payment method"
            value={draft.method}
            options={METHOD_OPTIONS}
            onChange={(method) => patch({ method })}
          />
          <TextField
            label="Date paid"
            type="date"
            value={draft.paymentDate}
            onChange={(paymentDate) => patch({ paymentDate })}
            onBlur={() => touch("paymentDate")}
            error={errorFor("paymentDate")}
          />
        </FieldRow>
        <FieldRow>
          <TextField
            label="Transaction reference"
            optional
            value={draft.reference}
            placeholder="From the bank alert"
            onChange={(reference) => patch({ reference })}
          />
          <TextField
            label="Balance outstanding"
            optional
            inputMode="decimal"
            value={draft.balance}
            placeholder="0"
            onChange={(balance) => patch({ balance })}
            onBlur={() => touch("balance")}
            error={errorFor("balance")}
          />
        </FieldRow>
      </FieldGroup>

      <FieldGroup legend="Who paid">
        <TextField
          label="Name or company"
          value={draft.customerName}
          placeholder="Palmgrove Foods Ltd"
          onChange={(customerName) => patch({ customerName })}
          onBlur={() => touch("customerName")}
          error={errorFor("customerName")}
        />
        <TextField
          label="Contact details"
          optional
          value={draft.customerContact}
          placeholder="Phone or email"
          onChange={(customerContact) => patch({ customerContact })}
        />
      </FieldGroup>

      <FieldGroup legend="Your business">
        <TextField
          label="Business name"
          value={draft.businessName}
          placeholder="Harmattan Studio"
          autoComplete="organization"
          onChange={(businessName) => patch({ businessName })}
          onBlur={() => touch("businessName")}
          error={errorFor("businessName")}
        />
        <TextAreaField
          label="Address and contact details"
          optional
          rows={2}
          value={draft.businessContact}
          placeholder="14 Sample Road, Yaba, Lagos"
          onChange={(businessContact) => patch({ businessContact })}
        />
        <LogoField value={draft.logo} onChange={(logo) => patch({ logo })} />
      </FieldGroup>

      <FieldGroup legend="Receipt details">
        <TextField
          label="Receipt number"
          value={draft.number}
          onChange={(number) => patch({ number })}
          onBlur={() => touch("number")}
          error={errorFor("number")}
        />
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
        Preview your receipt
      </button>
    </form>
  );

  return (
    <Workbench
      mode={mode}
      onModeChange={setMode}
      form={form}
      sampleNote={
        pristine ? "This is a sample. Your receipt will replace it as you type." : undefined
      }
      preview={<ReceiptPaper view={view} />}
      actions={
        <div className="grid gap-4">
          <Segmented
            label="Receipt layout"
            value={draft.layout}
            options={LAYOUTS}
            onChange={(layout) => patch({ layout })}
            className="w-fit"
          />
          <ToolActions
            primary={{
              label: "Download PDF",
              icon: DownloadSimple,
              busyLabel: "Preparing your PDF",
              run: async () => {
                requireValid();
                const { saveReceiptPdf } = await import("../../lib/tools/pdf/render");
                const notice = await saveReceiptPdf(realView);
                return `Your receipt is downloading.${notice}`;
              },
            }}
            secondary={[
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
                label: "Copy confirmation",
                icon: Copy,
                run: async () => {
                  requireValid();
                  if (!(await copyText(receiptSummary(realView)))) {
                    throw new Error("We couldn't reach your clipboard. Try the WhatsApp button instead.");
                  }
                  return "Payment confirmation copied.";
                },
              },
              {
                label: "Send on WhatsApp",
                icon: WhatsappLogo,
                run: () => {
                  requireValid();
                  window.open(
                    `https://wa.me/?text=${encodeURIComponent(receiptSummary(realView))}`,
                    "_blank",
                    "noopener,noreferrer",
                  );
                  return "Opening WhatsApp with your confirmation. Nothing is sent until you press send.";
                },
              },
            ]}
            onClear={() => {
              setDraft(createReceiptDraft());
              reset();
            }}
          />
        </div>
      }
    />
  );
}
