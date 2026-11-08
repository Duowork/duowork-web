import qrcode from "qrcode-generator";

/**
 * The QR code generator. Builds the text a code carries for each kind of
 * content, then the grid of squares. Pure, so the tests can decode the result.
 */

// The library keeps only the low byte of each character by default, which
// would corrupt ₦ or any accented letter. Encode as UTF-8, which scanners expect.
qrcode.stringToBytes = (text: string) => Array.from(new TextEncoder().encode(text));

export type QrKind = "url" | "whatsapp" | "email" | "phone" | "text" | "wifi" | "vcard";

export type QrErrorLevel = "L" | "M" | "Q" | "H";

export type WifiSecurity = "WPA" | "WEP" | "nopass";

export type QrDraft = {
  kind: QrKind;
  url: string;
  whatsappNumber: string;
  whatsappMessage: string;
  email: string;
  emailSubject: string;
  emailBody: string;
  phone: string;
  text: string;
  wifiName: string;
  wifiPassword: string;
  wifiSecurity: WifiSecurity;
  wifiHidden: boolean;
  firstName: string;
  lastName: string;
  organisation: string;
  jobTitle: string;
  cardPhone: string;
  cardEmail: string;
  website: string;
  colours: QrColourId;
  errorLevel: QrErrorLevel;
};

export type QrErrors = Record<string, string>;

export type QrContent = {
  /** Exactly what the code carries. */
  payload: string;
  /** What happens when someone scans it, in plain words. */
  summary: string;
};

/** Dark on light only: some phone cameras can't read light-on-dark codes. */
export const QR_COLOURS = [
  { id: "carbon", label: "Carbon on white", dark: "#222222", light: "#FFFFFF" },
  { id: "black", label: "Black on white", dark: "#000000", light: "#FFFFFF" },
  { id: "navy", label: "Navy on white", dark: "#1D2B53", light: "#FFFFFF" },
  { id: "forest", label: "Forest on white", dark: "#1E5631", light: "#FFFFFF" },
  { id: "volt", label: "Carbon on volt", dark: "#222222", light: "#9EFF51" },
] as const;

export type QrColourId = (typeof QR_COLOURS)[number]["id"];

export const qrColours = (id: QrColourId) =>
  QR_COLOURS.find((colour) => colour.id === id) ?? QR_COLOURS[0];

/** Squares of background kept around the code. Scanners need at least four. */
export const QUIET_ZONE = 4;

export function createQrDraft(): QrDraft {
  return {
    kind: "url",
    url: "",
    whatsappNumber: "",
    whatsappMessage: "",
    email: "",
    emailSubject: "",
    emailBody: "",
    phone: "",
    text: "",
    wifiName: "",
    wifiPassword: "",
    wifiSecurity: "WPA",
    wifiHidden: false,
    firstName: "",
    lastName: "",
    organisation: "",
    jobTitle: "",
    cardPhone: "",
    cardEmail: "",
    website: "",
    colours: "carbon",
    errorLevel: "M",
  };
}

/** Never kept in the browser, even for the length of a tab. */
export const forgetWifiPassword = (draft: QrDraft): QrDraft => ({
  ...draft,
  wifiPassword: "",
});

export const SAMPLE_QR_URL = "https://www.duowork.tech/tools";

const hasText = (value: string) => value.trim() !== "";

/** The fields that hold content, as opposed to settings. */
const CONTENT_FIELDS: (keyof QrDraft)[] = [
  "url",
  "whatsappNumber",
  "whatsappMessage",
  "email",
  "emailSubject",
  "emailBody",
  "phone",
  "text",
  "wifiName",
  "wifiPassword",
  "firstName",
  "lastName",
  "organisation",
  "jobTitle",
  "cardPhone",
  "cardEmail",
  "website",
];

export const isQrPristine = (draft: QrDraft) =>
  CONTENT_FIELDS.every((field) => !hasText(String(draft[field])));

/** Adds https:// when there's no scheme. Null if it can't be a web address. */
export function normaliseUrl(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed || /\s/.test(trimmed)) return null;

  const withScheme = /^[a-z][a-z\d+.-]*:/i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const url = new URL(withScheme);
    if (!["http:", "https:"].includes(url.protocol)) return null;
    if (!url.hostname.includes(".") || url.hostname.endsWith(".")) return null;
    return withScheme;
  } catch {
    return null;
  }
}

/**
 * International digits for WhatsApp. A local Nigerian number (11 digits from 0)
 * becomes +234; anything else must already carry its country code.
 */
export function whatsappDigits(value: string): string | null {
  const digits = value.replace(/[^\d]/g, "");
  const international = /^0\d{10}$/.test(digits) && !value.trim().startsWith("+")
    ? `234${digits.slice(1)}`
    : digits;
  return /^[1-9]\d{7,14}$/.test(international) ? international : null;
}

/** Keeps a leading + and the digits, which every phone dialler accepts. */
export function dialNumber(value: string): string | null {
  const trimmed = value.trim();
  const digits = trimmed.replace(/[^\d]/g, "");
  if (digits.length < 3 || digits.length > 15) return null;
  return `${trimmed.startsWith("+") ? "+" : ""}${digits}`;
}

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

/** Wi-Fi codes treat \ ; , : and " as syntax, so they're escaped. */
const escapeWifi = (value: string) => value.replace(/([\\;,:"])/g, "\\$1");

/** vCard text values escape \ , ; and turn line breaks into \n. */
const escapeCard = (value: string) =>
  value.trim().replace(/([\\,;])/g, "\\$1").replace(/\r?\n/g, "\\n");

export function validateQr(draft: QrDraft): QrErrors {
  const errors: QrErrors = {};

  switch (draft.kind) {
    case "url":
      if (!normaliseUrl(draft.url)) {
        errors.url = "Enter a web address, like yourbusiness.com or https://yourbusiness.com/menu.";
      }
      break;
    case "whatsapp":
      if (!whatsappDigits(draft.whatsappNumber)) {
        errors.whatsappNumber = "Enter a WhatsApp number, like 0803 000 0000 or +44 7700 900000.";
      }
      break;
    case "email":
      if (!isEmail(draft.email)) {
        errors.email = "Enter an email address, like hello@yourbusiness.com.";
      }
      break;
    case "phone":
      if (!dialNumber(draft.phone)) {
        errors.phone = "Enter a phone number, like 0803 000 0000.";
      }
      break;
    case "text":
      if (!hasText(draft.text)) {
        errors.text = "Type the text you want the code to show.";
      }
      break;
    case "wifi":
      if (!hasText(draft.wifiName)) {
        errors.wifiName = "Enter the network name, exactly as it appears on your phone.";
      }
      if (draft.wifiSecurity !== "nopass" && draft.wifiPassword === "") {
        errors.wifiPassword = "Enter the network password, or choose “No password”.";
      }
      break;
    case "vcard":
      if (!hasText(draft.firstName) && !hasText(draft.lastName) && !hasText(draft.organisation)) {
        errors.firstName = "Add a name or a business name for the contact.";
      }
      if (hasText(draft.cardPhone) && !dialNumber(draft.cardPhone)) {
        errors.cardPhone = "Enter a phone number, like 0803 000 0000.";
      }
      if (hasText(draft.cardEmail) && !isEmail(draft.cardEmail)) {
        errors.cardEmail = "Enter an email address, like hello@yourbusiness.com.";
      }
      if (hasText(draft.website) && !normaliseUrl(draft.website)) {
        errors.website = "Enter a web address, like yourbusiness.com.";
      }
      break;
  }

  return errors;
}

/** Null while the draft isn't valid for its kind. */
export function buildQrContent(draft: QrDraft): QrContent | null {
  if (Object.keys(validateQr(draft)).length > 0) return null;

  switch (draft.kind) {
    case "url": {
      const url = normaliseUrl(draft.url)!;
      return { payload: url, summary: `Opens ${url} in the phone's browser.` };
    }
    case "whatsapp": {
      const digits = whatsappDigits(draft.whatsappNumber)!;
      const message = draft.whatsappMessage.trim();
      return {
        payload: `https://wa.me/${digits}${message ? `?text=${encodeURIComponent(message)}` : ""}`,
        summary: `Starts a WhatsApp chat with +${digits}${message ? ", with your message ready to send" : ""}.`,
      };
    }
    case "email": {
      const params = [
        hasText(draft.emailSubject) && `subject=${encodeURIComponent(draft.emailSubject.trim())}`,
        hasText(draft.emailBody) && `body=${encodeURIComponent(draft.emailBody.trim())}`,
      ].filter(Boolean);
      const address = draft.email.trim();
      return {
        payload: `mailto:${address}${params.length ? `?${params.join("&")}` : ""}`,
        summary: `Starts an email to ${address}${params.length ? ", already filled in" : ""}.`,
      };
    }
    case "phone": {
      const number = dialNumber(draft.phone)!;
      return { payload: `tel:${number}`, summary: `Offers to call ${number}.` };
    }
    case "text":
      return { payload: draft.text, summary: "Shows your text on the phone's screen." };
    case "wifi": {
      const parts = [
        `T:${draft.wifiSecurity}`,
        `S:${escapeWifi(draft.wifiName)}`,
        draft.wifiSecurity !== "nopass" && `P:${escapeWifi(draft.wifiPassword)}`,
        draft.wifiHidden && "H:true",
      ].filter(Boolean);
      return {
        payload: `WIFI:${parts.join(";")};;`,
        summary: `Joins the Wi-Fi network “${draft.wifiName}” without typing the password.`,
      };
    }
    case "vcard": {
      const fullName =
        [draft.firstName, draft.lastName].map((part) => part.trim()).filter(Boolean).join(" ") ||
        draft.organisation.trim();
      const lines = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        `N:${escapeCard(draft.lastName)};${escapeCard(draft.firstName)};;;`,
        `FN:${escapeCard(fullName)}`,
        hasText(draft.organisation) && `ORG:${escapeCard(draft.organisation)}`,
        hasText(draft.jobTitle) && `TITLE:${escapeCard(draft.jobTitle)}`,
        hasText(draft.cardPhone) && `TEL;TYPE=CELL:${dialNumber(draft.cardPhone)}`,
        hasText(draft.cardEmail) && `EMAIL:${draft.cardEmail.trim()}`,
        hasText(draft.website) && `URL:${normaliseUrl(draft.website)}`,
        "END:VCARD",
      ].filter(Boolean);
      return {
        payload: lines.join("\r\n"),
        summary: `Saves ${fullName} to the phone's contacts.`,
      };
    }
  }
}

/** The grid of squares, true for dark. Throws in plain words if it won't fit. */
export function qrMatrix(payload: string, level: QrErrorLevel): boolean[][] {
  const code = qrcode(0, level);
  code.addData(payload, "Byte");
  try {
    code.make();
  } catch {
    throw new Error(
      "That's more than one code can hold. Shorten it, or choose a less sturdy code.",
    );
  }

  const size = code.getModuleCount();
  return Array.from({ length: size }, (_, row) =>
    Array.from({ length: size }, (_, column) => code.isDark(row, column)),
  );
}

/** One path for every dark square, merged into runs along each row. */
export function qrPath(matrix: boolean[][]): string {
  let path = "";
  matrix.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      if (!row[x]) {
        x += 1;
        continue;
      }
      const start = x;
      while (x < row.length && row[x]) x += 1;
      path += `M${start + QUIET_ZONE} ${y + QUIET_ZONE}h${x - start}v1h${start - x}z`;
    }
  });
  return path;
}

export function qrSvg(matrix: boolean[][], colourId: QrColourId): string {
  const { dark, light } = qrColours(colourId);
  const size = matrix.length + QUIET_ZONE * 2;
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size * 10}" height="${size * 10}" shape-rendering="crispEdges">`,
    `<rect width="${size}" height="${size}" fill="${light}"/>`,
    `<path d="${qrPath(matrix)}" fill="${dark}"/>`,
    "</svg>",
  ].join("");
}

/** WCAG contrast ratio between two #rrggbb colours. */
export function contrastRatio(first: string, second: string): number {
  const luminance = (hex: string) => {
    const [r, g, b] = [1, 3, 5].map((index) => {
      const channel = parseInt(hex.slice(index, index + 2), 16) / 255;
      return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const [lighter, darker] = [luminance(first), luminance(second)].sort((a, b) => b - a);
  return (lighter + 0.05) / (darker + 0.05);
}
