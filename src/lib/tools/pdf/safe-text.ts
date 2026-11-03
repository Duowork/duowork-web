/**
 * What the PDF's fonts can draw. A PDF has no system fonts to fall back on, so
 * anything else would come out as a garbled or missing glyph. It's removed and
 * reported instead, so the visitor knows rather than finding out from a client.
 * pdf.test.tsx checks this list against the font files themselves.
 */
const SUPPORTED_RANGES: [number, number][] = [
  [0x09, 0x0a], // tab, newline
  [0x20, 0x7e], // Basic Latin
  [0xa0, 0x17f], // Latin-1 and Extended-A
  [0x181, 0x181], // Hausa hooked letters
  [0x18a, 0x18a],
  [0x198, 0x199],
  [0x1b3, 0x1b4],
  [0x253, 0x253],
  [0x257, 0x257],
  [0x1f8, 0x1f9], // Yoruba and Igbo N with grave
  [0x300, 0x301], // Tone marks
  [0x304, 0x304],
  [0x323, 0x323], // Dot below
  [0x1e62, 0x1e63], // Yoruba S with dot below
  [0x1ea0, 0x1ef9], // Includes the Yoruba and Igbo dotted vowels
  [0x2013, 0x2014], // Dashes
  [0x2018, 0x201a], // Quotes
  [0x201c, 0x201e],
  [0x2020, 0x2022], // Daggers, bullet
  [0x2026, 0x2026], // Ellipsis
  [0x2030, 0x2030], // Per mille
  [0x2039, 0x203a],
  [0x20a6, 0x20a6], // Naira
  [0x20a9, 0x20a9],
  [0x20ab, 0x20ac], // Dong, euro
  [0x20b5, 0x20b5], // Cedi
  [0x2122, 0x2122], // Trademark
  [0x2190, 0x2193], // Arrows
  [0x2212, 0x2212], // Minus
];

const isSupported = (code: number) =>
  SUPPORTED_RANGES.some(([from, to]) => code >= from && code <= to);

/** Joiner, variation selector and skin tones: not worth naming in a message. */
const isInvisible = (code: number) =>
  code === 0x200d || code === 0xfe0f || (code >= 0x1f3fb && code <= 0x1f3ff);

export function pdfSafeText(text: string, dropped: Set<string>): string {
  let safe = "";
  for (const character of text.normalize("NFC")) {
    const code = character.codePointAt(0)!;
    if (isSupported(code)) {
      safe += character;
    } else if (!isInvisible(code)) {
      dropped.add(character);
    }
  }
  return safe;
}

/** Cleans every string in a view, apart from the logo's image data. */
export function pdfSafeView<T>(view: T): { view: T; dropped: string[] } {
  const dropped = new Set<string>();

  const clean = (value: unknown, key?: string): unknown => {
    if (key === "logo") return value;
    if (typeof value === "string") return pdfSafeText(value, dropped);
    if (Array.isArray(value)) return value.map((item) => clean(item));
    if (value && typeof value === "object") {
      return Object.fromEntries(
        Object.entries(value).map(([entryKey, entry]) => [entryKey, clean(entry, entryKey)]),
      );
    }
    return value;
  };

  return { view: clean(view) as T, dropped: [...dropped] };
}

export function droppedNotice(dropped: string[]): string {
  if (dropped.length === 0) return "";
  const shown = dropped.slice(0, 6).join(" ");
  return ` A PDF can't show ${shown}${dropped.length > 6 ? " and a few others" : ""}, so we left ${dropped.length === 1 ? "it" : "them"} out.`;
}
