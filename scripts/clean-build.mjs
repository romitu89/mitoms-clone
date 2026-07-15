import { rm } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const generatedPaths = [".next", "out", "tsconfig.tsbuildinfo"];

for (const generatedPath of generatedPaths) {
  await rm(path.join(projectRoot, generatedPath), {
    recursive: true,
    force: true,
  });
}

console.log("Removed stale Next.js and TypeScript build files.");
