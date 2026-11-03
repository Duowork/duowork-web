import { useEffect, useRef, useState } from "react";
import { Plus, Trash } from "@phosphor-icons/react";
import {
  newLine,
  type DocumentErrors,
  type LineDraft,
} from "../../lib/tools/document";
import { formatMoney, lineTotal, parseAmount, parseQuantity, type CurrencyCode } from "../../lib/tools/money";
import { TextField } from "./fields";

type LineItemsProps = {
  lines: LineDraft[];
  currency: CurrencyCode;
  onChange: (lines: LineDraft[]) => void;
  errorFor: (key: string) => string | undefined;
  onBlurField: (key: keyof DocumentErrors) => void;
};

export default function LineItems({
  lines,
  currency,
  onChange,
  errorFor,
  onBlurField,
}: LineItemsProps) {
  const listRef = useRef<HTMLOListElement>(null);
  const addRef = useRef<HTMLButtonElement>(null);
  const [focusLast, setFocusLast] = useState(0);

  // Move focus into the row just added, once it exists.
  useEffect(() => {
    if (focusLast === 0) return;
    listRef.current
      ?.querySelector<HTMLLIElement>("li:last-child")
      ?.querySelector("input")
      ?.focus();
  }, [focusLast]);

  const update = (id: string, patch: Partial<LineDraft>) =>
    onChange(lines.map((line) => (line.id === id ? { ...line, ...patch } : line)));

  const remove = (id: string) => {
    onChange(lines.filter((line) => line.id !== id));
    addRef.current?.focus();
  };

  return (
    <div className="grid gap-3">
      <ol ref={listRef} className="m-0 grid list-none gap-3 p-0">
        {lines.map((line, index) => {
          const quantity = parseQuantity(line.quantity) ?? 0;
          const unit = parseAmount(line.unitPrice) ?? 0;

          return (
            <li key={line.id} className="grid gap-3 rounded-xl border border-hairline-dark p-3.5">
              <TextField
                label={`Item ${index + 1}`}
                value={line.description}
                placeholder="Website design, 12 bags of cement…"
                onChange={(description) => update(line.id, { description })}
                onBlur={() => onBlurField(`lines.${line.id}.description`)}
                error={
                  errorFor(`lines.${line.id}.description`) ??
                  (index === 0 ? errorFor("lines") : undefined)
                }
              />
              <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-3">
                <TextField
                  label="Quantity"
                  inputMode="decimal"
                  value={line.quantity}
                  onChange={(value) => update(line.id, { quantity: value })}
                  onBlur={() => onBlurField(`lines.${line.id}.quantity`)}
                  error={errorFor(`lines.${line.id}.quantity`)}
                />
                <TextField
                  label="Unit price"
                  inputMode="decimal"
                  placeholder="25,000"
                  value={line.unitPrice}
                  onChange={(unitPrice) => update(line.id, { unitPrice })}
                  onBlur={() => onBlurField(`lines.${line.id}.unitPrice`)}
                  error={errorFor(`lines.${line.id}.unitPrice`)}
                />
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-paper-70">
                  Line total{" "}
                  <span className="font-title font-medium text-white">
                    {formatMoney(lineTotal(quantity, unit), currency)}
                  </span>
                </span>
                {lines.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(line.id)}
                    aria-label={`Remove item ${index + 1}`}
                    className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full text-paper-70 transition-colors duration-200 hover:bg-surface-dark hover:text-white"
                  >
                    <Trash size={18} aria-hidden="true" />
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ol>

      <button
        ref={addRef}
        type="button"
        onClick={() => {
          onChange([...lines, newLine()]);
          setFocusLast((count) => count + 1);
        }}
        className="inline-flex min-h-11 w-fit cursor-pointer items-center gap-2 rounded-full border border-paper-40 px-4 text-sm font-medium text-white transition-colors duration-200 hover:bg-white/10"
      >
        <Plus size={16} weight="bold" aria-hidden="true" />
        Add another item
      </button>
    </div>
  );
}
