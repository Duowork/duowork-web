import { Font } from "@react-pdf/renderer";

export type PdfFontSources = {
  regular: string;
  medium: string;
  semiBold: string;
  fallbackRegular: string;
  fallbackSemiBold: string;
};

let registered = false;

/**
 * Every word in a PDF is IBM Plex Sans, embedded from the full font files. The
 * site's body font, Poppins, has no ₦ glyph and PDF drops a missing glyph with
 * no fallback, so a figure typed into a note would silently lose its currency.
 *
 * Plex in turn lacks Yoruba's Ṣ and Hausa's hooked letters, so a small subset of
 * Noto Sans holds those and names keep their spelling. Pages ask for both, as
 * FONT_FAMILY; the renderer picks per letter.
 */
export const FONT_FAMILY = ["Plex", "NotoNigerian"];

export function registerPdfFonts(sources: PdfFontSources) {
  if (registered) return;
  registered = true;

  Font.register({
    family: "Plex",
    fonts: [
      { src: sources.regular, fontWeight: 400 },
      { src: sources.medium, fontWeight: 500 },
      { src: sources.semiBold, fontWeight: 600 },
    ],
  });

  Font.register({
    family: "NotoNigerian",
    fonts: [
      { src: sources.fallbackRegular, fontWeight: 400 },
      { src: sources.fallbackSemiBold, fontWeight: 600 },
    ],
  });

  // No dictionary hyphenation, but a very long unbroken string (a URL, a pasted
  // reference) may still break anywhere so it can't run off the page.
  Font.registerHyphenationCallback((word) =>
    word.length > 28 ? [...word] : [word],
  );
}
