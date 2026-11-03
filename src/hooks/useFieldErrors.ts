import { useState } from "react";

/**
 * When to show a validation message: after someone leaves the field, or after
 * they've tried to export. Nobody should be told off for a form they've only
 * just opened.
 */
export function useFieldErrors(errors: Record<string, string>) {
  const [touched, setTouched] = useState<ReadonlySet<string>>(new Set());
  const [attempted, setAttempted] = useState(false);

  return {
    errorFor: (key: string) =>
      attempted || touched.has(key) ? errors[key] : undefined,
    touch: (key: string) =>
      setTouched((current) => new Set(current).add(key)),
    attempt: () => setAttempted(true),
    reset: () => {
      setTouched(new Set());
      setAttempted(false);
    },
  };
}
