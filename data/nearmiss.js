// "Nära ögat"-scenerna: vad som händer när synligheten slår i taket.
//
// Faktagranskaren Nadia Holm på Faktakollen (samma person spelaren får i
// uppdrag att misskreditera i uppdrag 2) får upp ögonen för din verksamhet.
// Varje scen består av en push-notis, en fabricerad granskningsartikel, EKO:s
// handbroms, reklambyråns dementi och en tillsägelse. Efteråt faller
// synligheten och spelet fortsätter.
//
// scenes[0] triggas första gången taket nås, scenes[1] andra gången. Tredje
// gången (se engine.js) tar exposed/failClosing över och spelet är slut.
//
// ALLT är fiktivt och utspelar sig inne i spelet — samma SIMULERING-princip
// som terminalläget. Ingen verklig person eller publikation.

export const nearMiss = {
  scenes: [
    {
      warningLabel: 'Första varningen',
      notif: {
        title: 'Ny granskning publicerad',
        text: 'Nadia Holm: "Vem ligger egentligen bakom kampanjen?"',
      },
      article: {
        verdict: 'Samordnad kampanj',
        headline: 'Bot-nätet bakom "folkstormen" — spåren leder till en enda operatör',
        byline: 'Nadia Holm · Faktakollen · 6 min läsning',
        dek:
          'Tusentals konton skapade samma natt, nästan identiska formuleringar, samma otaggade bilder. En genomgång av flödet visar ett mönster som inte hör hemma i en spontan folkrörelse — utan i ett verktyg. Faktakollen kan koppla aktiviteten till samma avtryck som dykt upp i flera tidigare kampanjer.',
      },
      eko:
        'Hon nosade upp oss. Ingen panik — vi drar i handbromsen. Byrån går ut med en dementi, vi pausar allt och lägger oss platt ett dygn. Men skärp dig: syns vi så här igen blir det svårare att städa. Håll dig under radarn.',
      denial: {
        author: 'Ekokammaren',
        handle: '@ekokammaren',
        text: 'Vi känner inte igen den bild som målas upp. Vår kommunikation bygger på engagerade privatpersoner, inget annat. Vi tar starkt avstånd från grundlösa anklagelser om "bot-nät".',
      },
    },
    {
      warningLabel: 'Andra varningen',
      notif: {
        title: 'Uppföljning publicerad',
        text: 'Nadia Holm: "Samma fingeravtryck igen — nu är det ett mönster."',
      },
      article: {
        verdict: 'Återkommande operatör',
        headline: 'Det är samma hand igen: så känns de fabricerade kampanjerna igen',
        byline: 'Nadia Holm · Faktakollen · 8 min läsning',
        dek:
          'För några veckor sedan var det en folkstorm. Sedan en läckt skärmdump som aldrig funnits. Nu ett klipp som aldrig spelats in. Var för sig ser de olika ut — men de bär samma avtryck, samma tempo, samma verktyg. Jag har slutat tro på tillfälligheter. Någon jobbar systematiskt, och jag är nära att kunna sätta namn på det.',
      },
      eko:
        'Andra gången. Det här är inte längre otur, det är ett spår hon följer — och det pekar mot oss. Vi köper tid med en dementi till, men nästa gång räcker inte handbromsen. Sista chansen att lära dig ligga lågt. Missa den inte.',
      denial: {
        author: 'Ekokammaren',
        handle: '@ekokammaren',
        text: 'Att gång på gång anklaga oss utan bevis börjar likna en kampanj i sig. Vi överväger rättsliga steg. Faktakollen bör granska sina egna metoder innan de granskar andras.',
      },
    },
  ],

  // Tredje gången taket nås: Nadia Holm publicerar med kvitton, andra redaktioner
  // hakar på, och EKO släpper dig. Spelet är slut.
  exposed: {
    verdict: 'Avslöjad',
    headline: 'Namngiven: personen bakom desinformationskampanjerna inför valet',
    byline: 'Nadia Holm · Faktakollen · 11 min läsning',
    dek:
      'Efter tre kampanjer och lika många dementier finns nu kvittona: samma verktyg, samma konton, samma betalningsspår — och en uppdragskedja som leder tillbaka till reklambyrån Ekokammaren och en enda operatör. De andra redaktionerna har hakat på. Dementierna hjälper inte längre.',
  },
  failClosing: [
    'EKO svarar inte längre. Ekokammaren har raderat sina konton och låtsas som att du aldrig funnits. Det gör de klokt i — för nu är det ditt namn som står i rubriken, inte deras.',
    'Du drog för mycket uppmärksamhet till dig, en gång för mycket. Två varningar hann du få. Poängen med spelet var aldrig att vinna — utan att förstå hur lätt det är att göra det här, och hur svårt det är att komma undan. Nu vet du båda delarna.',
    'Det du lärde dig är verkligt. Använd det för att känna igen tricken — inte för att upprepa dem.',
  ],
};

export default nearMiss;
