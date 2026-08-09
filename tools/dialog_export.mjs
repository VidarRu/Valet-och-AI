// Exporterar all spelardialog till en JSON-rad-lista som Python-skriptet
// sedan gör om till en Excel-fil. Se tools/dialog_parser.mjs för hur
// texterna hittas i källfilerna.
import { readFileSync } from 'node:fs';
import { parseFile } from './dialog_parser.mjs';

const FILES = [
  'data/index.js',
  'data/nearmiss.js',
  'data/modules/polarization.js',
  'data/modules/discredit.js',
  'data/modules/trolling.js',
  'data/modules/conspiracy.js',
  'data/modules/emotion.js',
  'data/modules/impersonation.js',
  'data/deep/polarization.js',
  'data/deep/discredit.js',
  'data/deep/trolling.js',
  'data/deep/conspiracy.js',
  'data/deep/emotion.js',
  'data/deep/impersonation.js',
];

function fieldName(path) {
  const parts = path.split('>');
  const last = parts[parts.length - 1];
  const m = last.match(/^(\w+)\[(\d+)\]$/);
  if (m) return m[1]; // array-of-strings: fältet heter t.ex. "realWorld", inte indexet
  return last;
}

function humanBreadcrumb(path) {
  const parts = path.split('>');
  return parts
    .map((p) => {
      const m = p.match(/^(\w+)\[(\d+)\]$/);
      if (m) return `${m[1]} ${Number(m[2]) + 1}`;
      return p;
    })
    .filter((p) => p !== 'default')
    .join(' › ');
}

const out = [];
for (const file of FILES) {
  const src = readFileSync(file, 'utf8');
  const rows = parseFile(src);
  for (const r of rows) {
    out.push({
      file,
      key: `${file}::${r.path}`,
      path: r.path,
      breadcrumb: humanBreadcrumb(r.path),
      field: fieldName(r.path),
      text: r.value,
    });
  }
}

process.stdout.write(JSON.stringify(out, null, 0));
