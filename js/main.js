// Startpunkt: kopplar ihop data, motor, renderare och terminal-overlay.

import { modules } from '../data/index.js';
import { createEngine } from './engine.js';
import { createRenderer } from './render.js';
import { createTerminal } from './terminal.js';

const engine = createEngine(modules);

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
engine.subscribe((state) => {
  renderer.render(state);
  if (state.phase === 'terminal' && !terminalVisible) {
    terminalVisible = true;
    terminal.show(state.pendingTerminal);
  } else if (state.phase !== 'terminal' && terminalVisible) {
    terminalVisible = false;
  }
});

engine.start();
