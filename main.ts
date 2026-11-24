import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Gate: 1-200 characters, a single line, not only whitespace.
// Local run: node main.ts out  (or MAKEFUN_OUTPUT_DIR=out node main.ts)
const ENTRY =
  "Won't be in — the smoke alarm's been chirping every 40 seconds all night and I'm on a chair with a screwdriver, so at this point one of us is getting replaced.";

const args = process.argv.slice(2);

if (args.includes("--help") || args.includes("-h")) {
  console.log("Usage: node main.ts [outDir]");
  console.log("Writes the sick-day excuse line to <outDir>/entry.txt.");
  console.log("outDir resolves to: arg, then MAKEFUN_OUTPUT_DIR, then /output.");
  process.exit(0);
}

const outDir = args[0] ?? process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const length = [...ENTRY].length;
if (length < 1) {
  console.error("entry is empty");
  process.exit(1);
}
if (length > 200) {
  console.error(`entry is ${length} characters; max is 200`);
  process.exit(1);
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  console.error("entry must be a single line");
  process.exit(1);
}
if (ENTRY.trim().length === 0) {
  console.error("entry is only whitespace");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");
console.log(`wrote ${outPath} (${length} chars)`);
