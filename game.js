(function () {
  'use strict';

  /* ── Config ─────────────────────────────── */
  const SCENARIO_IDS = ['intro', 's01'];
  const INITIAL = { credibility: 50, followers: 10 };
  const WIN     = { credibility: 20, followers: 60 };

  /* ── State ───────────────────────────────── */
  let state    = {};
  let scenarios = [];
  let scenarioIndex = 0;
  let currentNode   = null;
  let pendingNext   = null;

  /* ── DOM refs ────────────────────────────── */
  let el = {};

  /* ── Boot ────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    el = {
      screens:          document.querySelectorAll('.screen'),
      barCredibility:   document.getElementById('bar-credibility'),
      barFollowers:     document.getElementById('bar-followers'),
      valCredibility:   document.getElementById('val-credibility'),
      valFollowers:     document.getElementById('val-followers'),
      briefingTitle:    document.getElementById('briefing-title'),
      briefingText:     document.getElementById('briefing-text'),
      btnStart:         document.getElementById('btn-start'),
      nodeImage:        document.getElementById('node-image'),
      scenarioLabel:    document.getElementById('scenario-label'),
      nodeText:         document.getElementById('node-text'),
      choices:          document.getElementById('choices'),
      consequenceBox:   document.getElementById('consequence-box'),
      consequenceText:  document.getElementById('consequence-text'),
      btnContinue:      document.getElementById('btn-continue'),
      gameoverTitle:    document.getElementById('gameover-title'),
      gameoverText:     document.getElementById('gameover-text'),
      btnRestart:       document.getElementById('btn-restart'),
      winText:          document.getElementById('win-text'),
      winStats:         document.getElementById('win-stats'),
      btnRestartWin:    document.getElementById('btn-restart-win'),
    };

    el.btnStart.addEventListener('click', startScenario);
    el.btnContinue.addEventListener('click', onContinue);
    el.btnRestart.addEventListener('click', newGame);
    el.btnRestartWin.addEventListener('click', newGame);

    loadScenarios();
  });

  /* ── Load ────────────────────────────────── */
  function loadScenarios() {
    showScreen('screen-loading');
    Promise.all(
      SCENARIO_IDS.map(function (id) {
        return fetch('scenarios/' + id + '.json').then(function (r) {
          if (!r.ok) throw new Error('Could not load ' + id + '.json (HTTP ' + r.status + ')');
          return r.json();
        });
      })
    ).then(function (loaded) {
      scenarios = loaded;
      newGame();
    }).catch(function (err) {
      var msg = document.querySelector('#screen-loading .loading-text');
      if (msg) msg.textContent = 'FEL: ' + err.message;
      console.error(err);
    });
  }

  /* ── Game flow ───────────────────────────── */
  function newGame() {
    state = Object.assign({}, INITIAL);
    scenarioIndex = 0;
    updateHUD();
    showBriefing();
  }

  function showBriefing() {
    var scenario = scenarios[scenarioIndex];
    el.briefingTitle.textContent = scenario.title;

    var body = scenario.setup || '';
    if (Array.isArray(scenario.briefings) && scenario.briefings.length > 0) {
      var pick = scenario.briefings[Math.floor(Math.random() * scenario.briefings.length)];
      body = pick + '\n\n' + body;
    }
    el.briefingText.textContent = body;
    showScreen('screen-briefing');
  }

  function startScenario() {
    var scenario = scenarios[scenarioIndex];
    currentNode = scenario.nodes[0];
    renderNode();
    showScreen('screen-node');
  }

  function renderNode() {
    var scenario = scenarios[scenarioIndex];

    el.nodeImage.innerHTML = '';
    if (currentNode.image) {
      var img = document.createElement('img');
      img.src = currentNode.image;
      img.alt = '';
      el.nodeImage.appendChild(img);
    } else {
      var placeholder = document.createElement('div');
      placeholder.className = 'node-image-placeholder';
      var label = document.createElement('span');
      label.textContent = scenario.title;
      placeholder.appendChild(label);
      el.nodeImage.appendChild(placeholder);
    }

    el.scenarioLabel.textContent = scenario.title.toUpperCase();
    el.nodeText.textContent = currentNode.text;
    el.consequenceBox.classList.add('hidden');

    el.choices.innerHTML = '';
    currentNode.choices.forEach(function (choice) {
      var btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.textContent = choice.label;
      btn.addEventListener('click', function () { onChoice(choice); });
      el.choices.appendChild(btn);
    });
  }

  function onChoice(choice) {
    el.choices.querySelectorAll('.choice-btn').forEach(function (b) {
      b.disabled = true;
    });

    applyDelta(choice.delta);
    pendingNext = choice.next;

    el.consequenceText.textContent = choice.consequence;
    el.consequenceBox.classList.remove('hidden');

    if (state.credibility <= 0) {
      pendingNext = '__OVER_CRED__';
    } else if (state.followers <= 0) {
      pendingNext = '__OVER_FOLLOW__';
    }
  }

  function onContinue() {
    if (pendingNext === '__OVER_CRED__') {
      gameOver(
        'OPERATIONEN KOMPROMETTERAD',
        'Din trovärdighet är noll. Du är avslöjad. Uppdragsgivaren förnekar all kännedom om dig. Journalisterna ringer. Polisen knackar på dörren.'
      );
      return;
    }
    if (pendingNext === '__OVER_FOLLOW__') {
      gameOver(
        'INGEN LYSSNAR LÄNGRE',
        'Din publik har försvunnit. Utan räckvidd finns inget uppdrag kvar. Pengarna slutar komma. Operationen avvecklas i tysthet.'
      );
      return;
    }

    if (pendingNext == null || pendingNext === 'END') {
      nextScenario();
    } else {
      var scenario = scenarios[scenarioIndex];
      var next = null;
      for (var i = 0; i < scenario.nodes.length; i++) {
        if (scenario.nodes[i].id === pendingNext) { next = scenario.nodes[i]; break; }
      }
      if (!next) { console.error('Node not found: ' + pendingNext); nextScenario(); return; }
      currentNode = next;
      renderNode();
    }
  }

  function nextScenario() {
    scenarioIndex++;
    if (scenarioIndex >= scenarios.length) {
      checkWin();
    } else {
      showBriefing();
    }
  }

  function checkWin() {
    if (state.credibility > WIN.credibility && state.followers > WIN.followers) {
      el.winText.textContent =
        'Du navigerade igenom alla uppdrag och behöll din operativa kapacitet. ' +
        'Valet är om en dag. Historien skrivs nu — och du var med och formade den.';
      el.winStats.innerHTML =
        '<div class="win-stat">TROVÄRDIGHET <strong>' + state.credibility + '</strong></div>' +
        '<div class="win-stat">FÖLJARE <strong>' + state.followers + '</strong></div>';
      showScreen('screen-win');
    } else {
      var reason = state.credibility <= WIN.credibility
        ? 'Din trovärdighet var för låg — för många spår leder tillbaka till dig.'
        : 'Du lyckades aldrig bygga tillräcklig räckvidd för att göra skillnad.';
      gameOver('UPPDRAGET MISSLYCKAT', 'Du slutförde alla uppdrag men nådde inte målet. ' + reason);
    }
  }

  function gameOver(title, text) {
    el.gameoverTitle.textContent = title;
    el.gameoverText.textContent  = text;
    showScreen('screen-gameover');
  }

  /* ── Stats ───────────────────────────────── */
  function applyDelta(delta) {
    if (!delta) return;
    var cDelta = delta.credibility || 0;
    var fDelta = delta.followers   || 0;
    state.credibility = Math.max(0, Math.min(100, state.credibility + cDelta));
    state.followers   = Math.max(0, Math.min(100, state.followers   + fDelta));
    updateHUD(cDelta, fDelta);
  }

  function updateHUD(cDelta, fDelta) {
    el.valCredibility.textContent = state.credibility;
    el.valFollowers.textContent   = state.followers;
    el.barCredibility.style.width = state.credibility + '%';
    el.barFollowers.style.width   = state.followers   + '%';

    setBarClass(el.barCredibility, state.credibility);
    setBarClass(el.barFollowers,   state.followers);

    if (cDelta !== undefined) flashValue(el.valCredibility, cDelta);
    if (fDelta !== undefined) flashValue(el.valFollowers,   fDelta);
  }

  function setBarClass(bar, value) {
    bar.className = 'stat-bar' + (value < 20 ? ' danger' : value < 40 ? ' warning' : '');
  }

  function flashValue(el, delta) {
    if (delta === 0) return;
    el.style.color = delta > 0 ? 'var(--good)' : 'var(--danger)';
    setTimeout(function () { el.style.color = ''; }, 800);
  }

  /* ── Screen ──────────────────────────────── */
  function showScreen(id) {
    el.screens.forEach(function (s) { s.classList.remove('active'); });
    var target = document.getElementById(id);
    if (target) target.classList.add('active');
  }
}());
