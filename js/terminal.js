// Terminal-overlay: mörkt läge som triggas av AI-genereringsval.
// Typewriter-effekt skriver ut fejkade loggrader; därefter visas en knapp
// tillbaka till flödet. All "kod" som visas är fiktiv och illustrativ.

const CHAR_DELAY_MS = 18;
const LINE_DELAY_MS = 250;

export function createTerminal({ overlay, engine }) {
  let cancelled = false;

  function show(terminal) {
    cancelled = false;
    overlay.replaceChildren();
    overlay.hidden = false;

    const screen = document.createElement('pre');
    screen.className = 'terminal-screen';
    overlay.append(screen);

    const lines = [`$ ${terminal.tool}`, ...terminal.lines];
    typeLines(screen, lines).then(() => {
      if (cancelled) return;
      const button = document.createElement('button');
      button.className = 'terminal-done';
      button.textContent = '▶ Tillbaka till flödet';
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

  async function typeLines(screen, lines) {
    for (const line of lines) {
      for (const char of line) {
        if (cancelled) return;
        screen.textContent += char;
        await sleep(CHAR_DELAY_MS);
      }
      screen.textContent += '\n';
      await sleep(LINE_DELAY_MS);
    }
  }

  return { show, hide };
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
