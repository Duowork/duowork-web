import { Copy, Printer } from "@phosphor-icons/react";
import { MARGIN_METRICS, marginExplainer } from "../../data/tool-notes";
import { DRAFT_NOTICE } from "../../data/tools";
import { useDraft } from "../../hooks/useDraft";
import { useFieldErrors } from "../../hooks/useFieldErrors";
import { copyText } from "../../lib/tools/files";
import {
  computeMargin,
  createMarginDraft,
  isMarginPristine,
  marginSummary,
  SAMPLE_MARGIN,
  validateMargin,
  type MarginDraft,
  type MarginResult,
} from "../../lib/tools/margin";
import {
  CURRENCIES,
  formatMoney,
  formatPercent,
  parseAmount,
  type CurrencyCode,
} from "../../lib/tools/money";
import DuoworkLockup from "./DuoworkLockup";
import ToolActions from "./ToolActions";
import Workbench from "./Workbench";
import { FieldGroup, FieldRow, SelectField, TextField } from "./fields";

const CURRENCY_OPTIONS = CURRENCIES.map(({ code, label }) => ({ value: code, label }));

const LABEL = "text-[11px] font-medium tracking-[0.02em] text-ink-60";

function Bar({ label, value, width, tone }: { label: string; value: string; width: number; tone: string }) {
  return (
    <div className="grid gap-1">
      <div className="flex justify-between gap-3 text-[13px]">
        <span className="text-ink-60">{label}</span>
        <span className="font-medium">{value}</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-hairline">
        <div className={`dw-print-exact h-full rounded-full ${tone}`} style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}

function MarginPanel({ result, currency, sample }: { result: MarginResult; currency: CurrencyCode; sample: MarginDraft }) {
  const money = (minor: number) => formatMoney(minor, currency);
  const percent = (value: number | null) => (value === null ? "—" : formatPercent(value));
  const losing = result.profit < 0;
  const widest = Math.max(result.revenue, result.totalCost, 1);
  const share = (value: number) => Math.max(0, (value / widest) * 100);

  const metrics = [
    { key: "revenue", label: "Total revenue", value: money(result.revenue) },
    { key: "totalCost", label: "Total cost", value: money(result.totalCost) },
    { key: "profit", label: "Gross profit", value: money(result.profit) },
    { key: "margin", label: "Profit margin", value: percent(result.margin) },
    {
      key: "markup",
      label: "Markup",
      value: result.markup === null ? "Not applicable, as nothing was spent" : percent(result.markup),
    },
    { key: "unitProfit", label: "Profit per unit", value: money(result.unitProfit) },
  ] as const;

  return (
    <article
      aria-label="Your results"
      className="dw-paper rounded-sm bg-white p-[clamp(20px,4vw,36px)] text-carbon shadow-mock"
    >
      <p className={`m-0 ${LABEL}`}>{losing ? "You're losing" : "You keep"}</p>
      <p className="m-0 font-title text-[clamp(44px,7vw,64px)] leading-[1.05] font-semibold tracking-[-0.02em]">
        {percent(result.margin)}
      </p>
      <p className="mt-2 mb-0 text-[15px] text-ink-80">
        {losing
          ? `Every unit sold costs you ${money(-result.unitProfit)} more than it brings in.`
          : `of every sale as gross profit: ${money(result.unitProfit)} on each unit.`}
      </p>

      <div className="mt-6 grid gap-3">
        <Bar label="Revenue" value={money(result.revenue)} width={share(result.revenue)} tone="bg-carbon" />
        <Bar label="Cost" value={money(result.totalCost)} width={share(result.totalCost)} tone="bg-ink-60" />
        <Bar
          label={losing ? "Loss" : "Profit"}
          value={money(result.profit)}
          width={share(Math.abs(result.profit))}
          tone={losing ? "bg-alert" : "bg-volt ring-1 ring-carbon ring-inset"}
        />
      </div>

      <dl className="mt-7 mb-0 grid grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))] gap-x-6 gap-y-4 border-t border-hairline-strong pt-5">
        {metrics.map((metric) => (
          <div key={metric.key}>
            <dt className={LABEL}>{metric.label}</dt>
            <dd className="m-0 font-title text-lg font-semibold wrap-anywhere">{metric.value}</dd>
            <dd className="m-0 text-[13px] text-ink-60">{MARGIN_METRICS[metric.key]}</dd>
          </div>
        ))}
      </dl>

      {!losing && result.margin !== null && result.markup !== null && (
        <div className="mt-6 rounded-xl bg-volt-tint p-4 text-[14px] text-ink-80">
          <p className="m-0 mb-1 font-title font-semibold text-carbon">Margin or markup?</p>
          <p className="m-0">
            {marginExplainer({
              profit: money(result.unitProfit),
              price: money(parseAmount(sample.price) ?? 0),
              cost: money(result.unitCost),
              margin: percent(result.margin),
              markup: percent(result.markup),
            })}
          </p>
        </div>
      )}

      <div className="mt-8 flex justify-end">
        <DuoworkLockup className="w-[84px]" />
      </div>
    </article>
  );
}

export default function MarginEditor() {
  const [draft, setDraft] = useDraft<MarginDraft>("duowork-tools:margin:v1", createMarginDraft);

  const errors = validateMargin(draft);
  const { errorFor, touch, attempt, reset } = useFieldErrors(errors);

  const pristine = isMarginPristine(draft);
  const shown = pristine ? SAMPLE_MARGIN : draft;
  const result = computeMargin(shown);

  const patch = (changes: Partial<MarginDraft>) =>
    setDraft((current) => ({ ...current, ...changes }));

  const requireValid = () => {
    const count = Object.keys(errors).length;
    if (count === 0) return;
    attempt();
    window.setTimeout(() => {
      document.querySelector<HTMLElement>('#workbench [aria-invalid="true"]')?.focus();
    }, 50);
    throw new Error(
      `${count === 1 ? "One thing needs" : `${count} things need`} fixing before your results are ready.`,
    );
  };

  const form = (
    <form noValidate onSubmit={(event) => event.preventDefault()} className="grid gap-8">
      <p className="m-0 text-[13px] text-paper-70">{DRAFT_NOTICE}</p>

      <FieldGroup legend="One unit">
        <FieldRow>
          <TextField
            label="What it costs you"
            inputMode="decimal"
            value={draft.cost}
            placeholder={SAMPLE_MARGIN.cost}
            onChange={(cost) => patch({ cost })}
            onBlur={() => touch("cost")}
            error={errorFor("cost")}
          />
          <TextField
            label="What you sell it for"
            inputMode="decimal"
            value={draft.price}
            placeholder={SAMPLE_MARGIN.price}
            onChange={(price) => patch({ price })}
            onBlur={() => touch("price")}
            error={errorFor("price")}
          />
        </FieldRow>
        <TextField
          label="Other costs per unit"
          optional
          inputMode="decimal"
          value={draft.extra}
          placeholder="0"
          hint="Packaging, delivery or commission on each sale. Spread one-off costs across the units they cover."
          onChange={(extra) => patch({ extra })}
          onBlur={() => touch("extra")}
          error={errorFor("extra")}
        />
      </FieldGroup>

      <FieldGroup legend="How many, and in what currency">
        <FieldRow>
          <TextField
            label="Quantity sold"
            inputMode="decimal"
            value={draft.quantity}
            onChange={(quantity) => patch({ quantity })}
            onBlur={() => touch("quantity")}
            error={errorFor("quantity")}
          />
          <SelectField
            label="Currency"
            value={draft.currency}
            options={CURRENCY_OPTIONS}
            onChange={(currency) => patch({ currency: currency as CurrencyCode })}
          />
        </FieldRow>
      </FieldGroup>
    </form>
  );

  return (
    <Workbench
      form={form}
      sampleNote={
        pristine
          ? `An example: a ${formatMoney(parseAmount(SAMPLE_MARGIN.cost) ?? 0, draft.currency)} cost sold for ${formatMoney(parseAmount(SAMPLE_MARGIN.price) ?? 0, draft.currency)}. Your figures replace it as you type.`
          : undefined
      }
      preview={
        result ? (
          <MarginPanel result={result} currency={draft.currency} sample={shown} />
        ) : (
          <p className="dw-no-print m-0 rounded-sm border border-dashed border-paper-40 p-6 text-[15px] text-paper-70">
            Add what a unit costs you and what you sell it for, and your margin appears here.
          </p>
        )
      }
      actions={
        <ToolActions
          primary={{
            label: "Copy results",
            icon: Copy,
            run: async () => {
              requireValid();
              if (!(await copyText(marginSummary(computeMargin(draft)!, draft.currency)))) {
                throw new Error("We couldn't reach your clipboard. Select the figures and copy them instead.");
              }
              return "Results copied.";
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
            setDraft(createMarginDraft());
            reset();
          }}
        />
      }
    />
  );
}
