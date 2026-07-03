// Modulregister.
//
// core: kärnspelets sex uppdrag i spelordning — en dramaturgisk stegring från
//   det skalbara och "mjuka" (bot-driven polarisering) till det svartaste
//   (deepfake-imitation sista dygnet före valet).
// deep: valfria fördjupningar (en per badge) som spelaren väljer i huben efter
//   kärnspelet. Var och en tar en NY vinkel på taktiken för att undvika upprepning.

import polarization from './modules/polarization.js';
import discredit from './modules/discredit.js';
import trolling from './modules/trolling.js';
import conspiracy from './modules/conspiracy.js';
import emotion from './modules/emotion.js';
import impersonation from './modules/impersonation.js';

import deepPolarization from './deep/polarization.js';
import deepDiscredit from './deep/discredit.js';
import deepTrolling from './deep/trolling.js';
import deepConspiracy from './deep/conspiracy.js';
import deepEmotion from './deep/emotion.js';
import deepImpersonation from './deep/impersonation.js';

export const core = [
  polarization,
  discredit,
  trolling,
  conspiracy,
  emotion,
  impersonation,
];

export const deep = [
  deepPolarization,
  deepDiscredit,
  deepTrolling,
  deepConspiracy,
  deepEmotion,
  deepImpersonation,
];

// Handledartext vid övergångar i huben (fördjupningsmenyn).
export const hub = {
  intro:
    'Kärnspelet är avklarat — du behärskar alla sex taktikerna. Imponerande och lite oroväckande. Vill du gräva djupare tar varje taktik en nivå till: samma badge, mörkare hantverk. Välj en fördjupning nedan, eller lägg av medan du fortfarande kan se dig själv i spegeln.',
  back:
    'Tillbaka för mer? Girigt. Jag gillar det. Välj nästa fördjupning — eller avsluta här.',
  allDone:
    'Alla fördjupningar avklarade. Du kan inte längre påstå att du inte förstår hur det här går till. Dags att avsluta — och göra något klokt med kunskapen.',
};

// Spelets avslutning: nyansen som väger upp ren teknikskräck (briefens
// researchunderlag) och landar den pedagogiska poängen med inokulering.
export const closing = [
  'Kampanjen är över. Du behärskar varenda taktik i lådan — du vore en katastrof för demokratin.',
  'Men här är den goda nyheten, och den är på riktigt: hittills har generativ AI:s faktiska effekt på valresultat varit mindre än skräckrubrikerna påstår. Indiens stora deepfake-våg tycks inte ha ändrat särskilt många väljares uppfattningar, och EU:s förberedande "prebunking" inför valet 2024 verkar ha fungerat förvånansvärt väl.',
  'Verktygen är verkliga och taktiken fungerar. Men människor som känner igen tricken är det bästa försvaret som finns. Nu är du en av dem. Det var hela poängen.',
];
