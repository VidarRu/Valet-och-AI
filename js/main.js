// Startpunkt: kopplar ihop data, motor, renderare och terminal-overlay.

import { core, deep, hub, closing, prologue, nearMiss } from '../data/index.js';
import { createEngine } from './engine.js';
import { createRenderer } from './render.js';
import { createTerminal } from './terminal.js';
import { showStart, showEnd } from './hero.js';

const engine = createEngine({ core, deep, hub, closing, prologue, nearMiss });

const renderer = createRenderer({
  statusbar: document.getElementById('statusbar'),
  feed: document.getElementById('feed'),
  engine,
});

const terminal = createTerminal({
  overlay: document.getElementById('terminal-overlay'),
  engine,
});

let terminalVisible = false;
let endShown = false;
engine.subscribe((state) => {
  renderer.render(state);
  if (state.phase === 'terminal' && !terminalVisible) {
    terminalVisible = true;
    terminal.show(state.pendingTerminal);
  } else if (state.phase !== 'terminal' && terminalVisible) {
    terminalVisible = false;
  }
  if (state.phase === 'finished' && !endShown) {
    endShown = true;
    const last = state.feed[state.feed.length - 1];
    showEnd(document.getElementById('end-overlay'), {
      failed: !!(last && last.kind === 'game-over' && last.failed),
    });
  }
});

showStart(document.getElementById('start-overlay'), () => engine.start());

// Mellanslag = klicka den enda "fortsätt"-knapp som är aktuell just nu
// (Fortsätt/Spela igen/Starta spelet/terminalens "Tillbaka till flödet"/
// nära-ögat- och debrief-kortens inbyggda knapp). Gäller aldrig knappar där
// spelaren faktiskt ska VÄLJA mellan flera alternativ (valkort, huben).
function findSpaceButton() {
  const startOverlay = document.getElementById('start-overlay');
  if (startOverlay && !startOverlay.hidden) return startOverlay.querySelector('.hero-button');

  const endOverlay = document.getElementById('end-overlay');
  if (endOverlay && !endOverlay.hidden) return endOverlay.querySelector('.hero-button');

  const terminalOverlay = document.getElementById('terminal-overlay');
  if (terminalOverlay && !terminalOverlay.hidden) return terminalOverlay.querySelector('.terminal-done');

  const last = document.getElementById('feed').lastElementChild;
  if (!last) return null;
  if (last.classList.contains('continue-button')) return last;
  if (last.classList.contains('hub-panel')) return null; // flera val — ingen autoklick
  return last.querySelector('.continue-button');
}

document.addEventListener('keydown', (event) => {
  if (event.code !== 'Space') return;
  const button = findSpaceButton();
  if (!button || button.disabled) return;
  event.preventDefault();
  button.click();
});
