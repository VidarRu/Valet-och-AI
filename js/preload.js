// Förladdar bilder i bakgrunden så spelaren inte hinner se den färgade
// initial-cirkeln blinka till innan avataren/loggan faktiskt laddat in.
// Går igenom spelets innehåll (samma data engine.js/render.js redan
// använder) och samlar alla porträtt-/logo-handlar samt medie-bilder som
// förekommer, och startar en tyst nätverksförfrågan för var och en redan
// innan spelaren når dem — de flesta hinner ligga i webbläsarens cache
// innan motsvarande kort visas.

import { mediaHandle } from './render.js';

function visitStep(step, handles, mediaTools) {
  if (step.type === 'post') handles.add(step.handle);
  if (step.type === 'choice') {
    for (const option of step.options ?? []) {
      const terminal = option.terminal;
      if (!terminal) continue;
      if (terminal.result?.handle) handles.add(terminal.result.handle);
      for (const reaction of terminal.reactions ?? []) handles.add(reaction.handle);
      if (terminal.tool) mediaTools.add(terminal.tool);
    }
  }
}

function visitModule(module, handles, mediaTools) {
  for (const scenario of module.scenarios ?? []) {
    for (const step of scenario.steps ?? []) visitStep(step, handles, mediaTools);
  }
}

function preloadImage(src) {
  const img = new Image();
  img.src = src;
}

export function preloadAssets({ core = [], deep = [], prologue = null, nearMiss = null }) {
  const handles = new Set();
  const mediaTools = new Set();

  for (const module of [...core, ...deep]) visitModule(module, handles, mediaTools);
  if (prologue) visitModule(prologue, handles, mediaTools);
  for (const scene of nearMiss?.scenes ?? []) {
    if (scene?.denial?.handle) handles.add(scene.denial.handle);
  }

  for (const rawHandle of handles) {
    const key = rawHandle.replace(/^[@#]/, '');
    // Handeln kan höra hemma i endera mappen — okänt vilken härifrån, så
    // vi provar båda. Den som inte finns 404:ar tyst, precis som render.js
    // redan tolererar i sin egen fallback-kedja.
    preloadImage(`assets/portraits/${key}.png`);
    preloadImage(`assets/logos/${key}.png`);
  }
  for (const tool of mediaTools) {
    const handle = mediaHandle(tool);
    if (handle) preloadImage(`assets/media/${handle}.png`);
  }

  preloadImage('assets/screens/start.png');
  preloadImage('assets/screens/end.png');
}
