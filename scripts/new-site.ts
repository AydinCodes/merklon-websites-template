/**
 * Turns a fresh copy of the template into a named site.
 *
 *   bun run new-site --name "Exif" --tagline "See what your photos reveal about you." --url https://exif.merklon.com
 *
 * Fills in src/site.ts, package.json and README.md. Creating the private
 * GitHub repo (merklon-<slug>) is the next step in AGENTS.md.
 */
import { readFile, writeFile } from "node:fs/promises";
import { parseArgs } from "node:util";

const { values } = parseArgs({
  args: process.argv.slice(2),
  options: {
    name: { type: "string" },
    tagline: { type: "string" },
    url: { type: "string" },
    slug: { type: "string" },
  },
});

const { name, tagline, url } = values;
if (!name || !tagline || !url) {
  console.error('Usage: bun run new-site --name "Exif" --tagline "One line." --url https://exif.merklon.com [--slug exif]');
  process.exit(1);
}

const slug =
  values.slug ??
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
const repo = `merklon-${slug}`;
const cleanUrl = url.replace(/\/+$/, "");
const quote = (value: string) => JSON.stringify(value);

// src/site.ts
const sitePath = "src/site.ts";
let siteFile = await readFile(sitePath, "utf8");
siteFile = siteFile
  .replace(/name: ".*?",/, `name: ${quote(name)},`)
  .replace(/tagline: ".*?",/, `tagline: ${quote(tagline)},`)
  .replace(/url: ".*?",/, `url: ${quote(cleanUrl)},`);
await writeFile(sitePath, siteFile);

// package.json
const pkg = JSON.parse(await readFile("package.json", "utf8"));
pkg.name = repo;
pkg.version = "0.1.0";
await writeFile("package.json", JSON.stringify(pkg, null, 2) + "\n");

// README.md
await writeFile(
  "README.md",
  `# ${name}

${tagline}

A Merklon site, made from [merklon-websites-template](https://github.com/AydinCodes/merklon-websites-template).
Live at ${cleanUrl}.

\`\`\`bash
bun install
bun dev
\`\`\`

See AGENTS.md for updating packages, Next.js, Merklon UI and the template.
`
);

console.log(`Named the site "${name}". Repo: ${repo}

Next:
  git remote rename origin template
  git add -A && git commit -m "Start ${name}"
  gh repo create AydinCodes/${repo} --private --source . --remote origin --push`);
