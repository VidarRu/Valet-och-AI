// Modulregister. Kärnspelets sex uppdrag i spelordning — en dramaturgisk
// stegring från det skalbara och "mjuka" (bot-driven polarisering) till det
// svartaste (deepfake-imitation sista dygnet före valet).
// Fördjupningsmoduler (steg 4) läggs till här senare.

import polarization from './modules/polarization.js';
import discredit from './modules/discredit.js';
import trolling from './modules/trolling.js';
import conspiracy from './modules/conspiracy.js';
import emotion from './modules/emotion.js';
import impersonation from './modules/impersonation.js';

export const modules = [
  polarization,
  discredit,
  trolling,
  conspiracy,
  emotion,
  impersonation,
];

// Spelets avslutning: nyansen som väger upp ren teknikskräck (briefens
// researchunderlag) och landar den pedagogiska poängen med inokulering.
export const closing = [
  'Du klarade alla sex uppdragen. Grattis — du vore en katastrof för demokratin.',
  'Men här är den goda nyheten, och den är på riktigt: hittills har generativ AI:s faktiska effekt på valresultat varit mindre än skräckrubrikerna påstår. Indiens stora deepfake-våg tycks inte ha ändrat särskilt många väljares uppfattningar, och EU:s förberedande "prebunking" inför valet 2024 verkar ha fungerat förvånansvärt väl.',
  'Verktygen är verkliga och taktiken fungerar. Men människor som känner igen tricken är det bästa försvaret som finns. Nu är du en av dem. Det var hela poängen.',
];
