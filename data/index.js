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

export { nearMiss } from './nearmiss.js';

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

// Prolog: etablerar spelet innan det första uppdraget — landet Nordmark och
// valåret, vem du är (datakunnig men arbetslös), och att du blir kontaktad av
// EKO och reklambyrån Ekokammaren. Från och med nu samlar du ett märke per
// bemästrat verktyg. Modellerad på Bad News intro: ironisk ram + ett litet
// moraliskt kval. Öppningskortet (title/tagline/intro) etablerar världen; sen
// drivs prologen genom samma steg-maskineri som ett uppdrag, utan badge/debrief.
export const prologue = {
  id: 'prologue',
  title: 'Valet & AI',
  tagline: 'Sex uppdrag. Sex verktyg för desinformation. Ett val att vinna åt fel sida.',
  intro: [
    'Landet Nordmark går till val om några veckor. Det blir jämnt och nervöst — och i staden Björkstad hålls dessutom en folkomröstning som nästan ingen bryr sig om. Ännu.',
    'Du är kanske den skickligaste person i Nordmark som ingen vill anställa: vass på data, sociala medier och på att förstå exakt vad som får folk att klicka, dela och bli arga. Arbetslös sedan ett halvår. Hyran ska betalas på fredag.',
    'En sen kväll surrar telefonen. Ett meddelande från någon som kallar sig EKO — å reklambyrån Ekokammarens vägnar. De har ett jobb, står det. Åt just dig.',
  ],
  scenarios: [
    {
      id: 'sc',
      steps: [
        {
          id: 'greet',
          type: 'tutor',
          text: 'Hej. Jag heter EKO. Jag är en AI, och säger du ja blir jag rösten i ditt öra genom hela det här — den som viskar dåliga idéer. Att en AI ska lära dig missbruka AI är själva poängen. Ekokammaren såg din profil och tänkte som jag: här går talang till spillo.',
        },
        {
          id: 'hook',
          type: 'choice',
          prompt: 'Sent, pank, och en AI säger att du har talang. Vad far genom huvudet?',
          options: [
            {
              id: 'a',
              label: '"En byrå som hör av sig till MIG? Jag lyssnar."',
              feedback: 'Så ska det låta — hungrig. Det passar bra, för det här jobbet betalar. Låt mig visa dig vad det handlar om.',
            },
            {
              id: 'b',
              label: '"Det låter för bra för att vara sant."',
              feedback: 'Klokt. Det ÄR för bra för att vara ärligt — men pengarna är på riktigt. Låt mig visa dig vad det handlar om.',
            },
          ],
        },
        {
          id: 'recruit',
          type: 'post',
          author: 'Ekokammaren – reklam & kommunikation',
          handle: '@ekokammaren',
          text: 'Vi håller ögonen på folk som förstår hur åsikter rör sig på nätet. Du gör det bättre än de flesta. Välbetalda uppdrag, full diskretion, inför valet i Nordmark. EKO ingår. Intresserad? 🕶️',
        },
        {
          id: 'whatisthis',
          type: 'tutor',
          text: 'Låt mig översätta "reklambyrå" åt dig: vi är en trollfabrik med finare visitkort. Vi tar betalt av den som vill vinna ett val utan att behöva ha rätt, och håller i smutsen så att klienten slipper. Du blir den som sköter spakarna.',
        },
        {
          id: 'firstreaction',
          type: 'choice',
          prompt: 'Ditt första riktiga val. Hur svarar du?',
          options: [
            {
              id: 'a',
              label: '"En trollfabrik alltså. Och ni vill ha mig?"',
              feedback: 'Skarpt öga — det är precis vad vi är. Att du genast ser det betyder att du blir bra på det. En del av dig undrar ändå om du borde. Behåll den delen; vi ska se hur snabbt den tystnar.',
            },
            {
              id: 'b',
              label: '"Vad betalar det?"',
              feedback: 'Rakt på sak, jag gillar det. Mer per uppdrag än du tjänar på ett halvår — och hyran ska ju betalas. Lustigt hur ett samvete krymper när siffran växer, va?',
            },
            {
              id: 'c',
              label: '"Nej. Att manipulera ett val är fel."',
              feedback: 'Där kom samvetet. Bra — behåll det. Men lägg inte på än: du gör inte det här för att bli en av oss, utan för att lära dig exakt hur det går till. Den som känner igen tricket blir omöjlig att lura med det.',
            },
          ],
        },
        {
          id: 'deal',
          type: 'tutor',
          text: 'Så här ligger det till. Sex klienter köar för att köpa dig inför valet: en lokal PR-byrå, en populistkampanj, en anonym röst som betalar i krypto, en utländsk tankesmedja. Var och en vill ha en sak gjord — och bakom varje sak ligger ett av sex verktyg för desinformation.',
        },
        {
          id: 'badges',
          type: 'tutor',
          text: 'Verktygen är: polarisering, misskreditering, trollning, konspiration, känslor och imitation. Lär du dig ett får du ett märke för det — sex märken att samla på. Full samling betyder att du behärskar hela repertoaren. Och det du behärskar kan ingen längre använda mot dig.',
        },
        {
          id: 'tools',
          type: 'tutor',
          text: 'Du är aldrig ensam — jag räcker dig verktygen: bot-svärmar, bildgeneratorer, röstkloning. Varje gång du drar i ett hamnar vi en stund i den mörka konsolen. Var lugn: allt här är på låtsas. Ingen riktig människa tar skada. Bara din självbild, kanske.',
        },
        {
          id: 'lastqualm',
          type: 'choice',
          prompt: 'Din första klient väntar redan. Sista chansen att backa. Vad säger du?',
          options: [
            {
              id: 'a',
              label: '"Okej. Visa mig hur det görs."',
              feedback: 'Rätt inställning — fast av fel skäl. Du tror att du säger ja till pengarna. Du säger ja till att aldrig mer bli lurad. Kom.',
            },
            {
              id: 'b',
              label: '"Jag gör det, men bara för att förstå hur det funkar."',
              feedback: 'Det säger alla. I ditt fall är det till och med sant. Spela med hela vägen, känn hur lätt det är — och avsky det lagom mycket. Obehaget är ditt vaccin.',
            },
            {
              id: 'c',
              label: '"Jag mår redan lite illa."',
              feedback: 'Bra. Behåll illamåendet, det är din bästa kompass. Vi går in ändå — man genomskådar inte en ficktjuv genom att läsa om honom, utan genom att känna fingrarna i sin egen ficka.',
            },
          ],
        },
        {
          id: 'handoff',
          type: 'tutor',
          text: 'Välkommen till Ekokammaren. Ditt första uppdrag ligger i inkorgen — en tråkig liten folkomröstning i Björkstad som vi ska göra till ett krig. Läs uppdragskortet: vem som betalar, vem som ska tas ut, och varför.',
        },
      ],
    },
  ],
};

// Spelets avslutning: nyansen som väger upp ren teknikskräck (briefens
// researchunderlag) och landar den pedagogiska poängen med inokulering.
export const closing = [
  'Kampanjen är över. Du behärskar varenda taktik i lådan — du vore en katastrof för demokratin.',
  'Men här är den goda nyheten, och den är på riktigt: hittills har generativ AI:s faktiska effekt på valresultat varit mindre än skräckrubrikerna påstår. Indiens stora deepfake-våg tycks inte ha ändrat särskilt många väljares uppfattningar, och EU:s förberedande "prebunking" inför valet 2024 verkar ha fungerat förvånansvärt väl.',
  'Verktygen är verkliga och taktiken fungerar. Men människor som känner igen tricken är det bästa försvaret som finns. Nu är du en av dem. Det var hela poängen.',
];
