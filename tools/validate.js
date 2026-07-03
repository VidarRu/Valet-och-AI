// Kör: node tools/validate.js
// Validerar all scenariodata mot schemat. Avslutar med felkod om något brister.

import { modules } from '../data/index.js';
import { validateModules } from '../js/schema.js';

const errors = validateModules(modules);
if (errors.length > 0) {
  console.error(`✗ ${errors.length} schemafel:\n`);
  for (const error of errors) console.error('  - ' + error);
  process.exit(1);
}
console.log(`✓ ${modules.length} modul(er) validerade utan fel.`);
