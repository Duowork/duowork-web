import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { SITE_META, TOOLS, relatedTools, searchTools } from "../../data/tools";
import InvoiceGenerator from "./InvoiceGenerator";
import QuotationGenerator from "./QuotationGenerator";
import ProfitMarginCalculator from "./ProfitMarginCalculator";
import QrCodeGenerator from "./QrCodeGenerator";
import ReceiptGenerator from "./ReceiptGenerator";
import VatCalculator from "./VatCalculator";
import ToolsHome from "./ToolsHome";

const renderPage = (page: React.ReactNode) =>
  render(<MemoryRouter>{page}</MemoryRouter>);

beforeAll(() => {
  // jsdom has no IntersectionObserver, which <Reveal> relies on.
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  );
});

beforeEach(() => window.sessionStorage.clear());

const preview = () => screen.getByRole("article");

/** Looked up each time: the panel is rebuilt whenever a field is briefly empty. */
const results = () => within(screen.getByRole("article", { name: "Your results" }));

describe("invoice generator", () => {
  it("shows a labelled sample until the visitor starts typing", async () => {
    const user = userEvent.setup();
    renderPage(<InvoiceGenerator />);

    expect(screen.getByText(/this is a sample/i)).toBeInTheDocument();
    expect(within(preview()).getAllByText("Harmattan Studio").length).toBeGreaterThan(0);

    await user.type(screen.getByLabelText("Business name"), "Acme");

    expect(screen.queryByText(/this is a sample/i)).not.toBeInTheDocument();
    expect(within(preview()).queryByText("Harmattan Studio")).not.toBeInTheDocument();
    expect(within(preview()).getAllByText("Acme").length).toBeGreaterThan(0);
  });

  it("adds and removes lines and keeps the totals right", async () => {
    const user = userEvent.setup();
    renderPage(<InvoiceGenerator />);

    await user.type(screen.getByLabelText("Item 1"), "Design");
    await user.clear(screen.getAllByLabelText("Quantity")[0]);
    await user.type(screen.getAllByLabelText("Quantity")[0], "2");
    await user.type(screen.getAllByLabelText("Unit price")[0], "1,000");

    await user.click(screen.getByRole("button", { name: "Add another item" }));
    // Focus lands in the new row, ready to type.
    expect(screen.getByLabelText("Item 2")).toHaveFocus();
    await user.keyboard("Hosting");
    await user.type(screen.getAllByLabelText("Unit price")[1], "500");

    await user.type(screen.getByLabelText(/Tax rate/), "10");

    // 2,000 + 500 = 2,500; plus 10% = 2,750
    const paper = within(preview());
    expect(paper.getByText("₦2,500.00")).toBeInTheDocument();
    expect(paper.getByText("₦250.00")).toBeInTheDocument();
    expect(paper.getByText("₦2,750.00")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Remove item 2" }));
    expect(paper.queryByText("Hosting")).not.toBeInTheDocument();
    // 2,000; plus 10% = 2,200
    expect(paper.getByText("₦2,200.00")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add another item" })).toHaveFocus();
  });

  it("blocks export of an unfinished invoice and says why", async () => {
    const user = userEvent.setup();
    renderPage(<InvoiceGenerator />);

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Download PDF/ }));

    expect(await screen.findByText(/need fixing before your invoice is ready/)).toBeInTheDocument();
    expect(screen.getByLabelText("Business name")).toHaveAttribute("aria-invalid", "true");
    await waitFor(() => expect(screen.getByLabelText("Business name")).toHaveFocus());
  });

  it("shows a field's error when you leave it, not before", async () => {
    const user = userEvent.setup();
    renderPage(<InvoiceGenerator />);

    const field = screen.getByLabelText("Business name");
    await user.click(field);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    await user.tab();
    expect(screen.getByRole("alert")).toHaveTextContent(/business name/);
  });

  it("keeps the draft through a reload, and clears it on request", async () => {
    const user = userEvent.setup();
    const { unmount } = renderPage(<InvoiceGenerator />);

    await user.type(screen.getByLabelText("Business name"), "Acme");
    unmount();

    renderPage(<InvoiceGenerator />);
    expect(screen.getByLabelText("Business name")).toHaveValue("Acme");

    await user.click(screen.getByRole("button", { name: "Clear" }));
    expect(screen.getByLabelText("Business name")).toHaveValue("Acme");
    await user.click(screen.getByRole("button", { name: "Yes, clear" }));
    expect(screen.getByLabelText("Business name")).toHaveValue("");
  });
});

describe("quotation generator", () => {
  it("explains itself and frames the document as a proposal", () => {
    renderPage(<QuotationGenerator />);
    expect(screen.getByText("Quotation or invoice?")).toBeInTheDocument();
    expect(screen.getByLabelText(/Valid until/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Terms and conditions/)).toBeInTheDocument();
    expect(within(preview()).getByText(/not a request for payment/)).toBeInTheDocument();
  });
});

describe("receipt generator", () => {
  it("switches layout and shows what was typed", async () => {
    const user = userEvent.setup();
    renderPage(<ReceiptGenerator />);

    await user.type(screen.getByLabelText("Amount paid"), "25,000");
    await user.click(screen.getByRole("button", { name: "Compact" }));

    expect(within(preview()).getByText("₦25,000.00")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Compact" })).toHaveAttribute("aria-pressed", "true");
  });
});

describe("profit margin calculator", () => {
  it("shows an example, then the visitor's own margin and markup", async () => {
    const user = userEvent.setup();
    renderPage(<ProfitMarginCalculator />);

    expect(screen.getByText(/An example/)).toBeInTheDocument();
    await user.type(screen.getByLabelText("What it costs you"), "8,000");
    await user.type(screen.getByLabelText("What you sell it for"), "10,000");

    // 2,000 profit: 20% of the price, 25% of the cost.
    expect(results().getAllByText("20%").length).toBeGreaterThan(0);
    expect(results().getByText("25%")).toBeInTheDocument();
    expect(results().getByText(/Margin or markup\?/)).toBeInTheDocument();

    await user.clear(screen.getByLabelText("What it costs you"));
    await user.type(screen.getByLabelText("What it costs you"), "12,000");
    expect(results().getByText("You're losing")).toBeInTheDocument();
  });
});

describe("VAT calculator", () => {
  it("adds and removes VAT at the standard rate, with the source shown", async () => {
    const user = userEvent.setup();
    renderPage(<VatCalculator />);

    expect(screen.getByLabelText("VAT rate (%)")).toHaveValue("7.5");
    await user.type(screen.getByLabelText("Price before VAT"), "10,000");
    expect(results().getAllByText("₦10,750.00").length).toBeGreaterThan(0);
    expect(results().getByText(/Nigeria Tax Act 2025, section 147/)).toBeInTheDocument();
    expect(results().getByText(/doesn't tell you what you owe/)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Remove VAT" }));
    // 10,000 ÷ 1.075, shown as the headline and in the breakdown.
    expect(results().getAllByText("₦9,302.33")).toHaveLength(2);

    await user.clear(screen.getByLabelText("VAT rate (%)"));
    await user.type(screen.getByLabelText("VAT rate (%)"), "10");
    expect(results().getByText(/the rate you entered/)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /Use Nigeria's standard rate/ }));
    expect(screen.getByLabelText("VAT rate (%)")).toHaveValue("7.5");
  });
});

describe("QR code generator", () => {
  it("makes a Wi-Fi code without ever saving the password", async () => {
    const user = userEvent.setup();
    renderPage(<QrCodeGenerator />);

    expect(screen.getByRole("img", { name: /QR code\. Opens https:\/\/www\.duowork\.tech/ })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Wi-Fi" }));
    await user.type(screen.getByLabelText("Network name"), "Shop Guest");
    await user.type(screen.getByLabelText("Password"), "secret123");

    expect(screen.getByRole("img", { name: /Joins the Wi-Fi network “Shop Guest”/ })).toBeInTheDocument();
    const saved = window.sessionStorage.getItem("duowork-tools:qr:v1") ?? "";
    expect(saved).toContain("Shop Guest");
    expect(saved).not.toContain("secret123");
  });

  it("blocks a download until the details are valid", async () => {
    const user = userEvent.setup();
    renderPage(<QrCodeGenerator />);

    await user.type(screen.getByLabelText("Web address"), "not a link");
    await user.click(screen.getByRole("button", { name: /Download PNG/ }));
    expect(await screen.findByText(/fixing before your code is ready/)).toBeInTheDocument();
    expect(screen.getByLabelText("Web address")).toHaveAttribute("aria-invalid", "true");
  });
});

describe("tools directory", () => {
  it("links only to tools that exist", () => {
    renderPage(<ToolsHome />);
    for (const tool of TOOLS) {
      const links = screen.queryAllByRole("link", { name: new RegExp(tool.name) });
      if (tool.live) expect(links.length).toBeGreaterThan(0);
      else expect(links).toHaveLength(0);
    }
  });

  it("filters as you type, and helps when nothing matches", async () => {
    const user = userEvent.setup();
    renderPage(<ToolsHome />);
    const search = screen.getByRole("searchbox");

    await user.type(search, "proof of payment");
    expect(screen.getByRole("link", { name: /Receipt Generator/ })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /Invoice Generator/ })).not.toBeInTheDocument();

    await user.clear(search);
    await user.type(search, "spaceship");
    expect(screen.getByText("Nothing matches that yet.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Tell us about it/ })).toBeInTheDocument();
  });
});

describe("page metadata", () => {
  it("sets the tool's title, and the site's on leaving even after a direct visit", () => {
    // A direct visit starts with the tool's title already in the document.
    document.title = "Free Invoice Generator | Duowork Tools";
    const { unmount } = renderPage(<InvoiceGenerator />);
    expect(document.title).toBe("Free Invoice Generator | Duowork Tools");
    unmount();
    expect(document.title).toBe(SITE_META.title);
  });
});

describe("tools data", () => {
  it("has ten unique tools, each with complete copy", () => {
    expect(new Set(TOOLS.map((tool) => tool.slug)).size).toBe(10);
    for (const tool of TOOLS) {
      expect(tool.headline && tool.intro && tool.metaDescription).toBeTruthy();
      expect(tool.cta.to).toMatch(/^\/#(services|contact)$/);
      for (const other of relatedTools(tool)) expect(other.live).toBe(true);
    }
  });

  it("searches keywords as well as names", () => {
    expect(searchTools("estimate").map((tool) => tool.slug)).toEqual(["quotation-generator"]);
    expect(searchTools("").length).toBe(10);
  });
});
