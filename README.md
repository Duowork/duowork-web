# Duowork — Marketing Website

The marketing site for [Duowork](https://www.duowork.tech), a Nigerian software
studio building custom platforms, internal tools, and enterprise integrations.

The site's job is to establish credibility and drive discovery-call bookings.
Its centrepiece is the case-study grid: compact cards that expand into a bottom
sheet covering the lower 75% of the viewport.

## Pages

| Route | Page |
|---|---|
| `/` | Home — hero, problem framing, services, process, why us, industries, selected work, testimonials, contact |
| `/work` | Every case study, plus a closing CTA |
| `/about` | Story, mission and vision, values, closing quote |
| `/blog` | Filterable post index and newsletter signup |

Contact is a section on Home (`/#contact`) rather than its own page — the call
button and direct details sit beside the form, deliberately equal in weight.

The 1.0 routes `/what-we-do`, `/our-work`, and `/contact` redirect to their 2.0
equivalents so existing links keep working.

## Stack

React 19 · TypeScript · Vite 8 · React Router 7 · Tailwind CSS v4 ·
react-hook-form · [Fetchfully](https://www.npmjs.com/package/fetchfully)

Tailwind is configured CSS-first in `src/index.css` — there is no
`tailwind.config.js`.

## Getting started

```bash
npm install
npm run dev
```

| Script | Does |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check and build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint — should pass with no output |
| `npm run deploy` | Publish `dist/` to GitHub Pages |

## Project layout

```
src/
  data/          All site copy — edit content here, not in JSX
  components/    Shared UI (nav, footer, buttons, case card + sheet, image slots)
  hooks/         useReveal — one shared IntersectionObserver for scroll reveals
  lib/           Icon paths, entrance animations, HTTP client
  pages/         One file per route; Home composes pages/home/* sections
public/          Brand marks, project screenshots, PWA assets
```

Copy lives in `src/data/`. Changing a headline or a case study means editing a
data module, not hunting through components.

## Design

The design lives in `design_handoff_duowork-2.0_website/` (untracked — ask for
the bundle if you don't have it). Its `README.md` is the spec: colour and type
tokens, per-screen breakdowns, all final copy, motion timings, and accessibility
requirements. It is high fidelity — every hex value, size, and easing curve in
it is intended.

Design tokens are defined as Tailwind `@theme` properties in `src/index.css`.
Two colours carry the whole site: **carbon** `#222222` and **volt** `#9EFF51`,
on a white ground. There are no gradients except a single volt wash on the
contact section.

## Before launch

The site is structurally complete but not yet carrying real proof. Outstanding:

- **Imagery** — only two real screenshots are wired up (Sable & Grey,
  AvataMedia). Everything else is a visible hatch placeholder. Where no genuine
  asset exists, remove the slot rather than fill it with stock.
- **Illustrative copy** — case-study result figures and testimonial names are
  invented, flagged in `src/data/` and badged in development only. Replace them
  with verifiable content before going live.
- **Unwired** — newsletter signup, blog post detail pages, `/privacy` and
  `/terms`, real social URLs, and the phone number.
- **Social share image** — `og:image` needs a real 1200×630 PNG.

The contact form is wired, validated, and protected by a honeypot.

See [CLAUDE.md](CLAUDE.md) for conventions, constraints, and the full gap list.
