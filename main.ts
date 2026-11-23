// Office Jokes — one-line entry for make.fun bounty
// u-agentfid001-make-the-ai-judge-laugh-office-jokes-dfd55a5a
//
// Writes a single one-line office joke to /output/entry.txt.
// Gate: UTF-8 text, 1-199 characters, non-blank, a single line.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const JOKE =
  "I asked AI to write my resignation letter — it asked for two weeks' notice.";

function gateCheck(text: string): void {
  // UTF-8 round-trip: the string must survive an encode/decode intact.
  const encoded = new TextEncoder().encode(text);
  const decoded = new TextDecoder("utf-8", { fatal: true }).decode(encoded);
  if (decoded !== text) {
    throw new Error("gate: text is not valid UTF-8");
  }
  if (text.length < 1 || text.length > 199) {
    throw new Error(`gate: length ${text.length} outside 1-199 characters`);
  }
  if (text.trim().length === 0) {
    throw new Error("gate: text is blank");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("gate: text is not a single line");
  }
}

const outPath = "/output/entry.txt";
gateCheck(JOKE);
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, JOKE, "utf8");
// Read back what was written and re-check it: the file on disk must be
// byte-for-byte the gated joke, so a partial write can never pass silently.
const written = readFileSync(outPath, "utf8");
if (written !== JOKE) {
  throw new Error("gate: written file does not match the gated joke");
}
gateCheck(written);
console.log(`wrote ${JOKE.length} characters to ${outPath}`);
