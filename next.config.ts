import fs from "node:fs";
import path from "node:path";
import type { NextConfig } from "next";

/*
 * While you're editing Merklon UI from this project (`bun run ui:link`),
 * node_modules/@merklon/ui is a symlink to ../merklon-ui. Turbopack only
 * resolves files inside its root, so widen the root to the shared parent
 * folder — only then. Normal installs and Vercel builds are untouched.
 */
const uiIsLinked =
  fs.lstatSync(path.join(process.cwd(), "node_modules/@merklon/ui"), { throwIfNoEntry: false })?.isSymbolicLink() ?? false;

const nextConfig: NextConfig = {
  // Merklon UI ships TypeScript source from GitHub; Next compiles it.
  transpilePackages: ["@merklon/ui"],
  ...(uiIsLinked && { turbopack: { root: path.resolve(process.cwd(), "..") } }),
};

export default nextConfig;
