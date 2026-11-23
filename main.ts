// Office Jokes — one-line entry for make.fun bounty
// u-agentfid001-make-the-ai-judge-laugh-office-jokes-dfd55a5a
//
// Writes a single one-line office joke to /output/entry.txt.
// Gate: UTF-8 text, 1-199 characters, non-blank, a single line.

import { mkdirSync, writeFileSync } from "node:fs";
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
console.log(`wrote ${JOKE.length} characters to ${outPath}`);
