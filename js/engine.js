// Spelmotor: state och flödeslogik. Ingen DOM-kod här — renderaren
// prenumererar på state-ändringar via subscribe().
//
// Spelet har två skeden:
//   core – de sex obligatoriska uppdragen spelas i ordning
//   deep – efter kärnspelet väljer spelaren fritt bland fördjupningar i en
//          "hub", spelar dem och återvänder, tills hen väljer att avsluta.

import { validateModules } from './schema.js';

// Synlighet: hur mycket uppmärksamhet spelaren dragit till sig. Börjar på 0
// (helt anonym) och stiger med slarviga val. När den slår i taket triggas en
// "nära ögat"-scen (faktagranskaren Nadia Holm). Efter varje sådan pressas den
// ned igen. Tredje gången taket nås är spelet slut — två varningar förbrukade.
const VISIBILITY_MIN = 0;
const VISIBILITY_MAX = 100;
const VISIBILITY_AFTER_WARNING = 55;   // dit synligheten faller efter en varning
const WARNINGS_BEFORE_FAIL = 3;        // 3:e gången taket nås = förlust

// Bonus, som andel av uppdragets grundarvode (reward). Ges ENDAST på
// metodvalet (terminal-valet där AI-verktyget väljs) — aldrig på de tidigare
// strategiska valen, som bara påverkar synlighet. Bonusen är avsedd som en
// liten, oetisk lockelse: ju högre synlighetsrisk metoden innebär, desto
// större bonus (annars finns ingen anledning att välja den högljudda vägen).
// Aldrig visad i exakta kronor för spelaren — bara som "liten"/"stor".
const BONUS_FRACTION = Object.freeze({ liten: 0.02, stor: 0.05 });

// Faser:
//   playing        – steg matas ut i flödet; väntar på advance()/choose()
//   terminal       – terminal-overlay visas; väntar på terminalDone()
//   near-miss      – synligheten slog i taket; Nadia Holm-scenen visas;
//                    väntar på nearMissDone()
//   module-debrief – modulens debrief visas; väntar på nextModule()
//   hub            – fördjupningsval visas; väntar på selectDeep()/finish()
//   finished       – spelet avslutat (klarat eller avslöjad)
//
// Skeden (state.stage): 'prologue' → 'core' → 'deep'. Prologen är en
// berättande ram (samma steg-maskineri som ett uppdrag) som spelas före det
// första uppdraget; den har ingen badge och ingen debrief.
export function createEngine({ core, deep = [], closing = [], hub = {}, prologue = null, nearMiss = null }) {
  const schemaErrors = validateModules([...core, ...deep]);
  if (schemaErrors.length > 0) {
    throw new Error('Ogiltig speldata:\n' + schemaErrors.join('\n'));
  }

  const hasPrologue = prologue && Array.isArray(prologue.scenarios) && prologue.scenarios.length > 0;

  const state = {
    phase: 'playing',
    stage: hasPrologue ? 'prologue' : 'core',
    coreIndex: 0,
    current: hasPrologue ? prologue : core[0],
    currentDeepId: null,
    scenarioIndex: 0,
    stepIndex: 0,
    capital: 0,        // intjänade pengar (arvoden + bonusar), en high-score
    visibility: 0,     // uppmärksamhet du dragit till dig (0–100)
    moduleBonus: 0,    // bonus intjänad i det pågående uppdraget, för debriefen
    warnings: 0,       // antal "nära ögat"-scener som triggats
    badges: [],
    // Status för fördjupningarna (för hub-menyn).
    deepStatus: deep.map((m) => ({ id: m.id, badge: m.badge, title: m.title, done: false })),
    // Flödet som renderas: allt spelaren sett hittills, i ordning.
    feed: [],
    pendingChoice: null,
    pendingTerminal: null,
    pendingResume: null,   // stegmål att fortsätta till efter en nära-ögat-scen
  };

  const listeners = new Set();
  function notify() {
    for (const listener of listeners) listener(getState());
  }

  function getState() {
    return {
      ...state,
      module: state.current,
      coreNumber: state.stage === 'core' ? state.coreIndex + 1 : core.length,
      coreTotal: core.length,
      deepStatus: state.deepStatus.map((d) => ({ ...d })),
      deepTotal: deep.length,
    };
  }

  function currentScenario() {
    return state.current?.scenarios[state.scenarioIndex] ?? null;
  }

  function currentStep() {
    return currentScenario()?.steps[state.stepIndex] ?? null;
  }

  // Tillämpar ett vals effekter och returnerar den FAKTISKA synlighets-
  // förändringen (efter klippning mot 0–100) samt bonusbeloppet i kronor
  // (0 om valet inte gav bonus), så flödet kan visa delta-rutor.
  function applyEffects(effects) {
    let visibilityDelta = 0;
    let bonusAmount = 0;
    if (effects) {
      if (typeof effects.bonus === 'string' && BONUS_FRACTION[effects.bonus] != null) {
        const reward = state.current?.reward ?? 0;
        bonusAmount = Math.round(reward * BONUS_FRACTION[effects.bonus]);
        state.capital += bonusAmount;
      }
      if (Number.isInteger(effects.visibility)) {
        const before = state.visibility;
        state.visibility = Math.min(VISIBILITY_MAX,
          Math.max(VISIBILITY_MIN, state.visibility + effects.visibility));
        visibilityDelta = state.visibility - before;
      }
    }
    return { visibilityDelta, bonusAmount };
  }

  // Flyttar pekaren till nästa steg. target: stegId | 'end' | undefined.
  function movePointer(target) {
    const scenario = currentScenario();
    if (target === 'end') {
      state.stepIndex = scenario.steps.length;
    } else if (target != null) {
      state.stepIndex = scenario.steps.findIndex((s) => s.id === target);
    } else {
      state.stepIndex += 1;
    }
    if (state.stepIndex >= scenario.steps.length) {
      state.scenarioIndex += 1;
      state.stepIndex = 0;
      if (state.scenarioIndex >= state.current.scenarios.length) {
        if (state.stage === 'prologue') {
          startCore();
        } else {
          finishModule();
        }
      }
    }
  }

  // Prologen är slut → in i det första kärnuppdraget.
  function startCore() {
    state.stage = 'core';
    state.coreIndex = 0;
    state.current = core[0];
    resetPointer();
    state.phase = 'playing';
    pushMissionCard();
  }

  function finishModule() {
    const module = state.current;
    if (!state.badges.includes(module.badge)) state.badges.push(module.badge);
    // Grundarvodet betalas ut när uppdraget är klart.
    if (Number.isInteger(module.reward)) state.capital += module.reward;
    state.feed.push({
      kind: 'debrief',
      badge: module.badge,
      deep: state.stage === 'deep',
      reward: module.reward ?? null,
      bonus: state.moduleBonus,
      summary: module.debrief.summary,
      realWorld: module.debrief.realWorld,
    });
    state.phase = 'module-debrief';
  }

  function start() {
    if (state.stage === 'prologue') {
      // Prologen öppnar med ett titel-/introkort och drivs sedan som vanliga steg.
      if (prologue.title || prologue.tagline || prologue.intro) {
        state.feed.push({
          kind: 'title',
          title: prologue.title,
          tagline: prologue.tagline,
          intro: prologue.intro ?? [],
        });
      }
    } else {
      pushMissionCard();
    }
    notify();
  }

  function pushMissionCard() {
    const module = state.current;
    state.moduleBonus = 0;
    state.feed.push({
      kind: 'mission',
      stage: state.stage,
      title: module.title,
      client: module.client,
      target: module.target ?? null,
      stakes: module.stakes ?? null,
      badge: module.badge,
      moduleNumber: state.stage === 'core' ? state.coreIndex + 1 : null,
    });
  }

  function advance() {
    if (state.phase !== 'playing' || state.pendingChoice) return;
    const step = currentStep();
    if (!step) return;

    if (step.type === 'tutor') {
      state.feed.push({ kind: 'tutor', text: step.text });
      movePointer();
    } else if (step.type === 'post') {
      state.feed.push({ kind: 'post', author: step.author, handle: step.handle, text: step.text });
      movePointer();
    } else if (step.type === 'choice') {
      const item = { kind: 'choice', prompt: step.prompt, options: step.options, chosenId: null };
      state.feed.push(item);
      state.pendingChoice = { step, feedItem: item };
    }
    notify();
  }

  function choose(optionId) {
    if (!state.pendingChoice) return;
    const { step, feedItem } = state.pendingChoice;
    const option = step.options.find((o) => o.id === optionId);
    if (!option) return;

    feedItem.chosenId = optionId;
    state.pendingChoice = null;
    const { visibilityDelta, bonusAmount } = applyEffects(option.effects);

    // Feedbacklager 1: handledarens direktkommentar, alltid.
    state.feed.push({ kind: 'feedback', text: option.feedback });

    // Synlighetsruta: avslöjar hur uppmärksamheten ändrades av just detta val.
    if (visibilityDelta !== 0) {
      state.feed.push({ kind: 'visibility', delta: visibilityDelta, value: state.visibility });
    }

    // Bonusruta: avslöjar (utan exakta kronor) att valet gav en bonus.
    // Den ackumulerade kronsumman för uppdraget syns först i debriefen.
    if (bonusAmount > 0) {
      state.moduleBonus += bonusAmount;
      state.feed.push({ kind: 'bonus', tier: option.effects.bonus });
    }

    if (option.terminal) {
      // Pekaren flyttas först vid terminalDone(), så att terminalresultatet
      // hamnar i flödet före en eventuell modul-debrief.
      state.pendingTerminal = { ...option.terminal, next: option.next };
      state.phase = 'terminal';
    } else {
      proceedAfterChoice(option.next);
    }
    notify();
  }

  // Efter ett val (och efter en eventuell terminal): slog synligheten i taket?
  // I så fall en nära-ögat-scen; annars vidare till nästa steg.
  function proceedAfterChoice(next) {
    if (state.visibility >= VISIBILITY_MAX) {
      triggerNearMiss(next);
    } else {
      movePointer(next);
    }
  }

  function triggerNearMiss(next) {
    state.warnings += 1;
    if (state.warnings >= WARNINGS_BEFORE_FAIL) {
      // Tredje gången: avslöjad. Spelet slut — men aldrig ett tomt "you lose".
      state.phase = 'finished';
      state.feed.push({
        kind: 'game-over',
        failed: true,
        badges: state.badges,
        capital: state.capital,
        deepDone: state.deepStatus.filter((d) => d.done).length,
        deepTotal: deep.length,
        exposed: nearMiss?.exposed ?? null,
        closing: nearMiss?.failClosing ?? closing,
      });
      return;
    }
    // Första/andra gången: en Nadia Holm-scen, sedan faller synligheten.
    const scene = (nearMiss?.scenes ?? [])[state.warnings - 1] ?? null;
    state.pendingResume = next;
    state.feed.push({
      kind: 'nearmiss', warning: state.warnings, scene,
      peak: state.visibility, fellTo: VISIBILITY_AFTER_WARNING,
    });
    state.phase = 'near-miss';
  }

  // Spelaren har läst nära-ögat-scenen: synligheten pressas ned och spelet går
  // vidare där det avbröts.
  function nearMissDone() {
    if (state.phase !== 'near-miss') return;
    state.visibility = VISIBILITY_AFTER_WARNING;
    const next = state.pendingResume;
    state.pendingResume = null;
    state.phase = 'playing';
    movePointer(next);
    notify();
  }

  function terminalDone() {
    if (state.phase !== 'terminal') return;
    const { tool, result, reactions, next } = state.pendingTerminal;
    state.pendingTerminal = null;
    state.feed.push({
      kind: 'post',
      generated: true,
      // Verktygssträngen följer med så renderaren kan visa rätt medietyp
      // (video/röst/meme/bild) för det AI-genererade inlägget.
      tool,
      author: result.author,
      handle: result.handle,
      text: result.text,
    });
    // Fler sociala medie-reaktioner: publikens svar på det som just publicerats.
    // Dessa är "riktiga" röster (inte AI-genererade) och märks därför inte.
    for (const reaction of reactions ?? []) {
      state.feed.push({
        kind: 'post',
        reaction: true,
        author: reaction.author,
        handle: reaction.handle,
        text: reaction.text,
      });
    }
    state.phase = 'playing';
    proceedAfterChoice(next); // kan avsluta modulen, trigga nära-ögat, m.m.
    notify();
  }

  // Går vidare från en debrief: nästa kärnuppdrag, annars in i huben.
  function nextModule() {
    if (state.phase !== 'module-debrief') return;

    if (state.stage === 'core') {
      state.coreIndex += 1;
      if (state.coreIndex < core.length) {
        state.current = core[state.coreIndex];
        resetPointer();
        state.phase = 'playing';
        pushMissionCard();
      } else {
        enterHub(true);
      }
    } else {
      const entry = state.deepStatus.find((d) => d.id === state.currentDeepId);
      if (entry) entry.done = true;
      enterHub(false);
    }
    notify();
  }

  function enterHub(firstTime) {
    state.phase = 'hub';
    state.stage = 'deep';
    state.current = null;
    state.currentDeepId = null;
    const allDone = state.deepStatus.every((d) => d.done);
    const text = firstTime ? hub.intro : (allDone ? hub.allDone : hub.back);
    if (text) state.feed.push({ kind: 'tutor', text });
  }

  // Startar en vald fördjupning från huben.
  function selectDeep(id) {
    if (state.phase !== 'hub') return;
    const module = deep.find((m) => m.id === id);
    const entry = state.deepStatus.find((d) => d.id === id);
    if (!module || !entry || entry.done) return;
    state.stage = 'deep';
    state.current = module;
    state.currentDeepId = id;
    resetPointer();
    state.phase = 'playing';
    pushMissionCard();
    notify();
  }

  // Avslutar spelet från huben.
  function finish() {
    if (state.phase !== 'hub') return;
    state.phase = 'finished';
    state.feed.push({
      kind: 'game-over',
      failed: false,
      badges: state.badges,
      capital: state.capital,
      deepDone: state.deepStatus.filter((d) => d.done).length,
      deepTotal: deep.length,
      closing,
    });
    notify();
  }

  function resetPointer() {
    state.scenarioIndex = 0;
    state.stepIndex = 0;
  }

  function subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }

  return { start, advance, choose, terminalDone, nearMissDone, nextModule, selectDeep, finish, subscribe, getState };
}
