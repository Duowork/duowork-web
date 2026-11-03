import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import type { Plugin } from "vite";
import { LEGAL_PAGES } from "../src/data/legal.ts";
import { SITE_ORIGIN, TOOLS, TOOLS_HOME, toolPath } from "../src/data/tools.ts";

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

/** Swaps one tag in the built index.html, and fails the build if it's missing. */
function replaceTag(html: string, pattern: RegExp, tag: string) {
  if (!pattern.test(html)) throw new Error(`static-tool-routes: no match for ${pattern}`);
  return html.replace(pattern, tag);
}

function pageHtml(html: string, title: string, description: string, path: string) {
  const url = `${SITE_ORIGIN}${path}`;
  const safeTitle = escapeHtml(title);
  const safeDescription = escapeHtml(description);

  let page = replaceTag(html, /<title>[\s\S]*?<\/title>/, `<title>${safeTitle}</title>`);
  page = replaceTag(
    page,
    /<meta\s+name="description"[\s\S]*?\/>/,
    `<meta name="description" content="${safeDescription}" />`,
  );
  page = replaceTag(page, /<link rel="canonical"[^>]*\/>/, `<link rel="canonical" href="${url}" />`);
  page = replaceTag(page, /<meta property="og:url"[^>]*\/>/, `<meta property="og:url" content="${url}" />`);
  page = replaceTag(
    page,
    /<meta\s+property="og:title"[\s\S]*?\/>/,
    `<meta property="og:title" content="${safeTitle}" />`,
  );
  page = replaceTag(
    page,
    /<meta\s+property="og:description"[\s\S]*?\/>/,
    `<meta property="og:description" content="${safeDescription}" />`,
  );
  page = replaceTag(
    page,
    /<meta\s+name="twitter:title"[\s\S]*?\/>/,
    `<meta name="twitter:title" content="${safeTitle}" />`,
  );
  page = replaceTag(
    page,
    /<meta\s+name="twitter:description"[\s\S]*?\/>/,
    `<meta name="twitter:description" content="${safeDescription}" />`,
  );
  return page;
}

/**
 * GitHub Pages can only serve a deep link through 404.html, which answers with
 * a 404 status and the home page's metadata. Tools are found through search, and
 * legal pages get linked to directly, so each gets a real file with a 200 and its
 * own title and description. `x.html` is served at `/x` without a redirect.
 */
export function staticToolRoutes(): Plugin {
  let outDir = "dist";

  return {
    name: "duowork-static-tool-routes",
    apply: "build",
    configResolved(config) {
      outDir = config.build.outDir;
    },
    closeBundle() {
      const html = readFileSync(join(outDir, "index.html"), "utf8");

      const write = (file: string, content: string) => {
        const target = join(outDir, file);
        mkdirSync(dirname(target), { recursive: true });
        writeFileSync(target, content);
      };

      write(
        "tools/index.html",
        pageHtml(html, TOOLS_HOME.metaTitle, TOOLS_HOME.metaDescription, "/tools"),
      );

      for (const page of LEGAL_PAGES) {
        write(
          `${page.path.slice(1)}.html`,
          pageHtml(html, page.metaTitle, page.metaDescription, page.path),
        );
      }

      for (const tool of TOOLS.filter((entry) => entry.live)) {
        write(
          `tools/${tool.slug}.html`,
          pageHtml(html, tool.metaTitle, tool.metaDescription, toolPath(tool.slug)),
        );
      }
    },
  };
}
