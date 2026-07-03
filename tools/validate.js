// Kör: node tools/validate.js
// Validerar all scenariodata (kärnspel + fördjupningar) mot schemat.
// Avslutar med felkod om något brister.

import { core, deep } from '../data/index.js';
import { validateModules } from '../js/schema.js';

const modules = [...core, ...deep];
const errors = validateModules(modules);
if (errors.length > 0) {
  console.error(`✗ ${errors.length} schemafel:\n`);
  for (const error of errors) console.error('  - ' + error);
  process.exit(1);
}
console.log(`✓ ${core.length} kärnuppdrag + ${deep.length} fördjupningar validerade utan fel.`);
