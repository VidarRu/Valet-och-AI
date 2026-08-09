// Läser redigerade rader (JSON: [{key, text}, ...], key = "fil::path") från
// stdin och skriver tillbaka texten till exakt samma position i källfilen
// som dialog_export.mjs hittade den på. Filerna parsas på nytt här (inte
// återanvänt från export) så att import alltid matchar filernas nuvarande
// innehåll.
import { readFileSync, writeFileSync } from 'node:fs';
import { parseFile, encodeJsString } from './dialog_parser.mjs';

const input = JSON.parse(readFileSync(0, 'utf8'));

const byFile = new Map();
for (const row of input) {
  const sep = row.key.indexOf('::');
  const file = row.key.slice(0, sep);
  const path = row.key.slice(sep + 2);
  if (!byFile.has(file)) byFile.set(file, []);
  byFile.get(file).push({ path, text: row.text });
}

let changedFiles = 0;
let changedFields = 0;
let unmatched = [];

for (const [file, edits] of byFile) {
  const src = readFileSync(file, 'utf8');
  const rows = parseFile(src);
  const byPath = new Map(rows.map((r) => [r.path, r]));

  const replacements = [];
  for (const edit of edits) {
    const orig = byPath.get(edit.path);
    if (!orig) {
      unmatched.push(`${file}::${edit.path}`);
      continue;
    }
    if (orig.value === edit.text) continue; // oförändrad
    replacements.push({ start: orig.start, end: orig.end, text: encodeJsString(edit.text) });
  }

  if (!replacements.length) continue;
  replacements.sort((a, b) => b.start - a.start); // sist i filen först, så offsets inte förskjuts
  let next = src;
  for (const r of replacements) {
    next = next.slice(0, r.start) + r.text + next.slice(r.end);
  }
  writeFileSync(file, next, 'utf8');
  changedFiles++;
  changedFields += replacements.length;
}

if (unmatched.length) {
  console.error(`VARNING: ${unmatched.length} rad(er) kunde inte matchas mot källkoden (borttagen/ändrad nyckel?):`);
  for (const u of unmatched.slice(0, 20)) console.error('  ' + u);
}
console.log(`Klart: ${changedFields} textfält ändrade i ${changedFiles} fil(er).`);
