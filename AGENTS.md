# AGENTS.md

Guide for AI coding agents working in this repository. Humans: see `README.md`.

## What this is

Zhenhao Yang's personal portfolio — <https://allenyzh.com>. A content-driven
static site: home (hero, about, skills, featured projects, recent posts,
contact), project and blog listings with MDX detail pages, and a single
experience page.

Positioning: a full-stack engineer who also builds AI applications (2026).
The site itself is part of the evidence — dark-first console aesthetic,
keyboard-driven command palette, and content that AI agents can read
(`llms.txt`, Markdown endpoints, JSON-LD).

Visitors are recruiters, hiring managers and fellow engineers. They skim. The
site must load fast, read well on a phone, and make the work easy to find.

## Stack

| Layer      | Choice                                                                    |
| ---------- | ------------------------------------------------------------------------- |
| Framework  | Astro 5, every page prerendered (`export const prerender = true`)         |
| UI         | React 19 via `@astrojs/react`, shadcn/ui (new-york, neutral), Radix, lucide |
| Styling    | Tailwind CSS v4 through `@tailwindcss/vite`; tokens in `src/styles/global.css` |
| Content    | Astro content collections (MD/MDX) — `blog`, `projects`, `experience`     |
| Deploy     | Cloudflare Workers via `@astrojs/cloudflare` + Wrangler                   |
| Tests      | Vitest + Testing Library (unit), Playwright (e2e, 5 browser projects)     |
| Tooling    | pnpm 11, Node 20+, TypeScript strict                                      |

## Commands

```bash
pnpm install            # install
pnpm dev                # dev server on http://localhost:4321 (host 0.0.0.0)
pnpm build              # production build into dist/
pnpm preview            # serve the build
pnpm vitest run         # unit tests once (`pnpm test` starts watch mode)
npx tsc --noEmit        # type check (there is no lint script)
pnpm test:e2e           # Playwright; reuses a dev server on :4321 or starts one
pnpm run deploy         # build + wrangler deploy
```

- Use `pnpm run deploy`, never `pnpm deploy` — the latter is a pnpm built-in
  with a different meaning.
- Playwright needs browsers once per machine: `pnpm exec playwright install`.
- Deploying publishes to the live domain. Never deploy unless the user asks.

Before calling a change done, run `pnpm build`, `pnpm vitest run` and
`npx tsc --noEmit`. For anything visual, also look at the affected pages in a
browser at 375px and 1280px wide — a passing build says nothing about layout.

## Layout of the repo

```
src/
  pages/            routes: index, projects/, blog/, experience/, 404, rss.xml.js
                    agent-readable endpoints: llms.txt.ts, experience.md.ts,
                    projects/[slug].md.ts, blog/[slug].md.ts
  layouts/          BaseLayout (html shell, theme script, nav, footer, palette)
                    BaseHead (meta/SEO) · ArticleLayout (blog + project detail)
  components/
    ui/             shadcn primitives — generated, keep edits minimal
    home/           home sections: Hero, AtAGlance, SelectedWork, Stack,
                    Writing, Contact (all static .astro)
    navigation/     Nav.astro (floating pill header + mobile menu, inline script)
    common/         building blocks: Section, SectionHead, PageHead, Stat,
                    BentoCell, Chip, Kbd, StatusPill, Row, BrowserFrame,
                    ProjectCard, ProjectCover, Prose, JsonLd, CommandPalette,
                    CopyButton, CodeBlockWithCopy, PostButton, NextPrevBtnGroup
    Footer.astro
    __tests__/      Vitest specs
  content/          blog/<slug>/*.mdx · projects/<name>/*.mdx · experience/*.md
  content.config.ts collection schemas (zod)
  data/             consts.ts (site + personal info, hero/about copy),
                    navItems.ts, skills.ts
  lib/              content.ts (sorting, slugs, current role) · date.ts ·
                    markdown.ts (MDX → Markdown) · fuzzy.ts · theme.ts · utils.ts
  styles/global.css Tailwind entry, @font-face, design tokens, prose, code blocks
  assets/           images/PDF processed by Astro
public/             fonts (Geist, Geist Mono), favicon/, og.png, avatar.png,
                    robots.txt (served as-is)
scripts/            make-brand-assets.mjs — regenerates og.png and the favicons
e2e/                Playwright specs
docs/plans/         design/implementation plans
```

Import with the `@/` alias (`@/components/...`), not long relative paths.

## Architecture rules

**Static first.** A React component rendered without a `client:*` directive is
server-rendered to HTML and ships no JavaScript. That is the default; keep it.
Add a `client:*` directive only when the component has real browser behaviour
(state, event handlers, effects), and prefer `client:visible` / `client:idle`
over `client:load` for anything below the fold. Presentational sections
(cards, lists, headings) must not be hydrated.

Use `.astro` for static markup and layout; use `.tsx` when the component is
interactive or is reused inside MDX/React trees.

**Content lives in collections, not components.** Copy about projects, posts
and work history goes in `src/content/`. Personal constants (name, email,
links) and the hero/about copy come from `src/data/consts.ts` — never
hard-code them in a component.

**Interactivity without React.** Nav, theme toggle, command palette and the
project filter are plain `<script>` blocks in their `.astro` files (bundled by
Vite, so they can import from `@/lib`). React is only hydrated for
`CopyButton`, the toaster and Google Analytics — keep the home page at three
islands. View transitions are the native cross-document kind (CSS only), so
every page load re-runs these scripts; do not add Astro's `<ClientRouter>`.

**Agent-readable layer.** `/llms.txt` indexes the site and every project,
post and the experience page has a `.md` twin, generated at build time from
the collections (`src/lib/markdown.ts` strips MDX-only syntax). A new
collection or detail route needs its `.md` endpoint and an entry in
`llms.txt.ts`; a new MDX component needs a rule in `mdxToMarkdown`.

**Content schema** (`src/content.config.ts`):

- `projects`: `title`, `description`, `pubDate`, `author`, `tech[]`, `slug`,
  `order`, `featured`, `showOnHomePage`, `github`/`live` plus
  `githubDisable`/`liveDisable`, optional `heroImg` (cover screenshot, path
  relative to the MDX file — leave it out for a typographic cover),
  optional `outcome` (one measured result, shown on cards),
  `projectCategories[]` (`ai` · `full-stack` · `frontend` · `open-source`;
  drives the filter on `/projects` and the green `AI` chip).
- `blog`: same shape, but the featured flag is **`isFeatured`**, not `featured`.
  The "Featured Post" block only renders once there are more than three posts.
- `experience`: **one `.md` file per role or event** — `role`, `company`,
  `companyUrl`, `start`, `end` (`"YYYY-MM"` or `"YYYY"`, quoted), `type`,
  `mode`, `location`, `links[]`; the body is the bullet list. The entry with
  **no `end`** is the current role: it feeds the home hero, the status pill,
  the "now" and "based in" cells and the `Person` JSON-LD.

Unknown frontmatter keys are silently dropped by zod, so a misspelled key
fails quietly. Always set `slug` explicitly: detail routes fall back to a
slugified title, but the home project cards link to `data.slug` directly.

Sorting, slugs and "which role is current" live in `src/lib/content.ts`; use
those helpers instead of re-sorting a collection in a page.

MDX files may import components (`PostButton`, `CodeBlockWithCopy`); images
sit next to the MDX file and are referenced relatively so Astro optimises them.

## Styling rules

- Tailwind v4 is configured **in CSS**. Design tokens are CSS variables in
  `src/styles/global.css`, exposed to utilities by the `@theme inline` block.
  `tailwind.config.mjs` is a leftover from v3 and is not loaded — do not add
  theme values there.
- Use semantic token utilities: `bg-background`, `text-foreground`,
  `text-muted-foreground`, `border-border`, `bg-card`, `bg-primary`…
  Do **not** introduce raw palette classes (`bg-gray-50`, `text-blue-600`,
  `bg-white`) or hex literals (`text-[#2fafda]`). They bypass the theme and
  break dark mode. Existing occurrences are debt being removed, not precedent.
- If a design needs a colour, size or radius that has no token, add the token
  to `global.css` first, then use it.
- Dark is the primary theme and light is a first-class alternative. Check
  every visual change in both. `<html>` ships with `class="dark"`; an inline
  script in `BaseLayout` removes it when `localStorage.theme === "light"`.
  Toggle through `src/lib/theme.ts`, never by touching the class directly.
- Green is `--brand`. For green **text** always use `text-brand-ink`: in the
  light theme `--brand` only reaches 3.2:1 and is for shapes. `--accent`
  keeps its shadcn meaning (hover surface) and is not the brand colour.
- Type roles are utilities defined in `@theme`: `text-display`,
  `text-page-title`, `text-lead`, `text-h2`, `text-h3`, `text-meta`,
  `text-label`. Mono (`font-mono`) is for annotations only — dates, tech,
  paths, key caps. Page container is `wrap`; a card surface is `surface`.
- The dot-grid backdrop appears once, in the hero. Do not reuse it.
- In `.astro` files style links as buttons with `buttonVariants()`; `<Button
  asChild>` only works inside React trees.
- Give every grid an explicit base column (`grid-cols-1`): an implicit `auto`
  track grows to its content and causes horizontal scroll on phones.
- No purple/blue gradients, glassmorphism stacks, sparkle icons, looping
  typewriter effects or fake terminal windows. Anything that signals "AI"
  must be a working feature, not decoration.
- Compose classes with `cn()` from `@/lib/utils`. Variants go through `cva`,
  as in `components/ui/button.tsx`.
- Add shadcn components with `pnpm dlx shadcn@latest add <name>` so they match
  `components.json`.
- Mobile first. Every page must work at 320px with no horizontal scroll.
- Respect `prefers-reduced-motion` for any animation you add.
- Accessibility is part of the design: one `h1` per page, headings in order,
  visible focus states, WCAG AA contrast (4.5:1 body text), `alt` on images,
  `aria-label` on icon-only controls, `rel="noopener noreferrer"` on
  `target="_blank"` links.

The visual direction, token values and component specs are defined in
`docs/plans/` — read the current redesign plan before changing how anything
looks, and keep new UI consistent with it.

## Tests are a contract on copy and structure

The Playwright specs select by **role and visible text**. These strings are
load-bearing; changing them means updating `e2e/` in the same change:

- Page titles: `Zhenhao Yang's portfolio`, `My Projects | …`, `My Blogs | …`,
  `Working Experience | …`
- Headings: `ZHENHAO YANG`, `Skills & Technologies` (+ the four category
  names), `Recent Projects`, `Let's Work Together`, `Projects`,
  `Featured Project`, `All Projects`, `Blog`, `All Posts`,
  `404 - Page Not Found`
- Links: `View My Work` (→ `/#projects`), `Get In Touch` (→ `/#contact`),
  `View All Projects`, `Go to Home`, `Back to blogs` / `Back to projects`,
  `PREV` / `NEXT`, nav items `About` · `Projects` · `Experience` · `Blogs`,
  and the logo link named `Zhenhao Yang's portfolio`
- Footer: `GitHub` / `LinkedIn` / `Email` links (accessible names) and
  `© <year> Zhenhao Yang` in a single element
- Section anchors `#projects` and `#contact` on the home page
- Shell (`e2e/shell.spec.ts`): the prompt bar button text
  `Search projects, posts, actions…`, the dialog name `Command palette`, the
  empty-state sentence starting `Nothing matches that.`, the buttons
  `Toggle colour theme`, `Open menu`, `Copy as Markdown`, and the mobile
  `<nav aria-label="Mobile">`
- Projects filter buttons `All` / `AI` and the `data-project-list` hook;
  the `?category=` query parameter

Playwright runs in strict mode and `getByText` matches case-insensitive
substrings **including hidden DOM**, so a tested string must appear **once**
per page. On the home page that means `Full-Stack Engineer` (do not write
"full-stack engineer" in a tagline or a second card) and the email address;
on `/experience` the role and company names. The command palette is in the
DOM of every page: keep job titles and the email address out of its visible
text (the email travels in a `data-` attribute). Icon links on project cards
are named `Source code` / `Live site` with `aria-describedby` pointing at the
title, so that the project title names exactly one link.

Desktop nav links must be inside a `<nav>` element. URLs and slugs
(`/projects/personal-website`, `/blog/css-tricks-flexbox`) are public and
indexed — do not rename them.

`src/components/__tests__/Button.test.tsx` asserts specific classes on the
shadcn button (`bg-primary`, `border`, `h-8`, `h-10`). The helpers in
`src/lib/` (`fuzzy`, `markdown`, `date`) have unit tests next to it.

## Known issues and traps

Verified in the current code; fix them when you are working nearby, and
mention it in your summary.

- **`ui/card.tsx` and `ui/badge.tsx` are no longer imported.** They are shadcn
  primitives kept for future use; delete them if they are still unused when
  you next touch `components/ui/`.
- **`reviseDate: null` in frontmatter** is accepted (`.nullish()`). Do not
  switch it back to `.optional()`: coercing `null` yields 1970-01-01.
- **`pubDate` of TaxAgentServer and MTLove is the first of the month** — only
  the month is known. Project dates are rendered month-only for that reason.
- **Experience sub-projects say "– Present"** (WatsonBio, Insurfact) inside a
  contract that ended Jan 2026. This is the owner's copy; ask before changing.
- **`SITE_DESCRIPTION`** (meta description) still says "full-stack developer"
  and predates the AI positioning. It is SEO copy: change only when asked.
- **Google Analytics loads unconditionally** (`analyticsEnabled` is always
  `true` in `GoogleAnalytic.tsx`); there is no consent handling.
- **The command palette has no "Ask" backend.** Its empty state says natural
  language questions are coming; do not wire it to a model without the
  owner choosing a provider and approving `wrangler.jsonc` changes.
- **`scripts/make-brand-assets.mjs` needs Google Chrome installed** and
  repeats the dark-theme colour values; rerun it if the name, tagline or
  brand colour changes.
- `ChristmasSnow.tsx` is a seasonal toggle left commented out in
  `BaseLayout.astro` on purpose; it still uses raw palette classes.

## Boundaries

- `wrangler.jsonc` is git-ignored and holds deployment routing. Do not commit
  it, print it, or change it without being asked.
- Do not change the Google Analytics ID, the site URL in `astro.config.mjs`,
  `robots.txt`, or canonical/OG tags as a side effect of visual work.
- Do not invent facts about the owner — job titles, dates, metrics, years of
  experience. All such copy comes from `src/content/` and `src/data/`; if a
  design needs a number that is not there, ask.
- Do not add dependencies for things CSS or the platform already does
  (animations, scroll effects, simple toggles). Justify any new package.
- Work on a branch; `main` is what is deployed. Commit only when asked. Use
  short imperative commit subjects, as in the existing history.
- `dist/`, `.astro/`, `coverage/`, `test-results/`, `playwright-report/` are
  generated output — never edit or commit them.
