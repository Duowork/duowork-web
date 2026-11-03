// @vitest-environment node
/// <reference types="node" />
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { SITE_META } from "./tools";

describe("SITE_META", () => {
  it("matches index.html, which pages other than the tools rely on", () => {
    const html = readFileSync("index.html", "utf8");
    const title = html.match(/<title>([\s\S]*?)<\/title>/)?.[1].trim();
    const description = html.match(/name="description"\s+content="([^"]*)"/)?.[1];
    const canonical = html.match(/rel="canonical" href="([^"]*)"/)?.[1];

    expect({ title, description, canonical }).toEqual(SITE_META);
  });
});
