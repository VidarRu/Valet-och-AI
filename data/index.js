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

// Prolog: etablerar spelet innan det första uppdraget — vem du är, vem som
// köpt dig, och att du från och med nu samlar ett märke ("badge") per bemästrad
// taktik. Modellerad på Bad News intro: ironisk ram + ett litet moraliskt kval
// innan spelaren går med på leken. Spelas genom samma steg-maskineri som ett
// uppdrag men har ingen badge och ingen debrief.
export const prologue = {
  id: 'prologue',
  title: 'Valet & AI',
  tagline: 'Sex uppdrag. Sex smutsiga tricks. Ett val att vinna åt fel sida.',
  scenarios: [
    {
      id: 'sc',
      steps: [
        {
          id: 'greet',
          type: 'tutor',
          text: 'Hej. Jag heter EKO. Jag är en AI, och från och med nu är jag din handledare — din samvetslösa bästa vän i öronsnäckan. Ironin att en AI ska lära dig missbruka AI är fullt avsiktlig; den ingår i priset. Och priset, ska du veta, är gott. Någon har precis fått upp ögonen för dig.',
        },
        {
          id: 'recruit',
          type: 'post',
          author: 'Ekokammaren – Strategisk kommunikation',
          handle: '@ekokammaren',
          text: 'Vi har följt ditt arbete. Du har känsla för hur människor tänker — och hur de går att flytta. Vi erbjuder välbetalda uppdrag, full diskretion och en AI-assistent som gör tungjobbet. Nästa val i Nordmark är om några veckor. Intresserad? 🕶️',
        },
        {
          id: 'whatisthis',
          type: 'tutor',
          text: '"Strategisk kommunikation." Gulligt, va? Vi är en lobbyfirma på papperet och en trollfabrik i praktiken. Vi tar betalt av den som vill vinna ett val utan att behöva ha rätt. Och du — du ska bli den som trycker på knapparna. Men först: vad tänker du?',
        },
        {
          id: 'firstreaction',
          type: 'choice',
          prompt: 'Ditt allra första beslut. Hur svarar du Ekokammaren?',
          options: [
            {
              id: 'a',
              label: '"Det där låter som en trollfabrik. Är det vad ni är?"',
              feedback: 'Skarpt öga. Ja — det är precis vad vi är, fast med bättre kaffe och en textmodell i stället för hundra anställda. Att du ser det betyder att du kommer att bli bra på det här. Ändå frågar en del av dig om du borde. Håll fast vid den delen — vi ska strax se hur lätt den tystnar.',
            },
            {
              id: 'b',
              label: '"Hur mycket pengar pratar vi om?"',
              feedback: 'Rakt på sak. Jag gillar det. Svaret: mer per uppdrag än de flesta tjänar på ett halvår, sex uppdrag i rad, kontant och spårlöst. Konstigt hur snabbt ett moraliskt dilemma krymper när siffran är stor nog, eller hur? Notera den känslan — den är själva råvaran vi säljer.',
            },
            {
              id: 'c',
              label: '"Nej. Att manipulera ett val är fel."',
              feedback: 'Där kom det — samvetet. Bra. Behåll det, för det är faktiskt hela poängen med att du är här. Men lägg inte på luren än: du kommer inte att göra det här för att bli en av oss. Du gör det för att lära dig exakt hur det går till — och den som känner igen tricket blir omöjlig att lura med det. Så. Ska vi?',
            },
          ],
        },
        {
          id: 'deal',
          type: 'tutor',
          text: 'Så här ser leken ut. Nordmark går till val. Sex olika klienter köar för att köpa dig — en lokal PR-byrå, en populistkampanj, en anonym röst i kryptovaluta, en utländsk tankesmedja. Var och en vill ha en specifik sak gjord. Och för varje sak finns det ett hantverk.',
        },
        {
          id: 'badges',
          type: 'tutor',
          text: 'Det finns sex hantverk i lådan: polarisering, misskreditering, trollning, konspiration, känslor och imitation. Bemästrar du ett får du ett märke för det — sex märken, din lilla samling. Tänk på dem som Badgers att plocka. Full samling betyder att du kan hela repertoaren utantill. Och när du kan den utantill kan ingen längre använda den mot dig.',
        },
        {
          id: 'tools',
          type: 'tutor',
          text: 'Du jobbar aldrig ensam. Jag matar dig med verktyg — bot-svärmar, bildgeneratorer, röstkloning, allt med påhittade namn för att slippa reklampengar. Varje gång du drar i ett av dem hamnar vi i den mörka konsolen ett ögonblick. Oroa dig inte: allt är simulering. Ingen riktig människa skadas i den här utbildningen. Bara din självbild, kanske.',
        },
        {
          id: 'lastqualm',
          type: 'choice',
          prompt: 'Din första klient väntar redan. Sista chansen att backa. Vad säger du?',
          options: [
            {
              id: 'a',
              label: '"Okej. Visa mig hur det görs."',
              feedback: 'Så ska det låta. Och märk väl — "visa mig hur det görs" är exakt rätt inställning, fast av fel skäl. Du tror att du säger ja till pengarna. Egentligen säger du ja till att aldrig mer bli lurad. Kom.',
            },
            {
              id: 'b',
              label: '"Jag gör det — men bara för att förstå hur det funkar."',
              feedback: 'Haha. Det säger alla. Men i ditt fall är det till och med sant: det ÄR därför du är här. Spela med hela vägen, känn hur lätt det är, hur bra det känns — och hata det lagom mycket. Det obehaget är ditt vaccin.',
            },
            {
              id: 'c',
              label: '"Jag mår redan lite illa av det här."',
              feedback: 'Bra. Behåll illamåendet — det är din bästa kompass. Vi ska ändå gå in, för man förstår inte en ficktjuv genom att läsa om honom, utan genom att känna fingrarna i sin egen ficka. Efteråt får du kräkas. Nu jobbar vi.',
            },
          ],
        },
        {
          id: 'handoff',
          type: 'tutor',
          text: 'Välkommen till Ekokammaren. Ditt första uppdrag ligger redan i inkorgen — en tråkig liten folkomröstning som vi ska förvandla till ett krig. Läs uppdragskortet noga: vem som betalar, vem som ska tas ut, och varför. Sen börjar vi.',
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
