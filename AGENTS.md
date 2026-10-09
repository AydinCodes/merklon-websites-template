<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# This is a Merklon site

Every Merklon site is one simple, shareable idea, with the same look, logo and
footer. **Follow `node_modules/@merklon/ui/PHILOSOPHY.md`** (loaded via
CLAUDE.md). It decides how things look, move, read and behave.

## Stack: keep it this small

- Next.js (App Router, `src/`), TypeScript, Bun.
- UI: `@merklon/ui` for tokens and components, plus a plain `.css` file next to
  each page that uses only `--mk-*` tokens. **No Tailwind, no CSS-in-JS, no
  other UI or animation libraries.** One styling system means sites can't
  drift from the design system.
- Dependencies are deliberately few: `next`, `react`, `react-dom`,
  `@merklon/ui` and two fonts. Ask before adding anything else, and say why.
- Site identity (name, tagline, URL) lives only in `src/site.ts`. Metadata,
  the share image and the home page read from it.

## Fresh copy of the template? Set it up first

If `src/site.ts` still says `"Merklon Site"`, this is an unconfigured copy:

1. Ask the user for the site's **name**, its **one-line tagline** and its
   **production URL** (suggest `https://<slug>.merklon.com`).
2. `bun install`
3. `bun run new-site --name "…" --tagline "…" --url https://…`
4. `bun run upgrade` to get the latest Next.js, packages and Merklon UI, then
   `bun run build`. It must pass.
5. Git. Every site gets its own **private** repo named **`merklon-<slug>`**
   (e.g. `merklon-exif`), created with the GitHub CLI, which is installed and
   logged in. If the folder was cloned from the template, `origin` points at the
   template:
   ```bash
   git remote rename origin template        # keep it, for template:update
   git add -A && git commit -m "Start <Name>"
   gh repo create AydinCodes/merklon-<slug> --private --source . --remote origin --push
   ```
   If it came from a zip instead (no `.git`), first run `git init -b main`,
   `git remote add template https://github.com/AydinCodes/merklon-websites-template.git`,
   `git fetch template`, then `git merge template/main --allow-unrelated-histories`,
   then the commit and `gh repo create` above.
6. Replace the placeholder `<main>` in `src/app/page.tsx` with the site's idea.
   Keep `<MerklonFooter />`.

## Keeping up to date

| Command | What it does |
| --- | --- |
| `bun run upgrade` | Latest Next.js (`next upgrade` also runs its codemods), then `bun update` for everything else, including the latest Merklon UI. Then `bun run build`, check, commit. |
| `bun run ui:update` | Just the latest Merklon UI. |
| `bun run template:update` | Merges improvements made to the template since this site was created. On conflicts, keep this site's own content (site.ts, pages) and take the template's shared setup. |

## Changing shared things

- **A component, token or the philosophy** lives in `../merklon-ui`.
  Run `bun run ui:link`, edit there, then follow
  `node_modules/@merklon/ui/SETUP.md` section 4 (commit and push the
  components repo, then `bun run ui:update`).
- **Something every future site should start with** (config, layout, scripts,
  this file) belongs in the template, not just this site. Edit
  `../merklon-websites-template` (if missing, clone it there:
  `git clone https://github.com/AydinCodes/merklon-websites-template.git`),
  run `bun run build` there, then commit and **push to its `main`**. Then run
  `bun run template:update` in this site and the others.
- **Never push this site's own work to the `template` remote.**

## Phones: nothing in the page is as tall as the screen

Some phone browsers (Brave on iPhone, for one) resize the whole page while
their toolbar slides in and out as you scroll. Every screen-height measure
follows: `vh`, `svh`, `dvh`, `lvh` and `window.innerHeight`. Anything in the
page sized from the screen's height grows and shrinks with it, and
everything below it jumps up and down.

- **Up to 768px wide, nothing in the page flow takes its height or
  min-height from the screen.** It is as tall as its content. `.page` in
  `src/app/page.css` already does this; keep it, and do the same for any
  full-screen hero or section you add.
- Layers above the page (`position: fixed`, dialogs, a full-screen viewer)
  may fill the screen: they don't push anything.
- For page content, this overrides "Use `100dvh`, not `100vh`" in
  PHILOSOPHY.md.
- Don't swap in another unit or trick. `svh`, `100vh`,
  `-webkit-fill-available`, making the body scroll instead of the page, and
  a height measured once in JavaScript were all tried on merklon-thumbnails
  (October 2026); the page still jumped in Brave, because the page itself
  changes size.

## Before shipping

Run the checklist at the end of PHILOSOPHY.md: phone and desktop, light and
dark, keyboard only, reduced motion, share image (`/opengraph-image`) and 404.
