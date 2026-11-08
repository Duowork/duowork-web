// @vitest-environment node
/// <reference types="node" />
import { resolve } from "node:path";
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { renderToBuffer } from "@react-pdf/renderer";
import { beforeAll, describe, expect, it } from "vitest";
import { buildDocumentView, createDraft, sampleDraft, type DocumentDraft } from "../document";
import { buildReceiptView, sampleReceiptDraft } from "../receipt";
import DocumentPdf from "./DocumentPdf";
import { registerPdfFonts } from "./fonts";
import ReceiptPdf from "./ReceiptPdf";
import { droppedNotice, pdfSafeText, pdfSafeView } from "./safe-text";

const font = (name: string) => resolve("src/assets/pdf-fonts", name);

const pageCount = (buffer: Buffer) =>
  buffer.toString("latin1").match(/\/Type\s*\/Page\b/g)?.length ?? 0;

const LONG = "A long description of the work that was carried out on this project. ";

function longDraft(): DocumentDraft {
  return {
    ...createDraft("invoice"),
    business: { name: "Acme", email: "a@acme.example", phone: "", address: "1 Road" },
    customer: { name: "Client", email: "", phone: "", address: "" },
    lines: Array.from({ length: 80 }, (_, index) => ({
      id: `l${index}`,
      description: index % 10 === 0 ? LONG.repeat(4) : `Item ${index + 1}`,
      quantity: "2",
      unitPrice: "1,000",
    })),
    notes: LONG.repeat(10),
  };
}

describe("PDF rendering", () => {
  beforeAll(() => {
    registerPdfFonts({
      regular: font("IBMPlexSans-Regular.ttf"),
      medium: font("IBMPlexSans-Medium.ttf"),
      semiBold: font("IBMPlexSans-SemiBold.ttf"),
      fallbackRegular: font("NotoSansNigerian-Regular.ttf"),
      fallbackSemiBold: font("NotoSansNigerian-SemiBold.ttf"),
    });
  });

  it("renders an invoice and a quotation on one page", async () => {
    for (const kind of ["invoice", "quotation"] as const) {
      const buffer = await renderToBuffer(
        <DocumentPdf view={buildDocumentView(sampleDraft(kind))} />,
      );
      expect(buffer.subarray(0, 4).toString()).toBe("%PDF");
      expect(pageCount(buffer)).toBe(1);
    }
  });

  it("flows a long invoice onto more pages instead of truncating it", async () => {
    const buffer = await renderToBuffer(<DocumentPdf view={buildDocumentView(longDraft())} />);
    expect(pageCount(buffer)).toBeGreaterThan(1);
  });

  it("prints the page number and document on every page", async () => {
    const { getDocument } = await import("pdfjs-dist/legacy/build/pdf.mjs");
    const buffer = await renderToBuffer(<DocumentPdf view={buildDocumentView(longDraft())} />);
    const pdf = await getDocument({ data: new Uint8Array(buffer), verbosity: 0 }).promise;

    expect(pdf.numPages).toBeGreaterThan(1);
    for (let number = 1; number <= pdf.numPages; number += 1) {
      const content = await (await pdf.getPage(number)).getTextContent();
      const text = content.items
        .map((item) => ("str" in item ? item.str : ""))
        .join(" ")
        .replace(/\s+/g, " ");
      expect(text).toContain(`Invoice INV-0001 · Page ${number} of ${pdf.numPages}`);
    }
  });

  it("survives a very long description and an unbroken string", async () => {
    const draft = longDraft();
    draft.lines = [
      { id: "huge", description: LONG.repeat(120), quantity: "1", unitPrice: "1" },
      { id: "token", description: "X".repeat(500), quantity: "1", unitPrice: "1" },
    ];
    const buffer = await renderToBuffer(<DocumentPdf view={buildDocumentView(draft)} />);
    expect(pageCount(buffer)).toBeGreaterThan(1);
  });

  it("renders both receipt layouts on a single page", async () => {
    for (const layout of ["standard", "compact"] as const) {
      const buffer = await renderToBuffer(
        <ReceiptPdf view={buildReceiptView(sampleReceiptDraft(layout))} />,
      );
      expect(pageCount(buffer)).toBe(1);
    }
  });
});

describe("safe text", () => {
  // Not a declared dependency of ours, but the renderer always brings it along.
  const fontkit = createRequire(import.meta.url)("fontkit");
  const load = (name: string) =>
    (fontkit.default ?? fontkit).create(readFileSync(font(name)));

  it("only ever allows characters the fonts can draw", () => {
    for (const weight of ["Regular", "SemiBold"]) {
      const plex = load(`IBMPlexSans-${weight}.ttf`);
      const fallback = load(`NotoSansNigerian-${weight}.ttf`);
      const missing: string[] = [];

      for (let code = 0x20; code <= 0x2fff; code += 1) {
        // Check what reaches the page, which is the normalised form.
        for (const character of pdfSafeText(String.fromCodePoint(code), new Set())) {
          const drawn = character.codePointAt(0)!;
          if (
            drawn >= 0x20 &&
            !plex.hasGlyphForCodePoint(drawn) &&
            !fallback.hasGlyphForCodePoint(drawn)
          ) {
            missing.push(`U+${drawn.toString(16)}`);
          }
        }
      }
      expect(missing).toEqual([]);
    }
  });

  it("keeps Nigerian names and the naira sign whole", () => {
    const dropped = new Set<string>();
    const text = "₦5,000 Ṣadé Ọkafọ Ẹmeka Ɓello Ɗanjuma Ƙabir Ƴusuf";
    expect(pdfSafeText(text, dropped)).toBe(text);
    expect(dropped.size).toBe(0);
  });

  it("removes what it can't draw and says so", () => {
    const { view, dropped } = pdfSafeView({
      logo: "data:image/png;base64,🙏",
      name: "Thanks 🙏🏽 你",
      rows: [{ value: "ok" }],
    });
    expect(view.name).toBe("Thanks  ");
    expect(view.logo).toBe("data:image/png;base64,🙏");
    expect(dropped).toEqual(["🙏", "你"]);
    expect(droppedNotice(dropped)).toMatch(/left them out/);
    expect(droppedNotice([])).toBe("");
  });
});

describe("Duowork lockup", () => {
  it("keeps the whole wordmark inside its frame", async () => {
    const { LOCKUP } = await import("../lockup");
    const [left, top, width, height] = LOCKUP.viewBox.split(" ").map(Number);
    // Outline paths are absolute M/L/Q/C commands, so numbers pair up as x, y.
    const numbers = LOCKUP.wordmark.match(/-?\d+(\.\d+)?/g)!.map(Number);
    const xs = numbers.filter((_, index) => index % 2 === 0);
    const ys = numbers.filter((_, index) => index % 2 === 1);
    expect(Math.min(...xs)).toBeGreaterThanOrEqual(left);
    expect(Math.max(...xs)).toBeLessThanOrEqual(left + width);
    expect(Math.min(...ys)).toBeGreaterThanOrEqual(top);
    expect(Math.max(...ys)).toBeLessThanOrEqual(top + height);
  });
});
