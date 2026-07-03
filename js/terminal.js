// Terminal-overlay: mörkt läge som triggas av AI-genereringsval.
// Kontrasten mot det ljusa kortflödet är poängen — avsikten är mänsklig,
// utförandet maskinellt. All "kod" som visas är fiktiv och illustrativ.

const CHAR_DELAY_MS = 16;
const LINE_DELAY_MS = 300;

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

export function createTerminal({ overlay, engine }) {
  let cancelled = false;

  function show(terminal) {
    cancelled = false;
    overlay.replaceChildren();
    overlay.hidden = false;

    const win = el('div', 'terminal-window');

    const chrome = el('div', 'terminal-chrome');
    const dots = el('div', 'terminal-dots');
    dots.append(el('span'), el('span'), el('span'));
    chrome.append(dots, el('span', 'terminal-chrome-title', 'ai-konsol'));

    const screen = el('pre', 'terminal-screen');
    const text = el('span', 'terminal-text');
    const cursor = el('span', 'terminal-cursor');
    screen.append(text, cursor);

    win.append(chrome, screen);
    overlay.append(win, el('p', 'terminal-note', 'Simulering — alla verktyg och loggar är fiktiva.'));

    const lines = [`$ ${terminal.tool}`, ...terminal.lines];
    typeLines(text, lines).then(() => {
      if (cancelled) return;
      const button = el('button', 'terminal-done', '▶ Tillbaka till flödet');
      button.addEventListener('click', () => {
        hide();
        engine.terminalDone();
      });
      overlay.append(button);
      button.focus();
    });
  }

  function hide() {
    cancelled = true;
    overlay.hidden = true;
    overlay.replaceChildren();
  }

  async function typeLines(target, lines) {
    for (const line of lines) {
      for (const char of line) {
        if (cancelled) return;
        target.textContent += char;
        await sleep(CHAR_DELAY_MS);
      }
      target.textContent += '\n';
      await sleep(LINE_DELAY_MS);
    }
  }

  return { show, hide };
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
