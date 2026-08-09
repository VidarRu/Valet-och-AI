// Litet JS-literal-parser för dialogexport/import.
//
// Filerna i data/ är begränsade till ett tydligt delspråk av JavaScript:
// export default / export const-satser vars värde är en literal (objekt,
// array, sträng, tal, +/-tal eller identifierare). Det räcker med en enkel
// tokeniserare + recursive-descent-parser för att hitta varje strängs
// exakta position i källfilen, vilket krävs för att kunna skriva tillbaka
// redigerad text på precis samma plats.
//
// Nycklar som INTE räknas som spelardialog (maskin-/UI-data, inte text att
// redigera): id, type, badge, handle, author, tool, next, bonus.
export const EXCLUDE_KEYS = new Set(['id', 'type', 'badge', 'handle', 'author', 'tool', 'next', 'bonus']);

function tokenize(src) {
  const tokens = [];
  let i = 0;
  const n = src.length;
  while (i < n) {
    const c = src[i];
    if (c === ' ' || c === '\t' || c === '\n' || c === '\r') { i++; continue; }
    if (c === '/' && src[i + 1] === '/') {
      while (i < n && src[i] !== '\n') i++;
      continue;
    }
    if (c === '/' && src[i + 1] === '*') {
      i += 2;
      while (i < n && !(src[i] === '*' && src[i + 1] === '/')) i++;
      i += 2;
      continue;
    }
    if (c === '\'' || c === '"') {
      const quote = c;
      const start = i;
      i++;
      let value = '';
      while (i < n && src[i] !== quote) {
        if (src[i] === '\\') {
          value += src[i] + src[i + 1];
          i += 2;
        } else {
          value += src[i];
          i++;
        }
      }
      i++; // closing quote
      tokens.push({ type: 'STRING', raw: src.slice(start, i), value: decodeJsString(value), start, end: i, quote });
      continue;
    }
    if (/[0-9]/.test(c)) {
      const start = i;
      while (i < n && /[0-9.]/.test(src[i])) i++;
      tokens.push({ type: 'NUMBER', raw: src.slice(start, i), start, end: i });
      continue;
    }
    if (/[A-Za-z_$]/.test(c)) {
      const start = i;
      while (i < n && /[A-Za-z0-9_$]/.test(src[i])) i++;
      tokens.push({ type: 'IDENT', raw: src.slice(start, i), start, end: i });
      continue;
    }
    if ('{}[]:,()=;+-'.includes(c)) {
      tokens.push({ type: 'PUNCT', raw: c, start: i, end: i + 1 });
      i++;
      continue;
    }
    // Okänt tecken (borde inte hända i det här delspråket) - hoppa över.
    i++;
  }
  return tokens;
}

function decodeJsString(escaped) {
  return escaped.replace(/\\(.)/g, (_, ch) => {
    if (ch === 'n') return '\n';
    if (ch === 't') return '\t';
    return ch; // \' \" \\ etc.
  });
}

export function encodeJsString(value) {
  const escaped = value
    .replace(/\\/g, '\\\\')
    .replace(/'/g, '\\\'')
    .replace(/\n/g, '\\n');
  return `'${escaped}'`;
}

// Parsear en literal (objekt/array/sträng/tal/identifierare) från tokens[i..].
// Returnerar { rows, nextIndex } där rows är alla strängblad som hittades,
// med path/key/start/end.
function parseValue(tokens, i, path) {
  const t = tokens[i];
  if (!t) throw new Error('Oväntat filslut vid parsning av ' + path);

  if (t.type === 'PUNCT' && t.raw === '{') {
    const rows = [];
    i++;
    while (tokens[i] && !(tokens[i].type === 'PUNCT' && tokens[i].raw === '}')) {
      const keyTok = tokens[i];
      const key = keyTok.type === 'STRING' ? keyTok.value : keyTok.raw;
      i++;
      if (tokens[i] && tokens[i].type === 'PUNCT' && tokens[i].raw === ':') i++;
      const childPath = path ? `${path}>${key}` : key;
      const res = parseValue(tokens, i, childPath);
      for (const r of res.rows) rows.push(r);
      i = res.nextIndex;
      if (tokens[i] && tokens[i].type === 'PUNCT' && tokens[i].raw === ',') i++;
    }
    i++; // consume '}'
    return { rows, nextIndex: i };
  }

  if (t.type === 'PUNCT' && t.raw === '[') {
    const rows = [];
    let idx = 0;
    i++;
    while (tokens[i] && !(tokens[i].type === 'PUNCT' && tokens[i].raw === ']')) {
      const childPath = `${path}[${idx}]`;
      const res = parseValue(tokens, i, childPath);
      for (const r of res.rows) rows.push(r);
      i = res.nextIndex;
      idx++;
      if (tokens[i] && tokens[i].type === 'PUNCT' && tokens[i].raw === ',') i++;
    }
    i++; // consume ']'
    return { rows, nextIndex: i };
  }

  if (t.type === 'STRING') {
    const key = path.split(/[>[]/).pop().replace(']', '');
    const rows = EXCLUDE_KEYS.has(key) ? [] : [{ path, key, start: t.start, end: t.end, value: t.value }];
    return { rows, nextIndex: i + 1 };
  }

  if (t.type === 'NUMBER') {
    return { rows: [], nextIndex: i + 1 };
  }

  if (t.type === 'PUNCT' && (t.raw === '+' || t.raw === '-')) {
    // unärt förtecken framför tal, t.ex. `visibility: +20`
    return { rows: [], nextIndex: i + 2 };
  }

  if (t.type === 'IDENT') {
    // true/false eller en identifierare (t.ex. referens till en importerad modul)
    return { rows: [], nextIndex: i + 1 };
  }

  throw new Error(`Okänd token vid ${path}: ${JSON.stringify(t)}`);
}

// Delar upp toppnivå-satser (avgränsade av ';' på djup 0) och plockar ut
// `export default EXPR` / `export const NAME = EXPR`.
export function parseFile(src) {
  const tokens = tokenize(src);
  const statements = [];
  let depth = 0;
  let stmtStart = 0;
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (t.type === 'PUNCT' && '{[('.includes(t.raw)) depth++;
    if (t.type === 'PUNCT' && '}])'.includes(t.raw)) depth--;
    if (t.type === 'PUNCT' && t.raw === ';' && depth === 0) {
      statements.push(tokens.slice(stmtStart, i));
      stmtStart = i + 1;
    }
  }
  if (stmtStart < tokens.length) statements.push(tokens.slice(stmtStart));

  const allRows = [];
  for (const stmt of statements) {
    if (!stmt.length) continue;
    if (!(stmt[0].type === 'IDENT' && stmt[0].raw === 'export')) continue;
    if (stmt[1] && stmt[1].type === 'IDENT' && stmt[1].raw === 'default') {
      const res = parseValue(stmt, 2, 'default');
      allRows.push(...res.rows);
    } else if (stmt[1] && stmt[1].type === 'IDENT' && stmt[1].raw === 'const') {
      const name = stmt[2].raw;
      // stmt[3] ska vara '='
      const res = parseValue(stmt, 4, name);
      allRows.push(...res.rows);
    }
    // `export { x } from '...'` och rena `import ...` ignoreras (ingen dialog).
  }
  return allRows;
}
