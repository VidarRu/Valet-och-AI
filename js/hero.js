// Blockerande start-/slutrutor i vektorillustrationsstil
// (assets/screens/start.png, assets/screens/end.png). Samma overlay-mönster
// som terminal.js, men med en bakgrundsbild i stället för terminal-fönstret.
// Rubriken renderas som riktig HTML ovanpå bilden — bilderna själva bär
// ingen text (se tools/assets/manifest.mjs).

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

export function showStart(overlay, onStart) {
  overlay.replaceChildren();
  overlay.hidden = false;
  overlay.classList.add('hero-overlay');
  overlay.style.backgroundImage = 'url(assets/screens/start.png)';

  const box = el('div', 'hero-box');
  box.append(
    el('p', 'hero-kicker', 'Ett spel om AI och desinformation'),
    el('h1', 'hero-title', 'Valet och AI'),
    el('p', 'hero-tagline', 'Kampen om Nordmark'),
  );
  const button = el('button', 'continue-button hero-button', 'Starta spelet');
  button.addEventListener('click', () => {
    overlay.hidden = true;
    overlay.replaceChildren();
    onStart();
  });
  box.append(button);
  overlay.append(box);
  button.focus();
}

export function showEnd(overlay, { failed }) {
  overlay.replaceChildren();
  overlay.hidden = false;
  overlay.classList.add('hero-overlay');
  overlay.style.backgroundImage = 'url(assets/screens/end.png)';

  const box = el('div', 'hero-box');
  box.append(
    el('p', 'hero-kicker', 'Nordmark, morgonen efter valet'),
    el('h1', 'hero-title', failed ? 'Du blev avslöjad' : 'Kampanjen är över'),
  );
  const button = el('button', 'continue-button hero-button', 'Se sammanfattningen');
  button.addEventListener('click', () => {
    overlay.hidden = true;
    overlay.replaceChildren();
  });
  box.append(button);
  overlay.append(box);
  button.focus();
}
