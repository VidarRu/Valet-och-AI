// Rendering av statusrad och kortflöde enligt briefens designspec:
// kortbaserat flöde i centrerad kolumn, statusrad med blå trovärdighetsstapel,
// handledarbubbla med gul rund avatar. Renderaren är en ren funktion av
// engine-state och rör aldrig spellogiken.

import { BADGES } from './schema.js';

const AVATAR_SVG = `<svg viewBox="0 0 24 24" aria-hidden="true">
  <line x1="12" y1="7" x2="12" y2="4"/>
  <circle cx="12" cy="3" r="1.4" class="fill"/>
  <rect x="5" y="7" width="14" height="12" rx="2.5"/>
  <circle cx="9.5" cy="12" r="1.5" class="fill"/>
  <circle cx="14.5" cy="12" r="1.5" class="fill"/>
  <line x1="9" y1="15.5" x2="15" y2="15.5"/>
</svg>`;

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

const followerFormat = new Intl.NumberFormat('sv-SE');

function renderStatusbar(container, state) {
  container.replaceChildren();

  container.append(el('span', 'statusbar-title', 'Valet & AI'));

  const followers = el('div', 'stat');
  followers.append(
    el('span', 'stat-label', 'Följare'),
    el('span', 'stat-value', followerFormat.format(state.followers)),
  );

  const credibility = el('div', 'stat');
  const meter = el('div', 'cred-meter');
  meter.setAttribute('role', 'meter');
  meter.setAttribute('aria-label', 'Trovärdighet');
  meter.setAttribute('aria-valuenow', String(state.credibility));
  meter.setAttribute('aria-valuemin', '0');
  meter.setAttribute('aria-valuemax', '100');
  const fill = el('div', 'cred-fill');
  fill.style.width = `${state.credibility}%`;
  meter.append(fill);
  credibility.append(el('span', 'stat-label', 'Trovärdighet'), meter);

  const mission = el('div', 'stat');
  mission.append(
    el('span', 'stat-label', 'Uppdrag'),
    el('span', 'stat-value',
      `${Math.min(state.moduleIndex + 1, state.totalModules)}/${state.totalModules}`),
  );

  const stats = el('div', 'statusbar-stats');
  stats.append(followers, credibility, mission);
  container.append(stats);
}

function badgePill(badgeId) {
  return el('span', 'badge-pill', BADGES[badgeId].label);
}

function tutorBubble(text, extraClass) {
  const bubble = el('div', 'tutor-bubble' + (extraClass ? ` ${extraClass}` : ''));
  const avatar = el('div', 'tutor-avatar');
  avatar.innerHTML = AVATAR_SVG;
  bubble.append(avatar, el('p', 'tutor-text', text));
  return bubble;
}

function renderFeedItem(item, engine, isLast, state) {
  switch (item.kind) {
    case 'mission': {
      const card = el('article', 'card card-mission');
      const header = el('div', 'mission-header');
      header.append(
        badgePill(item.badge),
        el('span', 'mission-number', `Uppdrag ${item.moduleNumber}`),
      );
      const client = el('div', 'mission-client');
      client.append(
        el('p', 'client-row client-name', item.client.name),
        el('p', 'client-row', item.client.description),
        row('Mål', item.client.goal),
        row('Arvode', item.client.fee),
      );
      card.append(header, el('h2', 'card-title', item.title), client);
      return card;
    }
    case 'tutor':
      return tutorBubble(item.text);
    case 'feedback':
      return tutorBubble(item.text, 'tutor-feedback');
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
    case 'debrief': {
      const card = el('article', 'card card-debrief');
      const banner = el('div', 'debrief-banner');
      banner.append(el('span', null, 'Badge upplåst'), badgePill(item.badge));
      card.append(
        banner,
        el('h2', 'card-title', 'Sammanfattning'),
        el('p', 'debrief-summary', item.summary),
        el('h3', 'debrief-subtitle', 'Ur verkligheten'),
      );
      const list = el('ul', 'debrief-realworld');
      for (const example of item.realWorld) list.append(el('li', null, example));
      card.append(list);
      if (isLast && state.phase === 'module-debrief') {
        const button = el('button', 'continue-button debrief-next', 'Nästa uppdrag →');
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
      const badges = el('div', 'gameover-badges');
      for (const badgeId of item.badges) badges.append(badgePill(badgeId));
      card.append(badges);
      return card;
    }
    default:
      return el('div', 'card', `[okänd flödespost: ${item.kind}]`);
  }
}

function row(label, text) {
  const p = el('p', 'client-row');
  p.append(el('strong', null, `${label}: `), document.createTextNode(text));
  return p;
}

export function createRenderer({ statusbar, feed, engine }) {
  // Bara nytillkomna flödesposter får entré-animation, inte hela flödet
  // vid varje omritning.
  let renderedCount = 0;

  function render(state) {
    renderStatusbar(statusbar, state);
    feed.replaceChildren();

    state.feed.forEach((item, i) => {
      const node = renderFeedItem(item, engine, i === state.feed.length - 1, state);
      if (i >= renderedCount) node.classList.add('enter');
      feed.append(node);
    });
    renderedCount = state.feed.length;

    if (state.phase === 'playing' && !state.pendingChoice) {
      const button = el('button', 'continue-button', 'Fortsätt');
      button.addEventListener('click', () => engine.advance());
      feed.append(button);
    }

    feed.lastElementChild?.scrollIntoView({ block: 'end', behavior: 'smooth' });
  }
  return { render };
}
