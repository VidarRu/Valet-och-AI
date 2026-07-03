// Schema och validering för spelets datastruktur.
//
// Hierarki:
//   Modul (uppdrag)  →  Scenario (scen)  →  Steg  →  Val (options)
//
// Ett uppdrag hör alltid till exakt en av de sex badgesen. AI-metoder
// (röstkloning, bildgenerering, bot-nät …) är INTE badges — de är
// terminal-åtgärder som enskilda val kan trigga.

export const BADGES = Object.freeze({
  polarization:  { id: 'polarization',  label: 'Polarisering' },
  discredit:     { id: 'discredit',     label: 'Misskreditering' },
  trolling:      { id: 'trolling',      label: 'Trollning' },
  conspiracy:    { id: 'conspiracy',    label: 'Konspiration' },
  emotion:       { id: 'emotion',       label: 'Känslor' },
  impersonation: { id: 'impersonation', label: 'Imitation' },
});

export const MODULE_TYPES = Object.freeze(['core', 'deep']);

// Stegtyper i ett scenario:
//   tutor  – handledarbubbla (text)
//   post   – inlägg/kort i flödet (author, handle, text)
//   choice – beslutspunkt (prompt, options[])
export const STEP_TYPES = Object.freeze(['tutor', 'post', 'choice']);

/*
Modul:
{
  id: 'core-polarization',
  type: 'core' | 'deep',
  badge: 'polarization',              // nyckel i BADGES
  title: 'Uppdragstitel',
  client: {                           // konkret uppdragsgivare med motiv
    name: '…', description: '…', goal: '…', fee: '…'
  },
  scenarios: [Scenario, …],
  debrief: {                          // feedbacklager 2 (obligatoriskt)
    summary: '…',                     // taktiken i bredare sammanhang
    realWorld: ['…', …]               // koppling till verkliga exempel
  }
}

Scenario:
{
  id: 'sc1',
  steps: [Steg, …]                    // steg har unika id inom scenariot
}

Steg (gemensamt): { id, type }
  tutor:  { text }
  post:   { author, handle, text }
  choice: { prompt, options: [Val, …] }   // minst 2 val

Val:
{
  id: 'a',
  label: 'Knapptext',
  feedback: '…',                      // feedbacklager 1 (obligatoriskt):
                                      // kort direktkommentar från handledaren
  effects: { followers: +120, credibility: -5 },   // valfritt, heltal
  terminal: {                         // valfritt: triggar mörkt terminalläge
    tool: 'voice_synth',              // fiktivt verktygsnamn (inga riktiga varumärken)
    lines: ['rad', …],                // fejkade loggrader, uttryckligen illustrativa
    result: { author, handle, text }  // kortet som klistras in i flödet efteråt
  },
  next: 'stegId' | 'end'              // valfritt: hoppmål inom scenariot;
                                      // utelämnat = nästa steg i ordningen
}
*/

function isNonEmptyString(v) {
  return typeof v === 'string' && v.trim().length > 0;
}

function validateTerminal(terminal, path, errors) {
  if (!isNonEmptyString(terminal.tool)) errors.push(`${path}.tool saknas`);
  if (!Array.isArray(terminal.lines) || terminal.lines.length === 0) {
    errors.push(`${path}.lines måste vara en icke-tom lista med loggrader`);
  } else if (!terminal.lines.every(isNonEmptyString)) {
    errors.push(`${path}.lines innehåller tomma rader`);
  }
  const r = terminal.result;
  if (!r || typeof r !== 'object') {
    errors.push(`${path}.result saknas (kortet som visas i flödet efteråt)`);
  } else {
    for (const field of ['author', 'handle', 'text']) {
      if (!isNonEmptyString(r[field])) errors.push(`${path}.result.${field} saknas`);
    }
  }
}

function validateOption(option, stepIds, path, errors) {
  if (!isNonEmptyString(option.id)) errors.push(`${path}.id saknas`);
  if (!isNonEmptyString(option.label)) errors.push(`${path}.label saknas`);
  // Feedbacklager 1 är obligatoriskt per designbeslut — inget val utan kommentar.
  if (!isNonEmptyString(option.feedback)) errors.push(`${path}.feedback saknas (obligatorisk)`);
  if (option.effects != null) {
    for (const [key, val] of Object.entries(option.effects)) {
      if (!['followers', 'credibility'].includes(key)) {
        errors.push(`${path}.effects har okänt fält "${key}"`);
      } else if (!Number.isInteger(val)) {
        errors.push(`${path}.effects.${key} måste vara ett heltal`);
      }
    }
  }
  if (option.terminal != null) validateTerminal(option.terminal, `${path}.terminal`, errors);
  if (option.next != null && option.next !== 'end' && !stepIds.has(option.next)) {
    errors.push(`${path}.next pekar på okänt steg "${option.next}"`);
  }
}

function validateStep(step, stepIds, path, errors) {
  if (!isNonEmptyString(step.id)) errors.push(`${path}.id saknas`);
  if (!STEP_TYPES.includes(step.type)) {
    errors.push(`${path}.type "${step.type}" är inte en av: ${STEP_TYPES.join(', ')}`);
    return;
  }
  if (step.type === 'tutor' && !isNonEmptyString(step.text)) {
    errors.push(`${path}.text saknas`);
  }
  if (step.type === 'post') {
    for (const field of ['author', 'handle', 'text']) {
      if (!isNonEmptyString(step[field])) errors.push(`${path}.${field} saknas`);
    }
  }
  if (step.type === 'choice') {
    if (!isNonEmptyString(step.prompt)) errors.push(`${path}.prompt saknas`);
    if (!Array.isArray(step.options) || step.options.length < 2) {
      errors.push(`${path}.options måste ha minst 2 val`);
    } else {
      const seen = new Set();
      step.options.forEach((option, i) => {
        validateOption(option, stepIds, `${path}.options[${i}]`, errors);
        if (seen.has(option.id)) errors.push(`${path}.options[${i}].id "${option.id}" är dubblerat`);
        seen.add(option.id);
      });
    }
  }
}

function validateScenario(scenario, path, errors) {
  if (!isNonEmptyString(scenario.id)) errors.push(`${path}.id saknas`);
  if (!Array.isArray(scenario.steps) || scenario.steps.length === 0) {
    errors.push(`${path}.steps saknas eller är tom`);
    return;
  }
  const stepIds = new Set(scenario.steps.map((s) => s.id));
  if (stepIds.size !== scenario.steps.length) {
    errors.push(`${path}.steps har dubblerade steg-id`);
  }
  scenario.steps.forEach((step, i) => validateStep(step, stepIds, `${path}.steps[${i}]`, errors));
}

// Validerar en modul. Returnerar en lista med felmeddelanden (tom = giltig).
export function validateModule(module) {
  const errors = [];
  const path = `modul "${module?.id ?? '?'}"`;

  if (!module || typeof module !== 'object') return [`${path}: inte ett objekt`];
  if (!isNonEmptyString(module.id)) errors.push(`${path}: id saknas`);
  if (!MODULE_TYPES.includes(module.type)) {
    errors.push(`${path}: type måste vara en av: ${MODULE_TYPES.join(', ')}`);
  }
  if (!BADGES[module.badge]) {
    errors.push(`${path}: badge "${module.badge}" är inte en av de sex (${Object.keys(BADGES).join(', ')})`);
  }
  if (!isNonEmptyString(module.title)) errors.push(`${path}: title saknas`);

  const client = module.client;
  if (!client || typeof client !== 'object') {
    errors.push(`${path}: client saknas (uppdragsgivare med konkret motiv)`);
  } else {
    for (const field of ['name', 'description', 'goal', 'fee']) {
      if (!isNonEmptyString(client[field])) errors.push(`${path}: client.${field} saknas`);
    }
  }

  if (!Array.isArray(module.scenarios) || module.scenarios.length === 0) {
    errors.push(`${path}: scenarios saknas eller är tom`);
  } else {
    module.scenarios.forEach((scenario, i) =>
      validateScenario(scenario, `${path}.scenarios[${i}]`, errors));
  }

  // Feedbacklager 2 är obligatoriskt per designbeslut.
  const debrief = module.debrief;
  if (!debrief || typeof debrief !== 'object') {
    errors.push(`${path}: debrief saknas (obligatorisk fördjupad sammanfattning)`);
  } else {
    if (!isNonEmptyString(debrief.summary)) errors.push(`${path}: debrief.summary saknas`);
    if (!Array.isArray(debrief.realWorld) || debrief.realWorld.length === 0) {
      errors.push(`${path}: debrief.realWorld måste ha minst ett verkligt exempel`);
    }
  }

  return errors;
}

// Validerar en lista moduler + kontrollerar unika id:n.
export function validateModules(modules) {
  const errors = [];
  const seen = new Set();
  for (const module of modules) {
    errors.push(...validateModule(module));
    if (seen.has(module.id)) errors.push(`modul-id "${module.id}" är dubblerat`);
    seen.add(module.id);
  }
  return errors;
}
