import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { LEGAL_PAGES, PRIVACY, TERMS } from "../data/legal";
import Privacy from "./Privacy";
import Terms from "./Terms";

const allText = (page: (typeof LEGAL_PAGES)[number]) =>
  JSON.stringify(page);

describe("legal pages", () => {
  it("name the company, its registration and the right contact", () => {
    for (const page of LEGAL_PAGES) {
      const text = allText(page);
      expect(text).toContain("Duowork Software Solutions LTD");
      expect(text).toContain("hello@duowork.tech");
      expect(text).toContain("Abuja");
      expect(text).not.toContain("Lagos");
      expect(text).not.toContain("duowork.com");
    }
    expect(allText(PRIVACY)).toContain("RC 7500885");
    expect(allText(TERMS)).toContain("RC 7500885");
  });

  it("give every section a unique anchor", () => {
    for (const page of LEGAL_PAGES) {
      const ids = page.sections.map((section) => section.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it("keep the section numbers the Terms refer to in line", () => {
    const number = (id: string) =>
      TERMS.sections.findIndex((section) => section.id === id) + 1;
    expect(number("website")).toBe(2);
    expect(number("as-is")).toBe(5);
    expect(number("client-work")).toBe(6);
    expect(number("ending")).toBe(13);
    expect(number("disputes")).toBe(15);
    expect(number("contact")).toBe(17);
  });

  it("render with working links, and set the page title", () => {
    render(
      <MemoryRouter>
        <Privacy />
      </MemoryRouter>,
    );
    expect(screen.getByRole("heading", { level: 1, name: "Privacy Policy" })).toBeInTheDocument();
    expect(document.title).toBe(PRIVACY.metaTitle);
    expect(screen.getAllByRole("link", { name: "hello@duowork.tech" })[0]).toHaveAttribute(
      "href",
      "mailto:hello@duowork.tech",
    );
    expect(screen.getByRole("link", { name: "ndpc.gov.ng" })).toHaveAttribute(
      "href",
      "https://ndpc.gov.ng",
    );
  });

  it("render the Terms", () => {
    render(
      <MemoryRouter>
        <Terms />
      </MemoryRouter>,
    );
    expect(screen.getByRole("heading", { level: 1, name: "Terms" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Ending a project/ })).toHaveAttribute("href", "#ending");
  });
});
