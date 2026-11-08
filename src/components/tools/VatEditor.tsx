import { ArrowCounterClockwise, Copy, Printer } from "@phosphor-icons/react";
import { NIGERIA_VAT, VAT_DISCLAIMER, VAT_MODES } from "../../data/tool-notes";
import { DRAFT_NOTICE } from "../../data/tools";
import { useDraft } from "../../hooks/useDraft";
import { useFieldErrors } from "../../hooks/useFieldErrors";
import { copyText } from "../../lib/tools/files";
import { CURRENCIES, formatMoney, formatScaled, type CurrencyCode } from "../../lib/tools/money";
import {
  computeVat,
  createVatDraft,
  isStandardRate,
  SAMPLE_VAT_AMOUNT,
  validateVat,
  vatSummary,
  type VatDraft,
  type VatMode,
  type VatResult,
} from "../../lib/tools/vat";
import DuoworkLockup from "./DuoworkLockup";
import ToolActions from "./ToolActions";
import Workbench from "./Workbench";
import { FieldGroup, FieldRow, Segmented, SelectField, TextField } from "./fields";

const CURRENCY_OPTIONS = CURRENCIES.map(({ code, label }) => ({ value: code, label }));

const MODE_OPTIONS: readonly { value: VatMode; label: string }[] = [
  { value: "exclusive", label: VAT_MODES.exclusive.label },
  { value: "inclusive", label: VAT_MODES.inclusive.label },
];

const LABEL = "text-[11px] font-medium tracking-[0.02em] text-ink-60";

function VatPanel({ result, draft }: { result: VatResult; draft: VatDraft }) {
  const money = (minor: number) => formatMoney(minor, draft.currency);
  const rate = `${formatScaled(result.rate)}%`;
  const headline = draft.mode === "exclusive" ? result.gross : result.net;

  const rows = [
    { label: "Price before VAT", value: money(result.net) },
    { label: `VAT at ${rate}`, value: money(result.vat) },
    { label: "Price with VAT", value: money(result.gross) },
  ];

  return (
    <article
      aria-label="Your results"
      className="dw-paper rounded-sm bg-white p-[clamp(20px,4vw,36px)] text-carbon shadow-mock"
    >
      <p className={`m-0 ${LABEL}`}>{VAT_MODES[draft.mode].resultLabel}</p>
      <p className="m-0 font-title text-[clamp(40px,6.5vw,60px)] leading-[1.05] font-semibold tracking-[-0.02em] wrap-anywhere">
        {money(headline)}
      </p>
      <p className="mt-2 mb-0 text-[15px] text-ink-80">
        {draft.mode === "exclusive"
          ? `${money(result.vat)} of that is VAT.`
          : `The ${money(result.gross)} price includes ${money(result.vat)} of VAT.`}
      </p>

      <dl className="mt-6 mb-0 border-t-2 border-carbon">
        {rows.map((row, index) => (
          <div
            key={row.label}
            className={`flex justify-between gap-4 py-3 ${
              index === rows.length - 1 ? "font-semibold" : "border-b border-hairline-strong"
            }`}
          >
            <dt className={index === rows.length - 1 ? "" : "text-ink-60"}>{row.label}</dt>
            <dd className="m-0 text-right font-title wrap-anywhere">{row.value}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-5 mb-0 text-[13px] text-ink-80">
        {isStandardRate(draft)
          ? `${rate} is ${NIGERIA_VAT.label}: ${NIGERIA_VAT.source}`
          : `Worked out at ${rate}, the rate you entered.`}
      </p>
      <p className="mt-3 mb-0 text-[13px] text-ink-60">{VAT_DISCLAIMER}</p>

      <div className="mt-8 flex justify-end">
        <DuoworkLockup className="w-[84px]" />
      </div>
    </article>
  );
}

export default function VatEditor() {
  const [draft, setDraft] = useDraft<VatDraft>("duowork-tools:vat:v1", createVatDraft);

  const errors = validateVat(draft);
  const { errorFor, touch, attempt, reset } = useFieldErrors(errors);

  const pristine = draft.amount.trim() === "";
  const shown = pristine ? { ...draft, amount: SAMPLE_VAT_AMOUNT } : draft;
  const result = computeVat(shown);

  const patch = (changes: Partial<VatDraft>) =>
    setDraft((current) => ({ ...current, ...changes }));

  const requireValid = () => {
    const count = Object.keys(errors).length;
    if (count === 0) return;
    attempt();
    window.setTimeout(() => {
      document.querySelector<HTMLElement>('#workbench [aria-invalid="true"]')?.focus();
    }, 50);
    throw new Error(
      `${count === 1 ? "One thing needs" : `${count} things need`} fixing before your figures are ready.`,
    );
  };

  const form = (
    <form noValidate onSubmit={(event) => event.preventDefault()} className="grid gap-8">
      <p className="m-0 text-[13px] text-paper-70">{DRAFT_NOTICE}</p>

      <FieldGroup legend="What do you need?">
        <Segmented
          label="Calculation"
          value={draft.mode}
          options={MODE_OPTIONS}
          onChange={(mode) => patch({ mode })}
          className="w-fit"
        />
        <FieldRow>
          <TextField
            label={VAT_MODES[draft.mode].amountLabel}
            inputMode="decimal"
            value={draft.amount}
            placeholder={SAMPLE_VAT_AMOUNT}
            onChange={(amount) => patch({ amount })}
            onBlur={() => touch("amount")}
            error={errorFor("amount")}
          />
          <SelectField
            label="Currency"
            value={draft.currency}
            options={CURRENCY_OPTIONS}
            onChange={(currency) => patch({ currency: currency as CurrencyCode })}
          />
        </FieldRow>
      </FieldGroup>

      <FieldGroup legend="The rate">
        <TextField
          label="VAT rate (%)"
          inputMode="decimal"
          value={draft.rate}
          hint={
            isStandardRate(draft)
              ? `${NIGERIA_VAT.label}. Change it if a different rate applies to you.`
              : "A rate you've set. Nigeria's standard rate is 7.5%."
          }
          onChange={(rate) => patch({ rate })}
          onBlur={() => touch("rate")}
          error={errorFor("rate")}
        />
        {!isStandardRate(draft) && (
          <button
            type="button"
            onClick={() => patch({ rate: NIGERIA_VAT.rate })}
            className="inline-flex min-h-11 w-fit cursor-pointer items-center gap-2 rounded-full border border-paper-40 px-4 text-sm font-medium text-white transition-colors duration-200 hover:bg-white/10"
          >
            <ArrowCounterClockwise size={16} aria-hidden="true" />
            Use {NIGERIA_VAT.label} ({NIGERIA_VAT.rate}%)
          </button>
        )}
      </FieldGroup>
    </form>
  );

  return (
    <Workbench
      form={form}
      sampleNote={
        pristine
          ? `An example using ${formatMoney(1000000, draft.currency)}. Your amount replaces it as you type.`
          : undefined
      }
      preview={
        result ? (
          <VatPanel result={result} draft={shown} />
        ) : (
          <p className="dw-no-print m-0 rounded-sm border border-dashed border-paper-40 p-6 text-[15px] text-paper-70">
            Enter an amount and a rate, and the breakdown appears here.
          </p>
        )
      }
      actions={
        <ToolActions
          primary={{
            label: "Copy breakdown",
            icon: Copy,
            run: async () => {
              requireValid();
              if (!(await copyText(vatSummary(computeVat(draft)!, draft.currency)))) {
                throw new Error("We couldn't reach your clipboard. Select the figures and copy them instead.");
              }
              return "Breakdown copied.";
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
          ]}
          onClear={() => {
            setDraft(createVatDraft());
            reset();
          }}
        />
      }
    />
  );
}
