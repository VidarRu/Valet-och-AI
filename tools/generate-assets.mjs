#!/usr/bin/env node
// Genererar porträtt (assets/portraits/), institutionslogotyper
// (assets/logos/) och start-/slutrutans hero-illustrationer
// (assets/screens/) via en bildmodell på OpenRouter, enligt manifestet i
// tools/assets/manifest.mjs.
//
// Körs LOKALT hos dig, aldrig i något delat verktyg — nyckeln ska bara
// finnas i din egen miljövariabel.
//
// Användning:
//   export OPENROUTER_API_KEY=sk-or-v1-...
//   node tools/generate-assets.mjs                 # genererar allt som saknas
//   node tools/generate-assets.mjs --force          # regenererar även befintliga filer
//   node tools/generate-assets.mjs --only=veralind  # bara en enskild post (handle)
//   node tools/generate-assets.mjs --dry            # skriv bara ut prompterna, anropa inget
//   OPENROUTER_IMAGE_MODEL=... node tools/generate-assets.mjs   # annan modell
//
// Modellen måste stödja bild-utdata via OpenRouters chat/completions-endpoint
// (modalities: ["image", "text"]). Kontrollera aktuellt utbud på
// openrouter.ai/models (filtrera på "output: image") innan du kör — vilken
// modell som är bäst/billigast ändras över tid.

import { mkdir, writeFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { portraits, logos, media, screens } from './assets/manifest.mjs';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const DEFAULT_MODEL = 'google/gemini-2.5-flash-image-preview';

const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const opt = (name) => {
  const hit = args.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : null;
};

const DRY = flag('dry');
const FORCE = flag('force');
const ONLY = opt('only');
const MODEL = opt('model') || process.env.OPENROUTER_IMAGE_MODEL || DEFAULT_MODEL;

async function exists(p) {
  try { await access(p); return true; } catch { return false; }
}

async function generateOne({ handle, name, prompt }, kind) {
  const dir = path.join(ROOT, 'assets', kind === 'portrait' ? 'portraits' : kind === 'logo' ? 'logos' : kind === 'screen' ? 'screens' : 'media');
  const file = path.join(dir, `${handle}.png`);

  if (!FORCE && await exists(file)) {
    console.log(`= ${handle} (${name}) — finns redan, hoppar (--force för att skriva över)`);
    return;
  }

  console.log(`… ${handle} (${name})`);
  if (DRY) {
    console.log(`  prompt: ${prompt}\n`);
    return;
  }

  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      modalities: ['image', 'text'],
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`${handle}: OpenRouter svarade ${res.status} ${res.statusText}\n${body.slice(0, 500)}`);
  }

  const data = await res.json();
  const images = data?.choices?.[0]?.message?.images;
  const dataUrl = images?.[0]?.image_url?.url;
  if (!dataUrl || !dataUrl.startsWith('data:')) {
    throw new Error(`${handle}: inget bilddata i svaret — kontrollera att modellen "${MODEL}" faktiskt stödjer bild-utdata.\n${JSON.stringify(data).slice(0, 500)}`);
  }

  const base64 = dataUrl.slice(dataUrl.indexOf(',') + 1);
  await mkdir(dir, { recursive: true });
  await writeFile(file, Buffer.from(base64, 'base64'));
  console.log(`  ✓ sparad: ${path.relative(ROOT, file)}`);
}

async function main() {
  if (!DRY && !process.env.OPENROUTER_API_KEY) {
    console.error('Sätt OPENROUTER_API_KEY i din miljö innan du kör (se filens topp för instruktioner).');
    process.exit(1);
  }

  console.log(`Modell: ${MODEL}${DRY ? '  (torrkörning — inga anrop görs)' : ''}\n`);

  const jobs = [
    ...portraits.map((p) => [p, 'portrait']),
    ...logos.map((l) => [l, 'logo']),
    ...media.map((m) => [m, 'media']),
    ...screens.map((s) => [s, 'screen']),
  ].filter(([entry]) => !ONLY || entry.handle === ONLY);

  if (jobs.length === 0) {
    console.error(`Ingen post matchar --only=${ONLY}`);
    process.exit(1);
  }

  let failed = 0;
  for (const [entry, kind] of jobs) {
    try {
      await generateOne(entry, kind);
    } catch (err) {
      failed++;
      console.error(`✗ ${err.message}`);
    }
  }

  if (failed > 0) {
    console.error(`\n${failed} bild(er) misslyckades. Kör igen med --only=<handle> för att försöka om enskilda.`);
    process.exit(1);
  }
  console.log('\nKlart.');
}

main();
