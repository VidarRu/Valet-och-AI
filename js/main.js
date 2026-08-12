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
