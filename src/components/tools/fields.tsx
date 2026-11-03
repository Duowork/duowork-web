import { useId } from "react";
import { CaretDown } from "@phosphor-icons/react";

/** Tool form controls. These sit on carbon, so they use `.dw-field` as is. */

type FieldShellProps = {
  label: string;
  optional?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  children: (props: {
    id: string;
    "aria-invalid": true | undefined;
    "aria-describedby": string | undefined;
  }) => React.ReactNode;
};

function FieldShell({ label, optional, hint, error, className = "", children }: FieldShellProps) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy =
    [error && errorId, hint && hintId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={`grid content-start gap-1.5 ${className}`}>
      <label htmlFor={id} className="text-[13px] font-medium text-paper-70">
        {label}
        {optional && <span className="font-normal text-paper-60"> (optional)</span>}
      </label>
      {children({
        id,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": describedBy,
      })}
      {hint && (
        <span id={hintId} className="text-xs text-paper-60">
          {hint}
        </span>
      )}
      {error && (
        <span id={errorId} role="alert" className="text-[13px] text-alert">
          {error}
        </span>
      )}
    </div>
  );
}

type CommonProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  optional?: boolean;
  hint?: string;
  error?: string;
  placeholder?: string;
  className?: string;
};

type TextFieldProps = CommonProps & {
  type?: "text" | "email" | "tel" | "date";
  inputMode?: "text" | "decimal" | "email" | "tel";
  autoComplete?: string;
};

export function TextField({
  label,
  value,
  onChange,
  onBlur,
  optional,
  hint,
  error,
  placeholder,
  className,
  type = "text",
  inputMode,
  autoComplete = "off",
}: TextFieldProps) {
  return (
    <FieldShell label={label} optional={optional} hint={hint} error={error} className={className}>
      {(aria) => (
        <input
          {...aria}
          type={type}
          inputMode={inputMode}
          autoComplete={autoComplete}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
          className="dw-field"
        />
      )}
    </FieldShell>
  );
}

export function TextAreaField({
  label,
  value,
  onChange,
  onBlur,
  optional,
  hint,
  error,
  placeholder,
  className,
  rows = 3,
}: CommonProps & { rows?: number }) {
  return (
    <FieldShell label={label} optional={optional} hint={hint} error={error} className={className}>
      {(aria) => (
        <textarea
          {...aria}
          rows={rows}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
          className="dw-field"
        />
      )}
    </FieldShell>
  );
}

export function SelectField({
  label,
  value,
  onChange,
  hint,
  className,
  options,
}: Pick<CommonProps, "label" | "value" | "onChange" | "hint" | "className"> & {
  options: readonly { value: string; label: string }[];
}) {
  return (
    <FieldShell label={label} hint={hint} className={className}>
      {(aria) => (
        <div className="relative">
          <select
            {...aria}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className="dw-field cursor-pointer pr-10"
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <CaretDown
            size={16}
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-paper-60"
          />
        </div>
      )}
    </FieldShell>
  );
}

/** A labelled group of fields, separated from the next by a hairline. */
export function FieldGroup({
  legend,
  children,
}: {
  legend: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="m-0 grid min-w-0 gap-4 border-0 border-t border-hairline-dark p-0 pt-5">
      <legend className="float-left mb-4 w-full p-0 font-title text-[17px] font-semibold text-white">
        {legend}
      </legend>
      {children}
    </fieldset>
  );
}

/** A two-up row that stacks when there isn't room. */
export function FieldRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(180px,100%),1fr))] gap-4">
      {children}
    </div>
  );
}

/** Two or more mutually exclusive choices, shown as a pill switch. */
export function Segmented<T extends string>({
  label,
  value,
  onChange,
  options,
  className = "",
}: {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: readonly { value: T; label: string }[];
  className?: string;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className={`inline-flex max-w-full rounded-full border border-hairline-dark p-1 ${className}`}
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={option.value === value}
          onClick={() => onChange(option.value)}
          className={`min-h-11 flex-1 cursor-pointer rounded-full px-5 text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
            option.value === value
              ? "bg-volt text-carbon"
              : "text-paper-70 hover:bg-surface-dark hover:text-white"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
