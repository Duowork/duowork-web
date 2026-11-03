import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { SITE_META, TOOLS, relatedTools, searchTools } from "../../data/tools";
import InvoiceGenerator from "./InvoiceGenerator";
import QuotationGenerator from "./QuotationGenerator";
import ReceiptGenerator from "./ReceiptGenerator";
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
