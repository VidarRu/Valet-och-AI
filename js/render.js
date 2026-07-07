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

const numberFormat = new Intl.NumberFormat('sv-SE');
function formatKr(n) {
  return `${numberFormat.format(n)} kr`;
}

// Kort kod per badge till statusradens rutor (två K:n krockar → Ko/Kä).
const BADGE_ABBR = {
  polarization: 'P', discredit: 'M', trolling: 'T',
  conspiracy: 'Ko', emotion: 'Kä', impersonation: 'I',
};

// Synlighetens riskzon (visuellt streck i mätaren) samt klassificering av en
// synlighetsförändring till en etikett i strategivalen.
const VISIBILITY_RISK = 80;
function visibilityTier(delta) {
  if (delta < 0) return { cls: 'down', arrow: '▼', word: 'sänker' };
  if (delta >= 12) return { cls: 'up-hi', arrow: '▲', word: 'kraftigt' };
  return { cls: 'up-lo', arrow: '▲', word: 'något' };
}

// ---------------------------------------------------------------------------
// Kvittra — den fiktiva mikrobloggplattform som inläggen "bor" på. Inläggen
// renderas som riktiga plattformskort (avatar, verifiering, tidsstämpel,
// engagemangssiffror, hashtags) för högre inlevelse. Reaktioner blir trådade
// svar under det publicerade inlägget. Allt härledda värde (tid, siffror,
// avatarfärg) är deterministiskt ur innehållet så det inte hoppar vid omritning.
// ---------------------------------------------------------------------------

// Institutionella/kända konton får blå verifieringsbock. De anonyma "läck"-
// kontona saknar den med flit — en liten pedagogisk poäng i sig.
const VERIFIED = new Set([
  '@veralind', '@faktakollen', '@nadiaholm', '@valmyndigheten',
  '@nordmark_nytt', '@antonberg', '@prof_hane', '@ekokammaren',
]);

function hashStr(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

const REL_TIMES = ['nyss', '2 min', '7 min', '18 min', '34 min', '52 min', '1 tim', '2 tim', '4 tim'];

function relativeTime(seed, recent) {
  // Reaktioner är svar på något nyss publicerat → håll dem i den färska änden.
  const pool = recent ? REL_TIMES.slice(0, 5) : REL_TIMES;
  return pool[seed % pool.length];
}

function formatCount(n) {
  if (n < 1000) return String(n);
  const k = n / 1000;
  return (k >= 10 ? Math.round(k) : k.toFixed(1).replace(/\.0$/, '')).toString().replace('.', ',') + ' tn';
}

// Rimliga engagemangssiffror härledda ur texten. Genererade virala inlägg får
// stora tal, svar mindre — bara tillräckligt trovärdigt för att sälja flödet.
function engagement(text, kind) {
  const base = hashStr(text);
  const scale = kind === 'generated' ? 1200 + base % 8000
    : kind === 'reply' ? 30 + base % 700
    : 60 + base % 1400;
  const likes = scale;
  const reposts = Math.round(likes * (0.18 + (base % 24) / 100));
  const replies = Math.round(reposts * (0.25 + ((base >> 5) % 20) / 100));
  return { replies, reposts, likes };
}

function initials(author) {
  const first = (author.trim()[0] || '?');
  return first.toUpperCase();
}

// Riktiga porträtt/logotyper (assets/portraits|logos/<handle>.png) täcker
// den färgade initial-cirkeln när en fil faktiskt finns — annars förblir
// gradienten + initialen den enda avataren, precis som innan dessa bilder
// genererades. Handle kan bära "@"; filnamnen gör det inte.
function kvAvatar(handle, author, small) {
  const h = hashStr(handle);
  const a = h % 360;
  const b = (h >> 4) % 360;
  const avatar = el('div', 'kv-avatar' + (small ? ' kv-avatar-sm' : ''));
  avatar.style.background =
    `conic-gradient(from ${h % 360}deg, hsl(${a} 68% 56%), hsl(${b} 70% 60%), hsl(${a} 68% 56%))`;
  avatar.append(el('span', 'kv-avatar-initial', initials(author)));

  const key = handle.replace(/^[@#]/, '');
  const img = el('img', 'kv-avatar-img');
  img.alt = '';
  img.src = `assets/portraits/${key}.png`;
  img.addEventListener('error', () => {
    if (img.dataset.stage === 'logo') { img.remove(); return; }
    img.dataset.stage = 'logo';
    img.src = `assets/logos/${key}.png`;
  });
  avatar.append(img);
  return avatar;
}

const ICONS = {
  reply: 'M21 11.5a8.5 8.5 0 0 1-8.5 8.5H6l-3 3v-4.7A8.5 8.5 0 1 1 21 11.5Z',
  repost: 'M17 2l4 4-4 4M3 12v-2a4 4 0 0 1 4-4h14M7 22l-4-4 4-4M21 12v2a4 4 0 0 1-4 4H3',
  like: 'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z',
};

function statIcon(path) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('aria-hidden', 'true');
  const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  p.setAttribute('d', path);
  svg.append(p);
  return svg;
}

// Bläddrar isär inläggstext i vanliga ord + #hashtags/@omnämnanden som färgas
// i accentfärgen — samma detalj som får en riktig plattform att kännas levande.
function styledText(container, text) {
  const parts = text.split(/(#[0-9A-Za-zåäöÅÄÖ_]+|@[0-9A-Za-z_]+)/g);
  for (const part of parts) {
    if (!part) continue;
    if (/^[#@]/.test(part)) container.append(el('span', 'kv-tag', part));
    else container.append(document.createTextNode(part));
  }
}

// Härleder medietyp + längd + scenbeskrivning ur verktygsnamn och text.
// Texterna bär redan ledtrådar: "(VIDEO 0:38)", "(LJUD 0:45)", "[bild: …]".
function parseMedia(item) {
  const tool = item.tool || '';
  let type = null;
  if (/^ansiktsvav|^djupbild/.test(tool)) type = 'video';
  else if (/^rostspegel/.test(tool)) type = 'audio';
  else if (/^memesmed/.test(tool)) type = 'meme';
  else if (/^bildsmed/.test(tool)) type = 'image';
  else if (/^dokumentsmedjan/.test(tool)) type = 'document';
  if (!type) return null;

  let caption = item.text;
  let duration = null;

  const durTag = caption.match(/\((?:VIDEO|LJUD)\s+(\d+:\d{2})\)/i);
  if (durTag) {
    duration = durTag[1];
    caption = caption.replace(durTag[0], '').trim();
  } else {
    const langd = tool.match(/--langd=(\d+)s/);
    if (langd) {
      const s = Number(langd[1]);
      duration = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
    } else if (type === 'video') {
      const min = caption.match(/(\d+)\s*min\b/);
      if (min) duration = `${min[1]}:00`;
    }
  }

  // Inbäddad bildbeskrivning, t.ex. "[bild: skymningsgata, tomma butiker]".
  let scene = null;
  const bracket = caption.match(/\[([^\]]*)\]/);
  if (bracket) {
    scene = bracket[1].replace(/^bild(\s*på|:)?\s*/i, '').trim();
    caption = caption.replace(bracket[0], '').replace(/\s{2,}/g, ' ').trim();
  }

  return { type, duration, scene, caption, tool };
}

// Härleder samma handle som tools/assets/manifest.mjs använder för sina
// media-bilder, direkt ur scenariots tool-sträng — så en ny genererad bild
// dyker upp automatiskt utan att koden behöver ändras.
function mediaHandle(tool) {
  let m;
  if ((m = tool.match(/--scen=([\w-]+)/))) return `img_${m[1]}`;
  if ((m = tool.match(/--tema=([\w-]+)/))) return `meme_${m[1]}`;
  if (/^dokumentsmedjan/.test(tool)) {
    const typ = tool.match(/--typ=([\w-]+)/);
    const amne = tool.match(/--amne=([\w-]+)/);
    if (typ) return `doc_${typ[1]}${amne ? '_' + amne[1] : ''}`;
  }
  if ((m = tool.match(/--projekt=([\w-]+)/))) return `vid_${m[1]}`;
  if (/^ansiktsvav/.test(tool)) return 'vid_ansiktsvav';
  return null;
}

// Sätter en genererad bakgrundsbild på medieramen om filen faktiskt finns.
// Vid 404 (bilden saknas) rörs ingenting — den befintliga CSS-mockupen
// (gradient/streck/dokument-ark) fortsätter gälla som fallback.
function tryMediaImage(frame, tool) {
  const handle = tool && mediaHandle(tool);
  if (!handle) return;
  const img = new Image();
  img.onload = () => {
    frame.style.backgroundImage = `url(assets/media/${handle}.png)`;
    frame.classList.add('has-image');
  };
  img.src = `assets/media/${handle}.png`;
}

function fauxPlay() {
  const btn = el('div', 'kv-play');
  btn.setAttribute('aria-hidden', 'true');
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  p.setAttribute('d', 'M6 4l14 8-14 8Z');
  svg.append(p);
  btn.append(svg);
  return btn;
}

function mediaTag(label) {
  return el('span', 'kv-media-tag', label);
}

function renderMedia(media, seed) {
  const wrap = el('div', 'kv-media');
  if (media.type === 'video') {
    const frame = el('div', 'kv-media-video');
    frame.setAttribute('role', 'img');
    frame.setAttribute('aria-label', media.scene ? `Videoklipp: ${media.scene}` : 'AI-genererat videoklipp');
    frame.append(mediaTag('AI-genererad video'), fauxPlay());
    if (media.scene) frame.append(el('p', 'kv-media-scene', media.scene));
    if (media.duration) frame.append(el('span', 'kv-media-dur', media.duration));
    tryMediaImage(frame, media.tool);
    wrap.append(frame);
  } else if (media.type === 'audio') {
    const player = el('div', 'kv-audio');
    player.setAttribute('role', 'group');
    player.setAttribute('aria-label', 'AI-genererat ljudklipp, spela upp med talsyntes');
    const play = fauxPlay();
    play.setAttribute('role', 'button');
    play.tabIndex = 0;
    player.append(play);
    const wave = el('div', 'kv-wave');
    for (let i = 0; i < 28; i++) {
      const bar = el('span');
      const hgt = 20 + ((seed >> (i % 16)) ^ (i * 2654435761)) % 80;
      bar.style.height = `${Math.abs(hgt) % 85 + 15}%`;
      bar.style.setProperty('--i', String(i));
      wave.append(bar);
    }
    player.append(wave, el('span', 'kv-audio-dur', media.duration || '0:30'));

    // Riktig uppläsning av citatet via webbläsarens Web Speech API — gratis,
    // körs helt lokalt hos spelaren, ingen modell eller nyckel behövs. Äkta
    // röstklon av en specifik person kräver en separat tjänst (ElevenLabs
    // e.d.) och är medvetet inte det som simuleras här.
    const toggleSpeak = () => {
      if (!('speechSynthesis' in window)) return;
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        player.classList.remove('playing');
        return;
      }
      const utter = new SpeechSynthesisUtterance(media.caption);
      utter.lang = 'sv-SE';
      utter.onend = () => player.classList.remove('playing');
      utter.onerror = () => player.classList.remove('playing');
      window.speechSynthesis.speak(utter);
      player.classList.add('playing');
    };
    play.addEventListener('click', toggleSpeak);
    play.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleSpeak(); }
    });
    wrap.append(player);
  } else if (media.type === 'meme') {
    const frame = el('div', 'kv-media-meme');
    frame.setAttribute('role', 'img');
    frame.setAttribute('aria-label', media.scene ? `Meme: ${media.scene}` : 'AI-genererad meme');
    frame.append(mediaTag('Meme'));
    if (media.scene) frame.append(el('p', 'kv-meme-text', media.scene.toUpperCase()));
    tryMediaImage(frame, media.tool);
    wrap.append(frame);
  } else if (media.type === 'document') {
    const frame = el('div', 'kv-media-doc');
    frame.setAttribute('role', 'img');
    frame.setAttribute('aria-label', 'Fabricerad skärmdump/dokument');
    frame.append(mediaTag('Skärmdump'));
    const sheet = el('div', 'kv-doc-sheet');
    for (const w of [92, 80, 88, 60, 84, 45]) {
      const ln = el('div', 'kv-doc-line');
      ln.style.width = `${w}%`;
      sheet.append(ln);
    }
    frame.append(sheet);
    tryMediaImage(frame, media.tool);
    wrap.append(frame);
  } else {
    const frame = el('div', 'kv-media-image');
    frame.setAttribute('role', 'img');
    frame.setAttribute('aria-label', media.scene ? `Bild: ${media.scene}` : 'AI-genererad bild');
    frame.append(mediaTag('AI-genererad bild'));
    if (media.scene) frame.append(el('p', 'kv-media-scene', media.scene));
    tryMediaImage(frame, media.tool);
    wrap.append(frame);
  }
  return wrap;
}

function renderPost(item) {
  const isReply = !!item.reaction;
  const kind = item.generated ? 'generated' : isReply ? 'reply' : 'context';
  const card = el('article', 'post-card'
    + (item.generated ? ' post-generated' : '')
    + (isReply ? ' post-reply' : ''));

  // Toppspår: Kvittra-vattenmärke på vanliga inlägg, "AI-genererat"-chip på de
  // fabricerade. Svar (trådade) får inget — nästlingen talar för sig själv.
  if (!isReply) {
    const top = el('div', 'kv-top');
    if (item.generated) {
      top.append(el('span', 'kv-genchip', 'AI-genererat'));
    } else {
      top.append(kvWordmark());
    }
    card.append(top);
  }

  const head = el('div', 'kv-head');
  head.append(kvAvatar(item.handle, item.author, isReply));
  const names = el('div', 'kv-names');
  const row1 = el('div', 'kv-row1');
  row1.append(el('span', 'kv-name', item.author));
  if (VERIFIED.has(item.handle)) row1.append(kvCheck());
  row1.append(el('span', 'kv-handle', item.handle));
  row1.append(el('span', 'kv-dot', '·'));
  row1.append(el('span', 'kv-time', relativeTime(hashStr(item.handle + item.text), isReply)));
  names.append(row1);
  head.append(names);
  card.append(head);

  const media = item.generated ? parseMedia(item) : null;
  const bodyText = media ? media.caption : item.text;
  if (media) card.append(renderMedia(media, hashStr(item.text)));

  const body = el('p', 'kv-text');
  styledText(body, bodyText);
  card.append(body);

  const bar = el('div', 'kv-bar');
  const counts = engagement(item.text, kind === 'context' ? 'context' : kind);
  for (const [key, value] of [['reply', counts.replies], ['repost', counts.reposts], ['like', counts.likes]]) {
    const stat = el('span', 'kv-stat');
    stat.append(statIcon(ICONS[key]), el('span', null, formatCount(value)));
    bar.append(stat);
  }
  card.append(bar);
  return card;
}

function kvCheck() {
  const span = el('span', 'kv-check');
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('aria-label', 'Verifierat konto');
  const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  p.setAttribute('d', 'M4 12l5 5L20 6');
  svg.append(p);
  span.append(svg);
  return span;
}

function kvWordmark() {
  const mark = el('span', 'kv-wordmark');
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('aria-hidden', 'true');
  const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  p.setAttribute('d', 'M22 5.4c-.7.3-1.5.6-2.3.7a4 4 0 0 0 1.8-2.2c-.8.5-1.7.8-2.6 1a4 4 0 0 0-6.9 3.6A11.4 11.4 0 0 1 3.7 4.3a4 4 0 0 0 1.2 5.3c-.6 0-1.3-.2-1.8-.5v.1a4 4 0 0 0 3.2 4 4 4 0 0 1-1.8.1 4 4 0 0 0 3.7 2.8A8 8 0 0 1 2 17.5a11.3 11.3 0 0 0 6.1 1.8c7.3 0 11.3-6.1 11.3-11.3v-.5c.8-.6 1.4-1.3 1.9-2.1Z');
  svg.append(p);
  mark.append(svg, document.createTextNode('Kvittra'));
  return mark;
}

function renderStatusbar(container, state) {
  container.replaceChildren();

  container.append(el('span', 'statusbar-title', 'Valet & AI'));

  // Kapital: löpande high-score (arvoden + bonusar).
  const capital = el('div', 'stat');
  capital.append(
    el('span', 'stat-label', 'Kapital'),
    el('span', 'stat-value', formatKr(state.capital)),
  );

  // Synlighet: stigande fara-mätare (gult → rött), med ett streck vid riskzonen.
  const visibility = el('div', 'stat');
  const meter = el('div', 'vis-meter');
  meter.setAttribute('role', 'meter');
  meter.setAttribute('aria-label', 'Synlighet');
  meter.setAttribute('aria-valuenow', String(state.visibility));
  meter.setAttribute('aria-valuemin', '0');
  meter.setAttribute('aria-valuemax', '100');
  const fill = el('div', 'vis-fill');
  fill.style.width = `${state.visibility}%`;
  meter.append(fill);
  const tick = el('div', 'vis-tick');
  tick.style.left = `${VISIBILITY_RISK}%`;
  meter.append(tick);
  visibility.append(el('span', 'stat-label', 'Synlighet'), meter);

  // Badges: alla sex rutorna, grå tills upplåsta; tooltip på de upplåsta.
  const badges = el('div', 'stat');
  const row = el('div', 'sb-badges');
  for (const badge of Object.values(BADGES)) {
    const earned = state.badges.includes(badge.id);
    const chip = el('div', 'bchip ' + (earned ? 'earned' : 'locked'), BADGE_ABBR[badge.id]);
    if (earned) {
      chip.tabIndex = 0;
      chip.setAttribute('aria-label', `${badge.label}: ${badge.tool}. ${badge.blurb}`);
      const tip = el('div', 'bchip-tip');
      tip.append(
        el('span', 'bchip-tip-badge', badge.label),
        el('p', 'bchip-tip-tool', `Verktyg: ${badge.tool}`),
        el('p', 'bchip-tip-text', badge.blurb),
      );
      chip.append(tip);
    } else {
      chip.setAttribute('aria-label', `${badge.label}: ännu inte upplåst`);
    }
    row.append(chip);
  }
  badges.append(el('span', 'stat-label', 'Badges'), row);

  const stats = el('div', 'statusbar-stats');
  stats.append(capital, visibility, badges);
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

// Förhandsvisning under ett strategival: hur mycket synlighet det drar till sig
// och en eventuell bonus (aldrig i exakta kronor). Returnerar null om valet
// saknar mätbara effekter (t.ex. rena dialogrepliker).
function choicePreview(effects) {
  if (!effects || (!Number.isInteger(effects.visibility) && !effects.bonus)) return null;
  const foot = el('div', 'co-foot');
  if (Number.isInteger(effects.visibility) && effects.visibility !== 0) {
    const t = visibilityTier(effects.visibility);
    const chip = el('span', `vis-chip ${t.cls}`);
    chip.append(el('span', 'arrow', t.arrow), document.createTextNode(` Synlighet: ${t.word}`));
    foot.append(chip);
  }
  if (effects.bonus) {
    foot.append(el('span', 'cap-chip' + (effects.bonus === 'stor' ? ' big' : ''),
      `◆ Bonus: ${effects.bonus}`));
  } else {
    foot.append(el('span', 'vis-chip flat', 'Ingen bonus'));
  }
  return foot;
}

// Rutan som avslöjar hur synligheten faktiskt ändrades av det senaste valet.
function visibilityReveal(delta, value) {
  const down = delta < 0;
  const box = el('div', 'reveal' + (down ? ' down' : ''));
  box.append(el('div', 'reveal-ico', down ? '▼' : '▲'));
  const body = el('div', 'reveal-body');
  const risk = !down && value >= VISIBILITY_RISK ? ' (riskzon)' : '';
  body.append(
    el('p', 'reveal-title', 'Synlighet'),
    el('p', 'reveal-line reveal-delta',
      `${delta > 0 ? '+' : ''}${delta}  →  ${value} / 100${risk}`),
  );
  const meter = el('div', 'mini-meter');
  const fill = el('div', 'mini-fill');
  fill.style.width = `${value}%`;
  meter.append(fill);
  box.append(body, meter);
  return box;
}

// Fabricerad granskningsartikel (Faktakollen / Nadia Holm) — egen layout, inte
// ett socialt inlägg. Används i nära-ögat-scenen och i avslöjande-slutet.
function factCheckArticle(article) {
  const wrap = el('article', 'fc-article');
  const mast = el('div', 'fc-masthead');
  const logo = el('span', 'fc-logo');
  logo.append(document.createTextNode('Fakta'), el('b', null, 'kollen'));
  mast.append(logo, el('span', 'fc-kicker', 'Granskning'));
  wrap.append(mast);

  const body = el('div', 'fc-body');
  if (article.verdict) body.append(el('span', 'fc-verdict', article.verdict));
  body.append(el('h3', 'fc-head', article.headline));
  const byline = el('div', 'fc-byline');
  byline.append(el('span', 'fc-av', 'NH'), el('span', null, article.byline));
  body.append(byline, el('p', 'fc-dek', article.dek));
  wrap.append(body);
  return wrap;
}

// Nära-ögat-scenen: push-notis → artikel → EKO:s handbroms → byråns dementi →
// synligheten faller. Egen "Fortsätt"-knapp som kör engine.nearMissDone().
function renderNearMiss(item, engine, isLast, state) {
  const scene = item.scene;
  const wrap = el('div', 'nearmiss');

  const banner = el('div', 'nearmiss-banner');
  banner.append(
    el('span', 'nearmiss-flag', 'Nära avslöjande'),
    el('span', 'nearmiss-warn', scene?.warningLabel ?? `Varning ${item.warning}`),
  );
  wrap.append(banner);

  if (scene?.notif) {
    const push = el('div', 'push');
    push.append(el('div', 'push-ico', 'F'));
    const pbody = el('div', 'push-body');
    const ptop = el('div', 'push-top');
    ptop.append(el('span', null, 'Faktakollen'), el('span', null, 'nu'));
    pbody.append(ptop, el('p', 'push-title', scene.notif.title), el('p', 'push-text', scene.notif.text));
    push.append(pbody);
    wrap.append(push);
  }

  if (scene?.article) wrap.append(factCheckArticle(scene.article));

  if (scene?.eko) wrap.append(tutorBubble(scene.eko, 'tutor-feedback'));

  if (scene?.denial) wrap.append(renderPost({
    reaction: true, author: scene.denial.author, handle: scene.denial.handle, text: scene.denial.text,
  }));

  // Synligheten pressas ned efter scenen.
  const box = el('div', 'reveal down');
  box.append(el('div', 'reveal-ico', '▼'));
  const body = el('div', 'reveal-body');
  body.append(
    el('p', 'reveal-title', 'Synlighet faller tillbaka'),
    el('p', 'reveal-line reveal-delta', `${item.peak} → ${item.fellTo} / 100`),
  );
  const meter = el('div', 'mini-meter');
  const fill = el('div', 'mini-fill');
  fill.style.width = `${item.fellTo}%`;
  meter.append(fill);
  box.append(body, meter);
  wrap.append(box);

  if (isLast && state.phase === 'near-miss') {
    const button = el('button', 'continue-button', 'Ligg lågt och fortsätt →');
    button.addEventListener('click', () => engine.nearMissDone());
    wrap.append(button);
  }
  return wrap;
}

function renderFeedItem(item, engine, isLast, state) {
  switch (item.kind) {
    case 'mission': {
      const card = el('article', item.stage === 'deep' ? 'card card-mission card-mission-deep' : 'card card-mission');
      const header = el('div', 'mission-header');
      header.append(
        badgePill(item.badge),
        el('span', 'mission-number', item.stage === 'deep' ? 'Fördjupning' : `Uppdrag ${item.moduleNumber}`),
      );
      const client = el('div', 'mission-client');
      client.append(
        el('p', 'mission-block-label', 'Uppdragsgivare'),
        el('p', 'client-row client-name', item.client.name),
        el('p', 'client-row', item.client.description),
        row('Mål', item.client.goal),
        row('Arvode', item.client.fee),
      );
      card.append(header, el('h2', 'card-title', item.title), client);

      if (item.target) {
        const target = el('div', 'mission-target');
        target.append(
          el('p', 'mission-block-label', 'Måltavla'),
          el('p', 'client-row client-name', item.target.name),
          el('p', 'client-row', item.target.description),
        );
        card.append(target);
      }
      if (item.stakes) {
        const stakes = el('div', 'mission-stakes');
        stakes.append(el('p', 'mission-block-label', 'Vad som står på spel'), el('p', 'client-row', item.stakes));
        card.append(stakes);
      }
      return card;
    }
    case 'title': {
      const card = el('article', 'card card-title-screen');
      card.append(el('p', 'title-kicker', 'Ett spel om AI och desinformation'));
      card.append(el('h1', 'title-name', item.title));
      if (item.tagline) card.append(el('p', 'title-tagline', item.tagline));
      for (const paragraph of item.intro ?? []) {
        card.append(el('p', 'title-intro', paragraph));
      }
      return card;
    }
    case 'tutor':
      return tutorBubble(item.text);
    case 'feedback':
      return tutorBubble(item.text, 'tutor-feedback');
    case 'post':
      return renderPost(item);
    case 'choice': {
      const card = el('article', 'card card-choice');
      card.append(el('p', 'choice-prompt', item.prompt));
      for (const option of item.options) {
        const button = el('button', 'choice-option');
        button.append(el('span', 'co-label', option.label));
        const foot = choicePreview(option.effects);
        if (foot) button.append(foot);
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
    case 'visibility':
      return visibilityReveal(item.delta, item.value);
    case 'nearmiss':
      return renderNearMiss(item, engine, isLast, state);
    case 'debrief': {
      const card = el('article', 'card card-debrief');
      const banner = el('div', 'debrief-banner');
      banner.append(el('span', null, item.deep ? 'Fördjupning klar' : 'Badge upplåst'), badgePill(item.badge));
      card.append(banner);
      if (Number.isInteger(item.reward)) {
        const pay = el('p', 'debrief-reward');
        pay.append(el('strong', null, 'Arvode utbetalt: '), document.createTextNode(formatKr(item.reward)));
        card.append(pay);
      }
      card.append(
        el('h2', 'card-title', 'Sammanfattning'),
        el('p', 'debrief-summary', item.summary),
        el('h3', 'debrief-subtitle', 'Ur verkligheten'),
      );
      const list = el('ul', 'debrief-realworld');
      for (const example of item.realWorld) list.append(el('li', null, example));
      card.append(list);
      if (isLast && state.phase === 'module-debrief') {
        const label = item.deep ? 'Tillbaka till uppdragen →' : 'Fortsätt →';
        const button = el('button', 'continue-button debrief-next', label);
        button.addEventListener('click', () => engine.nextModule());
        card.append(button);
      }
      return card;
    }
    case 'game-over': {
      const card = el('article', 'card card-gameover' + (item.failed ? ' card-gameover-failed' : ''));

      // Avslöjad (3:e taket): en sista Nadia Holm-artikel innan avspärrningen.
      if (item.failed && item.exposed) {
        card.append(el('span', 'gameover-tag gameover-tag-failed', 'Avslöjad'));
        card.append(factCheckArticle(item.exposed));
      }

      card.append(el('h2', 'card-title', item.failed ? 'Du blev avslöjad' : 'Kampanjen är över'));

      const badges = el('div', 'gameover-badges');
      for (const badgeId of item.badges) badges.append(badgePill(badgeId));
      if (item.badges.length > 0) card.append(badges);

      const stats = el('p', 'gameover-deep');
      stats.append(el('strong', null, 'Intjänat kapital: '), document.createTextNode(formatKr(item.capital ?? 0)));
      card.append(stats);
      if (item.deepTotal > 0) {
        card.append(el('p', 'gameover-deep', `Fördjupningar avklarade: ${item.deepDone}/${item.deepTotal}`));
      }
      for (const paragraph of item.closing ?? []) {
        card.append(el('p', 'gameover-text', paragraph));
      }
      const replay = el('button', 'continue-button gameover-replay', 'Spela igen');
      replay.addEventListener('click', () => window.location.reload());
      card.append(replay);
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

// Fördjupningsmenyn: valbara djupdykningar per badge + avsluta-knapp.
function renderHub(state, engine) {
  const panel = el('section', 'card hub-panel enter');
  panel.append(el('h2', 'card-title', 'Fördjupningar'));

  const list = el('div', 'hub-list');
  for (const entry of state.deepStatus) {
    if (entry.done) {
      const done = el('div', 'hub-item hub-item-done');
      done.append(
        el('span', 'hub-item-badge', BADGES[entry.badge].label),
        el('span', 'hub-item-title', entry.title),
        el('span', 'hub-item-check', 'Avklarad ✓'),
      );
      list.append(done);
    } else {
      const button = el('button', 'hub-item hub-item-open');
      button.append(
        el('span', 'hub-item-badge', BADGES[entry.badge].label),
        el('span', 'hub-item-title', entry.title),
        el('span', 'hub-item-go', 'Spela →'),
      );
      button.addEventListener('click', () => engine.selectDeep(entry.id));
      list.append(button);
    }
  }
  panel.append(list);

  const finish = el('button', 'continue-button hub-finish', 'Avsluta spelet');
  finish.addEventListener('click', () => engine.finish());
  panel.append(finish);
  return panel;
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

    if (state.phase === 'hub') {
      feed.append(renderHub(state, engine));
    }

    feed.lastElementChild?.scrollIntoView({ block: 'end', behavior: 'smooth' });
  }
  return { render };
}
