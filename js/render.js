// Rendering av statusrad och kortflöde. Avsiktligt enkel i steg 1 —
// den visuella designen (palett, kort, bubblor enligt briefen) byggs ut i steg 2.
// Renderaren är en ren funktion av engine-state: den ritar om flödet vid varje
// state-ändring och rör aldrig spellogiken.

import { BADGES } from './schema.js';

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

function renderStatusbar(container, state) {
  container.replaceChildren();
  container.append(
    el('span', 'stat stat-followers', `Följare: ${state.followers}`),
    el('span', 'stat stat-credibility', `Trovärdighet: ${state.credibility}/100`),
    el('span', 'stat stat-mission',
      `Uppdrag: ${Math.min(state.moduleIndex + 1, state.totalModules)}/${state.totalModules}`),
    el('span', 'stat stat-badges', `Badges: ${state.badges.length}/6`),
  );
}

function renderFeedItem(item, engine, isLast, state) {
  switch (item.kind) {
    case 'mission': {
      const card = el('article', 'card card-mission');
      card.append(
        el('div', 'card-badge', BADGES[item.badge].label),
        el('h2', 'card-title', `Uppdrag ${item.moduleNumber}: ${item.title}`),
        el('p', 'card-client', `Klient: ${item.client.name} — ${item.client.description}`),
        el('p', 'card-goal', `Mål: ${item.client.goal}`),
        el('p', 'card-fee', `Arvode: ${item.client.fee}`),
      );
      return card;
    }
    case 'tutor': {
      const bubble = el('div', 'tutor-bubble');
      bubble.append(el('div', 'tutor-avatar', 'AI'), el('p', 'tutor-text', item.text));
      return bubble;
    }
    case 'post': {
      const card = el('article', item.generated ? 'card card-post card-generated' : 'card card-post');
      const header = el('header', 'post-header');
      header.append(el('strong', 'post-author', item.author), el('span', 'post-handle', item.handle));
      if (item.generated) header.append(el('span', 'post-generated-tag', 'AI-genererat'));
      card.append(header, el('p', 'post-text', item.text));
      return card;
    }
    case 'choice': {
      const card = el('article', 'card card-choice');
      card.append(el('p', 'choice-prompt', item.prompt));
      for (const option of item.options) {
        const button = el('button', 'choice-option', option.label);
        if (item.chosenId != null) {
          button.disabled = true;
          if (option.id === item.chosenId) button.classList.add('chosen');
        } else {
          button.addEventListener('click', () => engine.choose(option.id));
        }
        card.append(button);
      }
      return card;
    }
    case 'feedback': {
      const bubble = el('div', 'tutor-bubble tutor-feedback');
      bubble.append(el('div', 'tutor-avatar', 'AI'), el('p', 'tutor-text', item.text));
      return bubble;
    }
    case 'debrief': {
      const card = el('article', 'card card-debrief');
      card.append(
        el('div', 'card-badge', `Badge: ${BADGES[item.badge].label}`),
        el('h2', 'card-title', 'Sammanfattning'),
        el('p', 'debrief-summary', item.summary),
      );
      const list = el('ul', 'debrief-realworld');
      for (const example of item.realWorld) list.append(el('li', null, example));
      card.append(el('h3', null, 'Verkliga exempel'), list);
      if (isLast && state.phase === 'module-debrief') {
        const button = el('button', 'continue-button', 'Nästa uppdrag');
        button.addEventListener('click', () => engine.nextModule());
        card.append(button);
      }
      return card;
    }
    case 'game-over': {
      const card = el('article', 'card card-gameover');
      card.append(
        el('h2', 'card-title', 'Spelet slut'),
        el('p', null, `Du har samlat ${item.badges.length} av 6 badges.`),
      );
      return card;
    }
    default:
      return el('div', 'card', `[okänd flödespost: ${item.kind}]`);
  }
}

export function createRenderer({ statusbar, feed, engine }) {
  function render(state) {
    renderStatusbar(statusbar, state);
    feed.replaceChildren();

    state.feed.forEach((item, i) => {
      feed.append(renderFeedItem(item, engine, i === state.feed.length - 1, state));
    });

    // "Fortsätt"-knapp när inget val väntar och det finns fler steg.
    if (state.phase === 'playing' && !state.pendingChoice) {
      const button = el('button', 'continue-button', 'Fortsätt');
      button.addEventListener('click', () => engine.advance());
      feed.append(button);
    }

    feed.lastElementChild?.scrollIntoView({ block: 'end' });
  }
  return { render };
}
