// Spelmotor: state och flödeslogik. Ingen DOM-kod här — renderaren
// prenumererar på state-ändringar via subscribe().

import { validateModules } from './schema.js';

const CREDIBILITY_MIN = 0;
const CREDIBILITY_MAX = 100;

// Faser:
//   playing        – steg matas ut i flödet; väntar på advance() eller choose()
//   terminal       – terminal-overlay visas; väntar på terminalDone()
//   module-debrief – modulens debrief visas; väntar på nextModule()
//   finished       – alla moduler klara
export function createEngine(modules, options = {}) {
  const schemaErrors = validateModules(modules);
  if (schemaErrors.length > 0) {
    throw new Error('Ogiltig speldata:\n' + schemaErrors.join('\n'));
  }
  // Avslutningsreflektion (lista med stycken) som visas på slutkortet.
  const closing = Array.isArray(options.closing) ? options.closing : [];

  const state = {
    phase: 'playing',
    moduleIndex: 0,
    scenarioIndex: 0,
    stepIndex: 0,
    followers: 0,
    credibility: 50,
    badges: [],
    // Flödet som renderas: allt spelaren sett hittills, i ordning.
    feed: [],
    // Sätts när ett choice-steg nåtts och inget val gjorts än.
    pendingChoice: null,
    // Sätts när ett val med terminal-åtgärd gjorts.
    pendingTerminal: null,
  };

  const listeners = new Set();
  function notify() {
    for (const listener of listeners) listener(getState());
  }

  function getState() {
    return {
      ...state,
      module: currentModule(),
      totalModules: modules.length,
    };
  }

  function currentModule() {
    return modules[state.moduleIndex] ?? null;
  }

  function currentScenario() {
    return currentModule()?.scenarios[state.scenarioIndex] ?? null;
  }

  function currentStep() {
    return currentScenario()?.steps[state.stepIndex] ?? null;
  }

  function applyEffects(effects) {
    if (!effects) return;
    if (Number.isInteger(effects.followers)) {
      state.followers = Math.max(0, state.followers + effects.followers);
    }
    if (Number.isInteger(effects.credibility)) {
      state.credibility = Math.min(CREDIBILITY_MAX,
        Math.max(CREDIBILITY_MIN, state.credibility + effects.credibility));
    }
  }

  // Flyttar pekaren till nästa steg. target: stegId | 'end' | undefined.
  function movePointer(target) {
    const scenario = currentScenario();
    if (target === 'end') {
      state.stepIndex = scenario.steps.length; // förbi sista steget
    } else if (target != null) {
      state.stepIndex = scenario.steps.findIndex((s) => s.id === target);
    } else {
      state.stepIndex += 1;
    }
    // Scenariot slut → nästa scenario; modulen slut → debrief.
    if (state.stepIndex >= scenario.steps.length) {
      state.scenarioIndex += 1;
      state.stepIndex = 0;
      if (state.scenarioIndex >= currentModule().scenarios.length) {
        finishModule();
      }
    }
  }

  function finishModule() {
    const module = currentModule();
    if (!state.badges.includes(module.badge)) state.badges.push(module.badge);
    state.feed.push({
      kind: 'debrief',
      badge: module.badge,
      summary: module.debrief.summary,
      realWorld: module.debrief.realWorld,
    });
    state.phase = 'module-debrief';
  }

  // Startar spelet: visar första modulens uppdragskort.
  function start() {
    pushMissionCard();
    notify();
  }

  function pushMissionCard() {
    const module = currentModule();
    state.feed.push({
      kind: 'mission',
      title: module.title,
      client: module.client,
      badge: module.badge,
      moduleNumber: state.moduleIndex + 1,
    });
  }

  // Bearbetar exakt ett steg. Icke-val läggs i flödet; val blockerar tills choose().
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
    applyEffects(option.effects);

    // Feedbacklager 1: handledarens direktkommentar, alltid.
    state.feed.push({ kind: 'feedback', text: option.feedback });

    if (option.terminal) {
      // Pekaren flyttas först vid terminalDone(), så att terminalresultatet
      // hamnar i flödet före en eventuell modul-debrief.
      state.pendingTerminal = { ...option.terminal, next: option.next };
      state.phase = 'terminal';
    } else {
      movePointer(option.next);
    }
    notify();
  }

  // Anropas av terminal-overlayn när typewriter-sekvensen är klar
  // och spelaren klickat sig tillbaka till flödet.
  function terminalDone() {
    if (state.phase !== 'terminal') return;
    const { result, next } = state.pendingTerminal;
    state.pendingTerminal = null;
    state.feed.push({
      kind: 'post',
      generated: true, // markerar att kortet är AI-genererat i spelvärlden
      author: result.author,
      handle: result.handle,
      text: result.text,
    });
    state.phase = 'playing';
    movePointer(next); // kan avsluta modulen → fasen blir 'module-debrief'
    notify();
  }

  // Går vidare från debrief till nästa modul (eller avslutar spelet).
  function nextModule() {
    if (state.phase !== 'module-debrief') return;
    state.moduleIndex += 1;
    state.scenarioIndex = 0;
    state.stepIndex = 0;
    if (state.moduleIndex >= modules.length) {
      state.phase = 'finished';
      state.feed.push({ kind: 'game-over', badges: state.badges, closing });
    } else {
      state.phase = 'playing';
      pushMissionCard();
    }
    notify();
  }

  function subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }

  return { start, advance, choose, terminalDone, nextModule, subscribe, getState };
}
