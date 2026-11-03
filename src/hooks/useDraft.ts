import { useEffect, useState } from "react";

/**
 * A tool's working state, kept in session storage so an accidental reload or
 * back button doesn't lose it. It ends with the tab by design: these tools
 * promise nothing is kept. Storage can throw or be unavailable, in which case
 * the draft simply lives in memory.
 */
export function useDraft<T>(key: string, create: () => T) {
  const [draft, setDraft] = useState<T>(() => {
    try {
      const saved = window.sessionStorage.getItem(key);
      return saved ? (JSON.parse(saved) as T) : create();
    } catch {
      return create();
    }
  });

  useEffect(() => {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(draft));
    } catch {
      // Full or blocked storage only costs the reload protection.
    }
  }, [key, draft]);

  return [draft, setDraft] as const;
}
