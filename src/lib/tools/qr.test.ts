// @vitest-environment node
import jsQR from "jsqr";
import { describe, expect, it } from "vitest";
import {
  buildQrContent,
  contrastRatio,
  createQrDraft,
  forgetWifiPassword,
  isQrPristine,
  normaliseUrl,
  QR_COLOURS,
  qrMatrix,
  qrPath,
  qrSvg,
  QUIET_ZONE,
  validateQr,
  whatsappDigits,
  type QrDraft,
  type QrErrorLevel,
} from "./qr";

const draftWith = (overrides: Partial<QrDraft>): QrDraft => ({
  ...createQrDraft(),
  ...overrides,
});

const hexToRgb = (hex: string) => [1, 3, 5].map((index) => parseInt(hex.slice(index, index + 2), 16));

/** Draws the code as pixels, the way a camera would see it, and reads it back. */
function scan(matrix: boolean[][], dark = "#222222", light = "#FFFFFF") {
  const scale = 4;
  const width = (matrix.length + QUIET_ZONE * 2) * scale;
  const pixels = new Uint8ClampedArray(width * width * 4);
  const [dr, dg, db] = hexToRgb(dark);
  const [lr, lg, lb] = hexToRgb(light);

  for (let y = 0; y < width; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const row = Math.floor(y / scale) - QUIET_ZONE;
      const column = Math.floor(x / scale) - QUIET_ZONE;
      const isDark = matrix[row]?.[column] ?? false;
      pixels.set(isDark ? [dr, dg, db, 255] : [lr, lg, lb, 255], (y * width + x) * 4);
    }
  }

  const result = jsQR(pixels, width, width);
  return result ? new TextDecoder().decode(new Uint8Array(result.binaryData)) : null;
}

const payloadOf = (draft: QrDraft) => {
  const content = buildQrContent(draft);
  if (!content) throw new Error(JSON.stringify(validateQr(draft)));
  return content.payload;
};

describe("content", () => {
  it("adds https to bare web addresses and rejects what isn't one", () => {
    expect(normaliseUrl("duowork.tech/tools")).toBe("https://duowork.tech/tools");
    expect(normaliseUrl("http://example.com")).toBe("http://example.com");
    for (const bad of ["", "not a url", "localhost", "javascript:alert(1)", "ftp://x.com"]) {
      expect(normaliseUrl(bad)).toBeNull();
    }
  });

  it("treats local numbers as Nigerian for WhatsApp", () => {
    expect(whatsappDigits("0803 000 0000")).toBe("2348030000000");
    expect(whatsappDigits("+234 803 000 0000")).toBe("2348030000000");
    expect(whatsappDigits("+44 7700 900000")).toBe("447700900000");
    expect(whatsappDigits("12")).toBeNull();
  });

  it("builds a WhatsApp link with the message encoded", () => {
    expect(
      payloadOf(draftWith({ kind: "whatsapp", whatsappNumber: "08030000000", whatsappMessage: "Price for 2 & 3? ₦" })),
    ).toBe("https://wa.me/2348030000000?text=Price%20for%202%20%26%203%3F%20%E2%82%A6");
  });

  it("builds an email link", () => {
    expect(
      payloadOf(draftWith({ kind: "email", email: "a@b.co", emailSubject: "Hi there", emailBody: "Line 1\nLine 2" })),
    ).toBe("mailto:a@b.co?subject=Hi%20there&body=Line%201%0ALine%202");
  });

  it("escapes Wi-Fi syntax and leaves out a password when there's none", () => {
    expect(
      payloadOf(draftWith({ kind: "wifi", wifiName: 'Shop;Wi:Fi', wifiPassword: 'p@ss,"word"\\', wifiHidden: true })),
    ).toBe('WIFI:T:WPA;S:Shop\\;Wi\\:Fi;P:p@ss\\,\\"word\\"\\\\;H:true;;');
    expect(payloadOf(draftWith({ kind: "wifi", wifiName: "Open", wifiSecurity: "nopass" }))).toBe(
      "WIFI:T:nopass;S:Open;;",
    );
  });

  it("builds a contact card", () => {
    expect(
      payloadOf(
        draftWith({
          kind: "vcard",
          firstName: "Ada",
          lastName: "Obi",
          organisation: "Acme, Ltd",
          cardPhone: "0803 000 0000",
          cardEmail: "ada@acme.co",
          website: "acme.co",
        }),
      ),
    ).toBe(
      [
        "BEGIN:VCARD",
        "VERSION:3.0",
        "N:Obi;Ada;;;",
        "FN:Ada Obi",
        "ORG:Acme\\, Ltd",
        "TEL;TYPE=CELL:08030000000",
        "EMAIL:ada@acme.co",
        "URL:https://acme.co",
        "END:VCARD",
      ].join("\r\n"),
    );
  });

  it("explains what's missing for each kind", () => {
    expect(Object.keys(validateQr(draftWith({ kind: "url" })))).toEqual(["url"]);
    expect(Object.keys(validateQr(draftWith({ kind: "wifi" }))).sort()).toEqual(["wifiName", "wifiPassword"]);
    expect(Object.keys(validateQr(draftWith({ kind: "vcard", cardEmail: "nope" }))).sort()).toEqual([
      "cardEmail",
      "firstName",
    ]);
  });
});

describe("codes scan back to what went in", () => {
  const drafts: Partial<QrDraft>[] = [
    { kind: "url", url: "duowork.tech/tools?ref=print&x=1" },
    { kind: "whatsapp", whatsappNumber: "08030000000", whatsappMessage: "I'd like 2 bags at ₦5,000" },
    { kind: "email", email: "hello@duowork.tech", emailSubject: "Order" },
    { kind: "phone", phone: "+234 704 295 6599" },
    { kind: "text", text: "Table 4 — today's special costs ₦3,500. Enjoy!" },
    { kind: "wifi", wifiName: "Shop;Guest", wifiPassword: "secret:123" },
    { kind: "vcard", firstName: "Ada", lastName: "Obi", cardPhone: "08030000000" },
  ];

  for (const overrides of drafts) {
    it(`${overrides.kind}`, () => {
      const payload = payloadOf(draftWith(overrides));
      expect(scan(qrMatrix(payload, "M"))).toBe(payload);
    });
  }

  it("at every sturdiness level", () => {
    for (const level of ["L", "M", "Q", "H"] as QrErrorLevel[]) {
      expect(scan(qrMatrix("https://duowork.tech", level))).toBe("https://duowork.tech");
    }
  });

  it("in every colour option", () => {
    const matrix = qrMatrix("https://duowork.tech/tools", "M");
    for (const colour of QR_COLOURS) {
      expect(scan(matrix, colour.dark, colour.light)).toBe("https://duowork.tech/tools");
    }
  });

  it("matches the SVG to the grid", () => {
    const matrix = qrMatrix("hi", "M");
    const darkSquares = matrix.flat().filter(Boolean).length;
    const drawn = [...qrPath(matrix).matchAll(/h(\d+)/g)].reduce(
      (sum, match) => sum + Number(match[1]),
      0,
    );
    expect(drawn).toBe(darkSquares);
    expect(qrSvg(matrix, "navy")).toContain('fill="#1D2B53"');
  });

  it("explains, rather than crashes, when there's too much to fit", () => {
    expect(() => qrMatrix("x".repeat(3000), "H")).toThrow(/more than one code can hold/);
  });
});

describe("safety", () => {
  it("keeps strong contrast in every colour option", () => {
    for (const colour of QR_COLOURS) {
      expect(contrastRatio(colour.dark, colour.light)).toBeGreaterThanOrEqual(7);
    }
  });

  it("never keeps a Wi-Fi password", () => {
    const saved = forgetWifiPassword(draftWith({ kind: "wifi", wifiName: "A", wifiPassword: "secret" }));
    expect(saved.wifiPassword).toBe("");
    expect(saved.wifiName).toBe("A");
  });

  it("knows when nothing has been typed, whatever the settings", () => {
    expect(isQrPristine(draftWith({ kind: "wifi", colours: "navy", wifiHidden: true }))).toBe(true);
    expect(isQrPristine(draftWith({ text: "x" }))).toBe(false);
  });
});
