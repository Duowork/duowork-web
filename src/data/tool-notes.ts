/** Short explanations that sit beside a tool rather than in its form. */

export const QUOTE_VS_INVOICE = {
  lead: "Quotation or invoice?",
  body: "A quotation offers a price before the work starts, and your customer can accept or decline it. An invoice asks for payment once the work is agreed or done.",
};

/**
 * Checked against the Act itself on 8 November 2026: section 147 of the Nigeria
 * Tax Act 2025 charges VAT "at the rate of 7.5%", and the Act commenced on
 * 1 January 2026. Re-check before changing either, and keep the source shown.
 */
export const NIGERIA_VAT = {
  rate: "7.5",
  label: "Nigeria's standard rate",
  source: "Nigeria Tax Act 2025, section 147, in force from 1 January 2026.",
};

export const VAT_DISCLAIMER =
  "This works out VAT on a price. It doesn't tell you what you owe: that depends on whether you must register, which of your sales are exempt or zero-rated, and the VAT you can reclaim on purchases. Check with a tax adviser or the Nigeria Revenue Service.";

export const VAT_MODES = {
  exclusive: {
    label: "Add VAT",
    amountLabel: "Price before VAT",
    resultLabel: "Price with VAT",
  },
  inclusive: {
    label: "Remove VAT",
    amountLabel: "Price including VAT",
    resultLabel: "Price before VAT",
  },
} as const;

export const MARGIN_METRICS = {
  revenue: "What your customers pay in total.",
  totalCost: "What those sales cost you, including the other costs.",
  profit: "Revenue minus cost: what's left before overheads like rent and salaries.",
  margin: "Profit as a share of the selling price.",
  markup: "Profit as a share of the cost.",
  unitProfit: "What each unit sold leaves you.",
};

/** The margin-or-markup explainer, using the visitor's own figures. */
export function marginExplainer(figures: {
  profit: string;
  price: string;
  cost: string;
  margin: string;
  markup: string;
}) {
  return `On these figures, ${figures.profit} profit is ${figures.margin} of the ${figures.price} you charge (your margin) but ${figures.markup} of the ${figures.cost} it costs you (your markup). Same profit, two percentages. Pricing a 50% markup doesn't give you a 50% margin.`;
}

export const QR_COLOUR_NOTE =
  "Every option keeps dark squares on a light background with strong contrast, which is what phone cameras need to scan reliably.";
