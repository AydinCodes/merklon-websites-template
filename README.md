# Merklon websites template

The starting point for every Merklon site: Next.js and Bun, with
[Merklon UI](https://github.com/AydinCodes/merklon-ui) already wired up
(theme script, fonts, footer, 404, favicon, share image), and instructions
that Claude Code follows automatically.

## Start a new site

From your projects folder, **clone; don't download the zip**. A clone remembers
where it came from, so the site can pull later template improvements with one
command. A zip has no git history, so it can't.

```bash
cd ~/Documents/Projects/merklon
git clone https://github.com/AydinCodes/merklon-websites-template.git my-new-site
cd my-new-site
claude
```

Then tell Claude: **"Set this up as a new site."** It reads `AGENTS.md`, asks
for the name, tagline and URL, renames everything, upgrades Next.js and the
packages, re-points git at the site's own repo, and builds.

## Keep sites up to date

- `bun run upgrade`: latest Next.js plus all packages, including Merklon UI.
- `bun run ui:update`: just Merklon UI.
- `bun run template:update`: pull improvements to this template into a site.

## Improve the template

Change it here, in this repo, and push to `main`. Then run
`bun run template:update` in each site. When Claude is working in a site and
finds something every site should have, `AGENTS.md` tells it to make the change
here as well.
