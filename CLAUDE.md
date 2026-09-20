# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

The Duowork marketing website — a four-page static React SPA whose job is to
establish credibility and drive discovery-call bookings. Duowork is a Nigerian
software studio building custom platforms, internal tools, and enterprise
integrations.

Pages: **Home** (`/`), **Work** (`/work`), **About** (`/about`), **Blog**
(`/blog`). Contact is a section on Home (`/#contact`), not a page.

## Commands

```bash
npm run dev      # Vite dev server
npm run build    # tsc -b && vite build
npm run lint     # eslint (must pass clean — CI-equivalent gate)
npm run preview  # serve the production build
npm run deploy   # publish dist/ to gh-pages
```

Run `npm run lint` and `npm run build` before considering a change done. Two
lint rules bite regularly here: `react-refresh/only-export-components` (a
component file must export only components — put constants and types in
`src/lib/` instead) and `react-hooks/set-state-in-effect` (don't call setState
synchronously in an effect body; do it in the event handler instead).

## Stack

React 19 · TypeScript · Vite 8 · React Router 7 · Tailwind CSS v4 ·
react-hook-form · Fetchfully (HTTP client). Deployed to GitHub Pages.

## The design handoff is the source of truth

`design_handoff_duowork-2.0_website/` holds the 2.0 design bundle:

| File | What it is |
|---|---|
| `README.md` | The spec — tokens, per-screen breakdown, all copy, accessibility requirements, known gaps |
| `Duowork Website.dc.html` | The prototype. A visual reference, **not** code to port |
| `support.js` | Prototype runtime. Never port this |
| `logo/*.svg` | Brand marks (already copied into `public/`) |

The handoff is **high fidelity**: every hex value, font size, spacing clamp,
radius, and easing curve in it is the intended value. Before changing anything
visual, check the spec — and if a value genuinely needs to change, change it
there first, then here.

The prototype uses a single-file component runtime with inline styles. Do not
reproduce that architecture. Two places where the spec's README and the
prototype HTML disagree on copy, the prototype wins (it is the artifact that was
actually reviewed): the Services h2 is "Three ways we help your business run
better." and the Why-us h2 is "A technical partner, not just a vendor."

The folder is gitignored — treat it as a local reference, and don't assume a
fresh clone has it.

## Layout of the code

```
src/
  data/          All site copy and content. Change copy HERE, not in JSX.
    site.ts      Nav links, footer columns, socials, contact details
    cases.ts     The five case studies
    home.ts      Home section content + contact form select options
    about.ts     Story, mission, vision, values
    blog.ts      Filters, featured post, post list
  components/    Shared UI used across pages
  hooks/         useReveal (one shared IntersectionObserver)
  lib/           icon-paths.ts, motion.ts, api-client.ts
  pages/
    Home.tsx     Composes home/* sections in argument order
    home/        Hero, Problems, Services, Process, WhyUs, Industries,
                 SelectedWork, Marquee, Testimonials, ContactSection, ContactForm
    Work.tsx  About.tsx  Blog.tsx  NotFound.tsx
    blog/        Newsletter
```

Content lives in `src/data/`. If you find yourself typing marketing copy into a
`.tsx` file, it belongs in a data module instead.

`src/data/*.json` (portfolio, services, process, tools, authors) are leftovers
from the 1.0 site. `portfolio.json` still describes the real client projects and
is worth keeping as a reference; none of it is imported by the 2.0 pages.

## Styling rules

Tailwind v4, configured CSS-first in `src/index.css` — there is no
`tailwind.config.js`. Design tokens are `@theme` custom properties.

Use the semantic token classes, not raw hex:

- `bg-carbon` / `text-carbon` — `#222222`
- `bg-volt` / `text-volt` — `#9EFF51`, the only accent
- `bg-volt-tint` (15%) for eyebrow pills, `bg-volt-card` (20%) for card circles
- `text-ink-80` / `text-ink-60` / `text-ink-30` — copy on white
- `text-paper-70` / `text-paper-60` / `border-paper-40` — copy on carbon
- `border-hairline` (8%) / `border-hairline-strong` (10%) / `border-hairline-dark`
- `shadow-mock` / `shadow-card` / `shadow-nav` / `shadow-sheet`
- `ease-standard` / `ease-out-soft` / `ease-sheet`

Hard constraints from the design:

- **Two background colours per page, maximum**: white and carbon. The only
  gradients are on the contact section: the animated volt wash (`.dw-wash`) and
  the scrim over its background photo (`.dw-contact-photo`). That scrim is what
  keeps the heading legible — the wash animates in and cannot be relied on.
- Every `auto-fit` grid must wrap its minimum in `min(Npx, 100%)`, i.e.
  `grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))]`. Without the
  `min()` wrapper, tracks overflow on narrow viewports.
- Headings use `font-title` (IBM Plex Sans); body and UI use `font-body`
  (Poppins), which is the default.
- Interactive targets are at least 44px.

Component classes that don't express well as utilities live in the
`@layer components` block of `index.css`: `.dw-hatch` (placeholder pattern),
`.dw-wash`, `.dw-field` (form controls), `.dw-marquee-item`, `.dw-reveal`.

## Motion

- Below the fold: wrap in `<Reveal delay={n}>`. It shares one
  IntersectionObserver across the page (`src/hooks/useReveal.ts`).
- Above the fold: `rise(delay)` / `riseSlow(delay)` from `src/lib/motion.ts`.
- For motion CSS cannot reach — the hero's looping video — use
  `usePrefersReducedMotion()` (`src/hooks/usePrefersReducedMotion.ts`) and hold
  the element still. The CSS block alone will not stop a `<video>`.
- The `prefers-reduced-motion` block at the bottom of `index.css` collapses all
  animation and forces reveals to full opacity. **Do not remove it**, and don't
  add animation that escapes it.
- Scroll listeners must be throttled to one measurement per frame — see
  `pages/home/Process.tsx`, the only remaining scroll-driven effect.

## Accessibility requirements that must not regress

The case-study bottom sheet (`components/CaseSheet.tsx`) is the sensitive one:

- Escape closes it
- Focus moves to the close button on open
- Focus returns to the opening card on close — coordinated by `CaseGrid`, since
  neither card nor sheet can do it alone
- `role="dialog"`, `aria-modal="true"`, `aria-label`
- Tab is trapped inside the sheet
- The downward chevron is the close affordance — it reads as "push this back down"

Form controls remove the default outline, so the **volt focus border on
`.dw-field` is the only focus indicator**. Never remove both.

## Placeholder and illustrative content

The site is not yet carrying real proof, and that is tracked in the data rather
than hidden:

- `ImageSlot` renders the diagonal-hatch placeholder wherever no real asset
  exists. Only two genuine screenshots are wired up (Sable & Grey, AvataMedia).
  **Where no genuine asset exists, remove the slot rather than fill it with
  stock** — credibility rests on the screenshots being real.
- `resultIsIllustrative` / `nameIsIllustrative` / `isDraft` flag invented
  figures, placeholder names, and draft topics. `IllustrativeBadge` renders
  those flags **in development only**.

Because the badges are dev-only, a production build shows the illustrative copy
undisclaimed. **Do not launch until the flagged copy in `src/data/` is replaced
with real, verifiable content.**

## Known gaps

Carried over from the handoff, still open:

1. The hero video files (`public/hero-city.mp4`, optionally `.webm`) are not in
   the repo yet — see `HERO_VIDEO` in `src/data/home.ts` for the encode command.
   Until they land the hero shows carbon plus its scrim, which looks deliberate
   but is not the intended design
2. Newsletter signup is not wired to any provider — it only acknowledges locally
3. No blog post detail pages; cards without an `href` render as plain cards
4. Social links are `#` placeholders (the phone number is now real: +234 704
   295 6599, WhatsApp only — it links to `wa.me`, never `tel:`)
5. No `/privacy` or `/terms` pages — the footer links 404
6. No services detail pages
7. `og:image` points at `metaimage.jpeg`; a real 1200×630 PNG is still needed
8. Case-study results and testimonial names are illustrative (see above)
9. Real-device testing not done. Emulated coverage (Chrome DevTools Protocol,
   2026-09-20) is clean: no horizontal overflow or clipped elements on any page
   at 320–1920 portrait or 568–926 landscape, and no non-inline control under
   44px. Real iOS/Android hardware is still untested

The contact form **is** wired — it POSTs to the existing Netlify function
`/.netlify/functions/send-email` via `src/lib/api-client.ts`, with validation,
a pending state, an error state, and a honeypot. The 2.0 field names map onto
that function's existing `name`/`email`/`subject`/`survey`/`message` keys.
