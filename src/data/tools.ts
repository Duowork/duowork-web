/**
 * Duowork Tools: the directory, per-tool copy and page metadata. The build also
 * reads this file to write a real HTML page for each live tool, so keep it free
 * of browser and React imports (see scripts/static-tool-routes.ts).
 */

export type ToolSlug =
  | "invoice-generator"
  | "quotation-generator"
  | "receipt-generator"
  | "profit-margin-calculator"
  | "vat-calculator"
  | "payslip-generator"
  | "freelance-rate-calculator"
  | "qr-code-generator"
  | "utm-builder"
  | "payment-reminder-generator";

export type ToolCategory =
  | "Business & Finance"
  | "Marketing & Growth"
  | "Business Operations";

export type Tool = {
  slug: ToolSlug;
  name: string;
  category: ToolCategory;
  /** Flip to true when the tool's route is added in App.tsx. */
  live: boolean;
  headline: string;
  intro: string;
  /** One line for the directory. */
  summary: string;
  /** Extra words people might search for that the copy doesn't use. */
  keywords: string[];
  metaTitle: string;
  metaDescription: string;
  forWhom: string;
  needs: string;
  outcome: string;
  related: ToolSlug[];
  /** The soft pitch after the work area. Only ever points at existing pages. */
  cta: { line: string; label: string; to: string };
};

const SOFTWARE_CTA = {
  label: "Explore custom business software",
  to: "/#services",
};

const BUILD_CTA = { label: "Let's build a better way to work", to: "/#contact" };

export const TOOLS: Tool[] = [
  {
    slug: "invoice-generator",
    name: "Invoice Generator",
    category: "Business & Finance",
    live: true,
    headline: "Getting paid should be the easy part.",
    intro:
      "Create a professional invoice, send it to your client and get back to the work that matters.",
    summary: "A clean, professional invoice, ready to send as a PDF.",
    keywords: ["bill", "billing", "charge", "client", "payment", "pdf", "naira"],
    metaTitle: "Free Invoice Generator | Duowork Tools",
    metaDescription:
      "Create a professional invoice in NGN or other currencies and download it as a PDF. Free, no sign-up, and your details stay in your browser.",
    forWhom: "Freelancers and small businesses billing a client.",
    needs: "Your details, your client's details and what you're charging for.",
    outcome: "A PDF invoice to send, print or copy into a message.",
    related: ["quotation-generator", "receipt-generator"],
    cta: {
      line: "Creating invoices is easy. Managing your entire financial workflow is another story.",
      ...SOFTWARE_CTA,
    },
  },
  {
    slug: "quotation-generator",
    name: "Quotation Generator",
    category: "Business & Finance",
    live: true,
    headline: "Make the next business conversation easier.",
    intro:
      "Put the scope and the price in writing, so your customer can say yes before any work begins.",
    summary: "A clear quotation to agree scope and price before work begins.",
    keywords: ["quote", "estimate", "proposal", "pricing", "bid", "pdf"],
    metaTitle: "Free Quotation Generator | Duowork Tools",
    metaDescription:
      "Prepare a professional quotation with line items, terms and an expiry date, then download it as a PDF. Free, with no sign-up.",
    forWhom: "Anyone pricing work for a customer before starting it.",
    needs: "What you're proposing, what it costs and how long the price holds.",
    outcome: "A PDF quotation your customer can review and accept.",
    related: ["invoice-generator", "receipt-generator"],
    cta: {
      line: "One quotation is simple. Tracking every quote from first draft to signed deal takes more.",
      ...SOFTWARE_CTA,
    },
  },
  {
    slug: "receipt-generator",
    name: "Receipt Generator",
    category: "Business & Finance",
    live: true,
    headline: "Every payment deserves a proper record.",
    intro:
      "Give your customer proof of payment in under two minutes, and keep a copy for your own books.",
    summary: "Proof of payment in under two minutes, full page or compact.",
    keywords: ["proof of payment", "payment confirmation", "paid", "pdf", "whatsapp"],
    metaTitle: "Free Receipt Generator | Duowork Tools",
    metaDescription:
      "Generate a professional payment receipt as a PDF, in full-page or compact layout, or share a payment confirmation on WhatsApp. Free, with no sign-up.",
    forWhom: "Businesses and traders who've just been paid.",
    needs: "Who paid, how much, how they paid and what it was for.",
    outcome: "A PDF receipt, plus a confirmation you can send on WhatsApp.",
    related: ["invoice-generator", "quotation-generator"],
    cta: {
      line: "A receipt records one payment. Seeing all of them in one place is a different problem.",
      ...SOFTWARE_CTA,
    },
  },
  {
    slug: "profit-margin-calculator",
    name: "Profit Margin Calculator",
    category: "Business & Finance",
    live: false,
    headline: "Revenue looks good. But what are you actually keeping?",
    intro: "Understand what remains after the costs of making a sale.",
    summary: "See your real margin and markup, and the difference between them.",
    keywords: ["markup", "gross profit", "pricing", "cost", "selling price"],
    metaTitle: "Profit Margin Calculator | Duowork Tools",
    metaDescription:
      "Work out gross profit, profit margin and markup from your cost and selling price.",
    forWhom: "Business owners checking what a product or service really earns.",
    needs: "Your cost price, selling price and quantity.",
    outcome: "Your revenue, cost, profit, margin and markup at a glance.",
    related: ["vat-calculator", "freelance-rate-calculator"],
    cta: {
      line: "Still working out your numbers by hand?",
      ...BUILD_CTA,
    },
  },
  {
    slug: "vat-calculator",
    name: "VAT Calculator",
    category: "Business & Finance",
    live: false,
    headline: "Know what portion of the price goes to tax.",
    intro: "Add VAT to a price, or find how much VAT is already inside one.",
    summary: "Add VAT to a price, or find the VAT already inside one.",
    keywords: ["tax", "inclusive", "exclusive", "nigeria"],
    metaTitle: "VAT Calculator | Duowork Tools",
    metaDescription:
      "Calculate VAT-inclusive and VAT-exclusive prices with a rate you control.",
    forWhom: "Anyone pricing, buying or checking a taxable sale.",
    needs: "An amount and the VAT rate that applies to you.",
    outcome: "A clear breakdown of the price and the tax.",
    related: ["profit-margin-calculator", "invoice-generator"],
    cta: {
      line: "Still working out your numbers by hand?",
      ...BUILD_CTA,
    },
  },
  {
    slug: "payslip-generator",
    name: "Payslip Generator",
    category: "Business & Finance",
    live: false,
    headline: "Clear records make better working relationships.",
    intro: "Give each person on your team a clear record of what they earned.",
    summary: "Clear employee payslips, generated privately in your browser.",
    keywords: ["salary", "payroll", "wages", "staff", "employee", "deductions"],
    metaTitle: "Payslip Generator | Duowork Tools",
    metaDescription:
      "Generate a clear employee payslip as a PDF. Salary details stay in your browser.",
    forWhom: "Small businesses paying a small team.",
    needs: "Pay period, earnings and the deductions you've worked out.",
    outcome: "A PDF payslip for each employee.",
    related: ["invoice-generator", "receipt-generator"],
    cta: {
      line: "One payslip is simple. Running payroll every month is where it gets harder.",
      ...SOFTWARE_CTA,
    },
  },
  {
    slug: "freelance-rate-calculator",
    name: "Freelance Rate Calculator",
    category: "Business & Finance",
    live: false,
    headline: "Your time has a cost. Make sure your rates reflect it.",
    intro: "Work out what you need to charge to make freelancing sustainable.",
    summary: "Work out what you need to charge for freelancing to add up.",
    keywords: ["hourly rate", "day rate", "pricing", "consultant", "contractor"],
    metaTitle: "Freelance Rate Calculator | Duowork Tools",
    metaDescription:
      "Work out a sustainable hourly, daily and project rate from your income target and billable time.",
    forWhom: "Freelancers and independent professionals setting a price.",
    needs: "Your income target, expenses and working pattern.",
    outcome: "An hourly, daily and project rate, with the sums shown.",
    related: ["profit-margin-calculator", "invoice-generator"],
    cta: {
      line: "Still working out your numbers by hand?",
      ...BUILD_CTA,
    },
  },
  {
    slug: "qr-code-generator",
    name: "QR Code Generator",
    category: "Marketing & Growth",
    live: false,
    headline: "Make the next step one scan away.",
    intro: "Turn a link, a WhatsApp chat or your contact card into a code people can scan.",
    summary: "QR codes for links, WhatsApp, Wi-Fi and contact cards.",
    keywords: ["scan", "barcode", "wifi", "vcard", "whatsapp", "link"],
    metaTitle: "Free QR Code Generator | Duowork Tools",
    metaDescription:
      "Create QR codes for links, WhatsApp, Wi-Fi and contact cards, and download them as PNG or SVG.",
    forWhom: "Shops, events and anyone putting a link on something printed.",
    needs: "The link or details you want the code to open.",
    outcome: "A QR code to download as PNG or SVG.",
    related: ["utm-builder", "payment-reminder-generator"],
    cta: {
      line: "Need more than a code? We build the systems behind the scan.",
      ...BUILD_CTA,
    },
  },
  {
    slug: "utm-builder",
    name: "UTM Link Builder",
    category: "Marketing & Growth",
    live: false,
    headline: "Know where your traffic is coming from.",
    intro: "Tag your campaign links so your analytics can tell you what's working.",
    summary: "Build trackable campaign links without breaking the URL.",
    keywords: ["campaign", "tracking", "analytics", "marketing", "url"],
    metaTitle: "UTM Link Builder | Duowork Tools",
    metaDescription:
      "Build trackable campaign URLs with correctly encoded UTM parameters.",
    forWhom: "Marketers and owners running their own campaigns.",
    needs: "Your link and where you're sharing it.",
    outcome: "A tracking link ready to copy.",
    related: ["qr-code-generator", "payment-reminder-generator"],
    cta: {
      line: "Want your numbers in one place, without the spreadsheet?",
      ...BUILD_CTA,
    },
  },
  {
    slug: "payment-reminder-generator",
    name: "Payment Reminder Generator",
    category: "Business Operations",
    live: false,
    headline: "Following up shouldn't feel awkward.",
    intro: "Find the right words to remind a client that payment is due.",
    summary: "The right words for chasing a payment, on WhatsApp or by email.",
    keywords: ["overdue", "chase", "debt", "follow up", "unpaid", "whatsapp", "email"],
    metaTitle: "Payment Reminder Generator | Duowork Tools",
    metaDescription:
      "Write a respectful payment reminder for WhatsApp or email, in the tone that fits.",
    forWhom: "Anyone waiting on an unpaid invoice.",
    needs: "The client, the amount and the due date.",
    outcome: "A message ready to send on WhatsApp or by email.",
    related: ["invoice-generator", "receipt-generator"],
    cta: {
      line: "Still chasing payments one message at a time?",
      ...BUILD_CTA,
    },
  },
];

export const TOOL_CATEGORIES: ToolCategory[] = [
  "Business & Finance",
  "Marketing & Growth",
  "Business Operations",
];

export const FEATURED_TOOLS: ToolSlug[] = [
  "invoice-generator",
  "profit-margin-calculator",
  "quotation-generator",
  "vat-calculator",
];

export const getTool = (slug: ToolSlug) =>
  TOOLS.find((tool) => tool.slug === slug)!;

export const toolPath = (slug: ToolSlug) => `/tools/${slug}`;

/** Tools aren't linked to until they exist, so nothing here can dead-end. */
export const relatedTools = (tool: Tool) =>
  tool.related.map(getTool).filter((related) => related.live);

export function searchTools(query: string): Tool[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  return TOOLS.filter((tool) => {
    const haystack = [tool.name, tool.summary, tool.category, ...tool.keywords]
      .join(" ")
      .toLowerCase();
    return terms.every((term) => haystack.includes(term));
  });
}

export const TOOLS_HOME = {
  metaTitle: "Duowork Tools | Small tools. Real business outcomes.",
  metaDescription:
    "Free, practical tools for the everyday work of running a business: invoices, quotations, receipts and more. No sign-up, and your details stay in your browser.",
  eyebrow: "Duowork Tools",
  headlineLead: "Small tools.",
  headlineAccent: "Real business outcomes.",
  intro:
    "Practical tools for the everyday work of running a business. Calculate, create, organise and get things done without the complexity.",
  searchPlaceholder: "What are you trying to get done?",
  promises: ["Free to use", "No account needed", "Your details stay in your browser"],
  featuredHeading: "Where most people start",
  browseHeading: "Everything on the shelf",
  noResults: "Nothing matches that yet.",
  noResultsHint:
    "Tell us what you were trying to do. If it's useful to you, it may be useful to others too.",
  editorial: {
    heading: "Less admin. More actual work.",
    paragraphs: [
      "The invoice that takes twenty minutes to format. The margin you meant to check. The awkward message you keep rewriting. None of it is hard, but it comes out of the hours you meant to spend on the business itself.",
      "Each tool here does one of those jobs and gets out of your way. You bring the details, you leave with something finished.",
    ],
  },
  closing: {
    heading: "Need something more specific to how your business works?",
    label: "Let's build it",
    to: "/#contact",
  },
};

export const DRAFT_NOTICE =
  "Your details stay in this browser tab and aren't sent to us. Closing the tab clears them, so download anything you want to keep.";

export const SITE_ORIGIN = "https://www.duowork.tech";

/** index.html's own metadata, for leaving a tool page. A test keeps them equal. */
export const SITE_META = {
  title: "Duowork — Software studio building engines that understand your business",
  description:
    "Duowork designs, builds, and integrates the software that runs your business — custom platforms, internal tools, and enterprise systems that finally talk to each other. Rooted in Nigeria. Built to global standard.",
  canonical: `${SITE_ORIGIN}/`,
};
